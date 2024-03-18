package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.idempotent.RepeatSubmit;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysTenantPackageBo;
import com.tiandtech.system.domain.vo.SysTenantPackageVo;
import com.tiandtech.system.service.SysTenantPackageService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 租户套餐管理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/tenant-package")
public class SysTenantPackageController extends BaseController {

    private final SysTenantPackageService tenantPackageService;

    /**
     * 查询租户套餐列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:list")
    @PostMapping("/list")
    public TableDataInfo<SysTenantPackageVo> list(@RequestBody SysTenantPackageBo bo, PageQuery pageQuery) {
        Page<SysTenantPackageVo> page = tenantPackageService.listByPage(bo, pageQuery);
        return WebResult.success(page);
    }

    /**
     * 查询租户套餐下拉选列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:list")
    @GetMapping("/selectList")
    public WebResult<List<SysTenantPackageVo>> selectList() {
        return WebResult.success(tenantPackageService.list());
    }

    /**
     * 导出租户套餐列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:export")
    @Log(title = "租户套餐", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(SysTenantPackageBo bo, HttpServletResponse response) {
        List<SysTenantPackageVo> list = tenantPackageService.list(bo);
        ExcelUtil.exportExcel(list, "租户套餐", SysTenantPackageVo.class, response);
    }

    /**
     * 获取租户套餐详细信息
     *
     * @param packageId 主键
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:query")
    @GetMapping("/{packageId}")
    public WebResult<SysTenantPackageVo> getInfo(@NotNull(message = "主键不能为空")
                                                 @PathVariable Long packageId) {
        return WebResult.success(tenantPackageService.getById(packageId));
    }

    /**
     * 新增租户套餐
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:add")
    @Log(title = "租户套餐", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public WebResult<Void> add(@Validated(AddGroup.class) @RequestBody SysTenantPackageBo bo) {
        return toAjax(tenantPackageService.insert(bo));
    }

    /**
     * 修改租户套餐
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:edit")
    @Log(title = "租户套餐", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public WebResult<Void> edit(@Validated(EditGroup.class) @RequestBody SysTenantPackageBo bo) {
        return toAjax(tenantPackageService.update(bo));
    }

    /**
     * 状态修改
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:edit")
    @Log(title = "租户套餐", businessType = BusinessType.UPDATE)
    @PutMapping("/changeMenus")
    public WebResult<Void> changeMenus(@RequestBody SysTenantPackageBo bo) {
        return toAjax(tenantPackageService.updateMenus(bo));
    }

    /**
     * 删除租户套餐
     *
     * @param packageIds 主键串
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant-package:remove")
    @Log(title = "租户套餐", businessType = BusinessType.DELETE)
    @DeleteMapping("/{packageIds}")
    public WebResult<Void> remove(@NotEmpty(message = "主键不能为空")
                                  @PathVariable Long[] packageIds) {
        return toAjax(tenantPackageService.deleteWithValidByIds(List.of(packageIds), true));
    }


}
