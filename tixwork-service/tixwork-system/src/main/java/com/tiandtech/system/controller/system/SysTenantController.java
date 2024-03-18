package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaIgnore;
import com.baomidou.lock.annotation.Lock4j;
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
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.bo.SysTenantBo;
import com.tiandtech.system.domain.vo.SysTenantVo;
import com.tiandtech.system.service.SysTenantService;
import com.tiandtech.tenant.helper.TenantHelper;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 租户管理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/tenant")
public class SysTenantController extends BaseController {

    private final SysTenantService tenantService;

    /**
     * 查询租户列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:list")
    @PostMapping("/list")
    public TableDataInfo<SysTenantVo> list(@RequestBody SysTenantBo bo, PageQuery pageQuery) {
        Page<SysTenantVo> page = tenantService.listByPage(bo, pageQuery);
        return WebResult.success(page);
    }

    /**
     * 导出租户列表
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:export")
    @Log(title = "租户", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(SysTenantBo bo, HttpServletResponse response) {
        List<SysTenantVo> list = tenantService.list(bo);
        ExcelUtil.exportExcel(list, "租户", SysTenantVo.class, response);
    }

    /**
     * 获取租户详细信息
     *
     * @param id 主键
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:query")
    @GetMapping("/{id}")
    public WebResult<SysTenantVo> getInfo(@NotNull(message = "主键不能为空")
                                          @PathVariable Long id) {
        return WebResult.success(tenantService.getById(id));
    }

    /**
     * 新增租户
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:add")
    @Log(title = "租户", businessType = BusinessType.INSERT)
    @Lock4j
    @RepeatSubmit()
    @PostMapping()
    public WebResult<Void> add(@Validated(AddGroup.class) @RequestBody SysTenantBo bo) {
        if (!tenantService.checkCompanyUnique(bo)) {
            return WebResult.error("新增租户'" + bo.getCompanyName() + "'失败，企业名称已存在");
        }
        return toAjax(TenantHelper.ignore(() -> tenantService.insert(bo)));
    }

    /**
     * 修改租户
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:edit")
    @Log(title = "租户", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public WebResult<Void> edit(@Validated(EditGroup.class) @RequestBody SysTenantBo bo) {
        tenantService.checkTenantAllowed(bo.getTenantId());
        if (!tenantService.checkCompanyUnique(bo)) {
            return WebResult.error("修改租户'" + bo.getCompanyName() + "'失败，公司名称已存在");
        }
        SysTenantVo obj = tenantService.getById(bo.getId());
        bo.setTenantId(obj.getTenantId());
        return toAjax(tenantService.update(bo));
    }

//    /**
//     * 状态修改
//     */
//    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
//    @SaCheckPermission("system:tenant:edit")
//    @Log(title = "租户", businessType = BusinessType.UPDATE)
//    @PutMapping("/changeStatus")
//    public WebResult<Void> changeStatus(@RequestBody SysTenantBo bo) {
//        tenantService.checkTenantAllowed(bo.getTenantId());
//        return toAjax(tenantService.updateTenantStatus(bo));
//    }

    /**
     * 删除租户
     *
     * @param ids 主键串
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:remove")
    @Log(title = "租户", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public WebResult<Void> remove(@NotEmpty(message = "主键不能为空")
                                  @PathVariable Long[] ids) {
        return toAjax(tenantService.deleteWithValidByIds(List.of(ids), true));
    }


    /**
     * 获取当前用户的Tenant
     */
    @GetMapping("/dynamic")
    @SaIgnore
    public WebResult<String> getDynamicTenant() {
        //退出的时候，前台框架会调用profile，方式报错
        if (LoginHelper.isNotLogin()) {
            return WebResult.success("未登录，不能获取Tenant");
        }
        String tenant = TenantHelper.getDynamic();
        return WebResult.success(tenant);
    }

    /**
     * 动态切换租户
     *
     * @param tenantId 租户ID
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @GetMapping("/dynamic/{tenantId}")
    public WebResult<String> dynamicTenant(@NotBlank(message = "租户ID不能为空") @PathVariable String tenantId) {
        TenantHelper.setDynamic(tenantId);
        return WebResult.success();
    }

    /**
     * 清除动态租户
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @GetMapping("/dynamic/clear")
    public WebResult<Void> dynamicClear() {
        TenantHelper.clearDynamic();
        return WebResult.success();
    }


    /**
     * 同步租户套餐
     *
     * @param tenantId 租户id
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:tenant:edit")
    @Log(title = "租户", businessType = BusinessType.UPDATE)
    @GetMapping("/syncTenantPackage")
    public WebResult<Void> syncTenantPackage(@NotEmpty(message = "租户ID不能为空") String tenantId) {
        return toAjax(TenantHelper.ignore(() -> tenantService.syncTenantPackage(tenantId)));
    }

}
