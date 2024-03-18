package com.tiandtech.system.controller.monitor;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysLoginRecordBo;
import com.tiandtech.system.domain.vo.SysLoginRecordVo;
import com.tiandtech.system.service.SysLoginRecordService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 系统访问记录
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/monitor/login-record")
public class SysLoginRecordController extends BaseController {

    private final SysLoginRecordService sysLoginRecordService;

    /**
     * 获取系统访问记录列表
     */
    @SaCheckPermission("monitor:login-record:list")
    @PostMapping("/list")
    public TableDataInfo<SysLoginRecordVo> list(@RequestBody SysLoginRecordBo entity, PageQuery pageQuery) {
        Page<SysLoginRecordVo> list = sysLoginRecordService.listByPage(entity, pageQuery);
        return WebResult.success(list);
    }

    /**
     * 导出系统访问记录列表
     */
    @Log(title = "登录日志", businessType = BusinessType.EXPORT)
    @SaCheckPermission("monitor:login-record:export")
    @PostMapping("/export")
    public void export(SysLoginRecordBo loginRecord, HttpServletResponse response) {
        List<SysLoginRecordVo> list = sysLoginRecordService.list(loginRecord);
        ExcelUtil.exportExcel(list, "登录日志", SysLoginRecordVo.class, response);
    }

    /**
     * 批量删除登录日志
     *
     * @param infoIds 日志ids
     */
    @SaCheckPermission("monitor:login-record:remove")
    @Log(title = "登录日志", businessType = BusinessType.DELETE)
    @DeleteMapping("/{infoIds}")
    public WebResult<Void> remove(@PathVariable Long[] infoIds) {
        return toAjax(sysLoginRecordService.deleteByIds(infoIds));
    }

    /**
     * 清理系统访问记录
     */
    @SaCheckPermission("monitor:login-record:remove")
    @Log(title = "登录日志", businessType = BusinessType.CLEAN)
    @DeleteMapping("/clean")
    public WebResult<Void> clean() {
        sysLoginRecordService.clean();
        return WebResult.success();
    }
}
