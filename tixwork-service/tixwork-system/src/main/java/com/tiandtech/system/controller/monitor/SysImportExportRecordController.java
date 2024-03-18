package com.tiandtech.system.controller.monitor;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysImportExportRecordBo;
import com.tiandtech.system.domain.vo.SysImportExportRecordVo;
import com.tiandtech.system.service.impl.SysImportExportRecordService;
import com.tiandtech.web.core.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

/**
 * 系统访问记录
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/monitor/import-export")
public class SysImportExportRecordController extends BaseController {

    private final SysImportExportRecordService service;

    /**
     * 获取系统访问记录列表
     */
    @SaCheckPermission("monitor:import-export:list")
    @PostMapping("/list")
    public TableDataInfo<SysImportExportRecordVo> list(@RequestBody SysImportExportRecordBo entity, PageQuery pageQuery) {
        Page<SysImportExportRecordVo> list = service.listByPage(entity, pageQuery);
        return WebResult.success(list);
    }

    /**
     * 批量删除登录日志
     */
    @SaCheckPermission("monitor:import-export:remove")
    @Log(title = "删除导入记录", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public WebResult<Void> remove(@PathVariable Long[] ids) {
        return toAjax(service.deleteByIds(Arrays.asList(ids)));
    }

}
