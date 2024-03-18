package com.tiandtech.dbrunner;


import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.autoconfigure.MybatisPlusLanguageDriverAutoConfiguration;
import com.tiandtech.dbrunner.entity.DbChangeset;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Configuration(proxyBeanMethods = false)
@AutoConfigureAfter({DataSourceAutoConfiguration.class, MybatisPlusLanguageDriverAutoConfiguration.class})
public class DbRunnerAutoConfiguration {

    @Value("${dbrunner.enabled}")
    private Boolean enabled = true;
    @Value("${dbrunner.auto-patch}")
    private Boolean autoPatch = false;
    /**
     * 例如配置sql-paths: tixwork/sql，{biz-module}/sql，cust/sql
     */
    @Value("${dbrunner.sql-paths}")
    private String sqlPaths = "tixwork/sql";

    @Value("${biz.name}")
    private String bizName = "tixwork";

    @Bean
    @Primary
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public DbRunner dbRunner(DataSource dataSource) {

        log.info("  ...  init dbRunner  ...  ");
        List<String> paths = new ArrayList<>();
        StrUtil.split(sqlPaths, ",").forEach(it -> {
            String path = it.trim();
            if (!paths.contains(path)) {
                paths.add(path);
            }
        });

        DbRunner runner = new DbRunner(dataSource, paths, bizName);
        log.info("dbrunner 参数 enabled:{}, autoPatch:{}, sqlPaths:{} ", enabled, autoPatch, paths);

        boolean firstInitial = false;
        if (enabled) {
            firstInitial = runner.initialTables();
        }
        if (!firstInitial) {
            List<DbChangeset> changesetList = runner.diffTables();
            if (BooleanUtil.isTrue(autoPatch)) {
                runner.patchSql(changesetList);
            } else {
                printNotPatchTips(changesetList);
            }
        }
        return runner;
    }

    private void printNotPatchTips(List<DbChangeset> changesetList) {
        if (CollectionUtil.isEmpty(changesetList)) {
            return;
        }
        log.warn("存在结构变更，但是dbrunner.autoPatch=false, 请手动执行patchSql");
        log.warn(
            changesetList.stream()
                .map(DbChangeset::getSql)
                .collect(Collectors.joining("\n"))
        );
    }
}
