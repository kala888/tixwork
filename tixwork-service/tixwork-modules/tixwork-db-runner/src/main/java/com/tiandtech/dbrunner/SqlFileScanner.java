package com.tiandtech.dbrunner;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.tiandtech.core.exception.BizException;
import com.tiandtech.dbrunner.entity.DbChangeset;
import com.tiandtech.dbrunner.entity.SqlCommand;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 从paths中扫描sql文件，解析出changeset
 */
@Slf4j
public class SqlFileScanner {

    @SneakyThrows
    public List<DbChangeset> loadChangeset(List<String> paths) {
        if (CollectionUtil.isEmpty(paths)) {
            log.warn("sql 扫描路径为空，请检查配置。或者disable dbrunner");
            return ListUtil.empty();
        }
        // 从classpath中加载sql文件，打包后，包含jar包中的
        List<Resource> resources = new ArrayList<>();
        for (String path : paths) {
            ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
            String pathPattern = "classpath*:" + path + "/*.sql";
            Resource[] files = resourcePatternResolver.getResources(pathPattern);
            log.debug("load sql files from {}:{}", pathPattern, files);
            List<Resource> sqlFiles = Arrays.stream(files)
                .filter(it -> it.getFilename() != null)
                .sorted(Comparator.comparing(Resource::getFilename))
                .toList();
            resources.addAll(sqlFiles);
        }
        List<DbChangeset> dbChangeSetList = new ArrayList<>();
        for (Resource resource : resources) {
            List<String> lines = new ArrayList<>();
            IoUtil.readUtf8Lines(resource.getInputStream(), lines);
            lines = lines.stream().filter(StrUtil::isNotBlank).toList();

            boolean runnable = lines.stream().anyMatch(it -> {
                SqlCommand command = getCommand(it);
                return command == SqlCommand.SQL_FILE_MARK;
            });
            if (runnable) {
                List<DbChangeset> list = transformToChangeset(resource.getFilename(), lines);
                dbChangeSetList.addAll(list);
            }
        }
        dbChangeSetList.forEach(this::buildChangeset);
        return dbChangeSetList;
    }


    private SqlCommand getCommand(String str) {
        if (str.startsWith("--")) {
            String line = StrUtil.trim(
                str.replace("-", " ")
                    .replaceAll("\\s+", " ")
            );
            return Arrays.stream(SqlCommand.values())
                .filter(it -> line.startsWith(it.getValue()))
                .findFirst().orElse(null);
        }
        return null;
    }

    /**
     * changeset开始 --changeset {author}:{name}
     * 中间为sql body
     * rollback结束 --rollback {sql}
     * <p>
     * 暂时只支持一个rollback语句
     */
    private List<DbChangeset> transformToChangeset(String file, List<String> lines) {
        List<DbChangeset> list = new ArrayList<>();
        DbChangeset changeset = null;
        for (String line : lines) {
            SqlCommand command = getCommand(line);
            // --changeset tixwork:sys_tenant
            if (command == SqlCommand.CHANGE_SET_MARK) {
                changeset = new DbChangeset();
                list.add(changeset);
                String author = StrUtil.subBetween(line, "changeset", ":");
                String name = StrUtil.subAfter(line, ":", true);
                changeset.setName(name);
                changeset.setAuthor(author);
                changeset.setFileName(file);
                changeset.setExecuteType(DbChangeset.EXECUTE_TYPE_FULL_SQL);
                continue;
            }
            // --rollback DROP TABLE sys_tenant;
            if (command == SqlCommand.ROLLBACK_MARK) {
                if (changeset == null) {
                    throw new BizException("rollback语句必须在changeset之后");
                }
                String rollback = StrUtil.subAfter(line, "rollback", true);
                changeset.setRollbackSql(rollback);
                changeset = null;
                continue;
            }
            if (changeset != null) {
                changeset.getLines().add(line);
            }
        }

        return list.stream()
            .filter(it -> it.getLines().stream().anyMatch(StrUtil::isNotBlank))
//            .sorted(Comparator.comparing(DbChangeset::getName))
            .toList();
    }


    // 使用Spring的资源加载器获取匹配的资源
//        ClassPathResource theResource = new ClassPathResource("tixwork/liquibase");
////        String path = this.getClass().getClassLoader().getResource(fileName).getPath();
//        ClassPathResource theResource = new ClassPathResource("cust/liquibase");
//        File folder = theResource.getFile();
//        List<String> path = FileUtil.listFileNames(FileUtil.getAbsolutePath(folder));
//
//        theResource = new ClassPathResource("tixwork/liquibase");
//        folder = theResource.getFile();
//        path = FileUtil.listFileNames(FileUtil.getAbsolutePath(folder));


//        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
//        Resource[] resources = resolver.getResources("classpath*:**/**/*.sql");

    private void buildChangeset(DbChangeset changeset) {
        //执行的sql和md5计算，忽略--注释.全部的lines记录在brief中
        String sql = changeset.getLines().stream()
            .filter(line -> !line.startsWith("--"))
            .collect(Collectors.joining(StrUtil.LF));
        changeset.setSql(sql);
        changeset.setMd5(SecureUtil.md5(sql));
        String brief = String.join(StrUtil.LF, changeset.getLines());
        changeset.setBrief(brief);
    }
}
