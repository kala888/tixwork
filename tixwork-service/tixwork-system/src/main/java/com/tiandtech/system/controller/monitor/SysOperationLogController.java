package com.tiandtech.system.controller.monitor;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysOperationLogBo;
import com.tiandtech.system.domain.vo.SysOperationLogVo;
import com.tiandtech.system.service.SysOperationLogService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 操作日志记录
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/monitor/operation-log")
public class SysOperationLogController extends BaseController {

    private final SysOperationLogService service;

    /**
     * 获取操作日志记录列表
     */
    @SaCheckPermission("monitor:operation-log:list")
    @PostMapping("/list")
    public TableDataInfo<SysOperationLogVo> list(@RequestBody SysOperationLogBo log, PageQuery pageQuery) {
        Page<SysOperationLogVo> page = service.listByPage(log, pageQuery);
        return WebResult.success(page);
    }

    /**
     * 导出操作日志记录列表
     */
    @Log(title = "操作日志", businessType = BusinessType.EXPORT)
    @SaCheckPermission("monitor:operation-log:export")
    @PostMapping("/export")
    public void export(SysOperationLogBo bo, HttpServletResponse response) {
        List<SysOperationLogVo> list = service.list(bo);
        ExcelUtil.exportExcel(list, "操作日志", SysOperationLogVo.class, response);
    }

    /**
     * 批量删除操作日志记录
     */
    @Log(title = "操作日志", businessType = BusinessType.DELETE)
    @SaCheckPermission("monitor:operation-log:remove")
    @DeleteMapping("/{ids}")
    public WebResult<Void> remove(@PathVariable Long[] ids) {
        return toAjax(service.deleteByIds(ids));
    }

    /**
     * 清理操作日志记录
     */
    @Log(title = "操作日志", businessType = BusinessType.CLEAN)
    @SaCheckPermission("monitor:operation-log:remove")
    @DeleteMapping("/clean")
    public WebResult<Void> clean() {
        service.clean();
        return WebResult.success();
    }
}
