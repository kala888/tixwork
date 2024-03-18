package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.idempotent.RepeatSubmit;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysClientBo;
import com.tiandtech.system.domain.vo.SysClientVo;
import com.tiandtech.system.service.SysClientService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 客户端管理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/client")
public class SysClientController extends BaseController {

    private final SysClientService sysClientService;

    /**
     * 查询客户端管理列表
     */
    @SaCheckPermission("system:client:list")
    @PostMapping("/list")
    public WebResult.TableDataInfo<SysClientVo> list(SysClientBo bo, PageQuery pageQuery) {
        return sysClientService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出客户端管理列表
     */
    @SaCheckPermission("system:client:export")
    @Log(title = "客户端管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(SysClientBo bo, HttpServletResponse response) {
        List<SysClientVo> list = sysClientService.queryList(bo);
        ExcelUtil.exportExcel(list, "客户端管理", SysClientVo.class, response);
    }

    /**
     * 获取客户端管理详细信息
     *
     * @param id 主键
     */
    @SaCheckPermission("system:client:query")
    @GetMapping("/{id}")
    public WebResult<SysClientVo> getInfo(@NotNull(message = "主键不能为空") @PathVariable Long id) {
        return WebResult.success(sysClientService.queryById(id));
    }

    /**
     * 新增客户端管理
     */
    @SaCheckPermission("system:client:add")
    @Log(title = "客户端管理", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public WebResult<Void> add(@Validated(AddGroup.class) @RequestBody SysClientBo bo) {
        return toAjax(sysClientService.insertByBo(bo));
    }

    /**
     * 修改客户端管理
     */
    @SaCheckPermission("system:client:edit")
    @Log(title = "客户端管理", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public WebResult<Void> edit(@Validated(EditGroup.class) @RequestBody SysClientBo bo) {
        return toAjax(sysClientService.updateByBo(bo));
    }

    /**
     * 状态修改
     */
    @SaCheckPermission("system:client:edit")
    @Log(title = "客户端管理", businessType = BusinessType.UPDATE)
    @PutMapping("/changeStatus")
    public WebResult<Void> changeStatus(@RequestBody SysClientBo bo) {
        return toAjax(sysClientService.updateUserStatus(bo.getId(), bo.getStatus()));
    }

    /**
     * 删除客户端管理
     *
     * @param ids 主键串
     */
    @SaCheckPermission("system:client:remove")
    @Log(title = "客户端管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public WebResult<Void> remove(@NotEmpty(message = "主键不能为空") @PathVariable Long[] ids) {
        return toAjax(sysClientService.deleteWithValidByIds(List.of(ids), true));
    }
}
