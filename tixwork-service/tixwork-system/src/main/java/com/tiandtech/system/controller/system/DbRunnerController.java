package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.hutool.extra.spring.SpringUtil;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.dbrunner.DbRunner;
import com.tiandtech.dbrunner.entity.DbChangeset;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/db-runner")
public class DbRunnerController {
    /**
     * 查询客户端管理列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @PostMapping("/diff-tables")
    public WebResult.TableDataInfo<DbChangeset> list() {
        DbRunner runner = SpringUtil.getBean(DbRunner.class);
        List<DbChangeset> changesetList = runner.diffTables();
        log.debug("changesetList:{}", changesetList);
        return WebResult.success(changesetList);
    }

    /**
     * 查询客户端管理列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @PostMapping("/patch-diff")
    public WebResult patch() {
        DbRunner runner = SpringUtil.getBean(DbRunner.class);
        List<DbChangeset> changesetList = runner.diffTables();
        runner.patchSql(changesetList);
        return WebResult.success();
    }
}
