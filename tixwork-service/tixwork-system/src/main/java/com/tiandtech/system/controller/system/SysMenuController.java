package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.tiandtech.base.domain.dto.TreeVo;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.bo.SysMenuBo;
import com.tiandtech.system.domain.vo.SysMenuVo;
import com.tiandtech.system.service.SysMenuService;
import com.tiandtech.web.core.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 菜单信息
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/menu")
public class SysMenuController extends BaseController {

    private final SysMenuService menuService;


    /**
     * 获取菜单列表
     */
    @SaCheckRole(value = {
        TenantConstants.SUPER_ADMIN_ROLE_KEY,
        TenantConstants.TENANT_ADMIN_ROLE_KEY
    }, mode = SaMode.OR)
    @SaCheckPermission("system:menu:list")
    @PostMapping("/list")
    public WebResult<List<SysMenuVo>> list(@RequestBody SysMenuBo menu) {
        List<SysMenuVo> menus = menuService.list(menu, LoginHelper.getUserId());
        return WebResult.success(menus);
    }

    /**
     * 根据菜单编号获取详细信息
     *
     * @param menuId 菜单ID
     */
    @SaCheckRole(value = {
        TenantConstants.SUPER_ADMIN_ROLE_KEY,
        TenantConstants.TENANT_ADMIN_ROLE_KEY
    }, mode = SaMode.OR)
    @SaCheckPermission("system:menu:query")
    @GetMapping(value = "/{menuId}")
    public WebResult<SysMenuVo> getInfo(@PathVariable Long menuId) {
        return WebResult.success(menuService.getById(menuId));
    }

//    /**
//     * 获取菜单下拉树列表
//     */
//    @SaCheckRole(value = {
//        TenantConstants.SUPER_ADMIN_ROLE_KEY,
//        TenantConstants.TENANT_ADMIN_ROLE_KEY
//    }, mode = SaMode.OR)
//    @SaCheckPermission("system:menu:query")
//    @GetMapping("/treeselect")
//    public WebResult<List<Tree<Long>>> treeselect(SysMenuBo menu) {
//        List<SysMenuVo> menus = menuService.list(menu, LoginHelper.getUserId());
//        return WebResult.success(menuService.buildMenuTreeSelect(menus));
//    }

//    /**
//     * 加载对应角色菜单列表树
//     *
//     * @param roleId 角色ID
//     */
//    @SaCheckRole(value = {
//        TenantConstants.SUPER_ADMIN_ROLE_KEY,
//        TenantConstants.TENANT_ADMIN_ROLE_KEY
//    }, mode = SaMode.OR)
//    @SaCheckPermission("system:menu:query")
//    @GetMapping(value = "/roleMenuTreeselect/{roleId}")
//    public WebResult<MenuTreeSelectVo> roleMenuTreeselect(@PathVariable("roleId") Long roleId) {
//        List<SysMenuVo> menus = menuService.list(LoginHelper.getUserId());
//        MenuTreeSelectVo selectVo = new MenuTreeSelectVo();
//        selectVo.setCheckedKeys(menuService.selectMenuListByRoleId(roleId));
//        selectVo.setMenus(menuService.buildMenuTreeSelect(menus));
//        return WebResult.success(selectVo);
//    }

//    /**
//     * 加载对应租户套餐菜单列表树
//     * TODO 待集成
//     *
//     * @param packageId 租户套餐ID
//     */
//    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
//    @SaCheckPermission("system:menu:query")
//    @GetMapping(value = "/tenantPackageMenuTreeselect/{packageId}")
//    public WebResult<MenuTreeSelectVo> tenantPackageMenuTreeselect(@PathVariable("packageId") Long packageId) {
//        List<SysMenuVo> menus = menuService.list(LoginHelper.getUserId());
//        MenuTreeSelectVo selectVo = new MenuTreeSelectVo();
//        selectVo.setCheckedKeys(menuService.selectMenuListByPackageId(packageId));
//        selectVo.setMenus(menuService.buildMenuTreeSelect(menus));
//        return WebResult.success(selectVo);
//    }

    /**
     * 新增菜单
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:menu:add")
    @Log(title = "菜单管理", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysMenuBo menu) {
        if (!menuService.checkMenuNameUnique(menu)) {
            return WebResult.error("新增菜单'" + menu.getName() + "'失败，菜单名称已存在");
        } else if (UserConstants.YES_FRAME.equals(menu.getIsFrame()) && !StringUtils.ishttp(menu.getPath())) {
            return WebResult.error("新增菜单'" + menu.getName() + "'失败，地址必须以http(s)://开头");
        }
        return toAjax(menuService.insert(menu));
    }

    /**
     * 修改菜单
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:menu:edit")
    @Log(title = "菜单管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysMenuBo menu) {
        if (!menuService.checkMenuNameUnique(menu)) {
            return WebResult.error("修改菜单'" + menu.getName() + "'失败，菜单名称已存在");
        } else if (UserConstants.YES_FRAME.equals(menu.getIsFrame()) && !StringUtils.ishttp(menu.getPath())) {
            return WebResult.error("修改菜单'" + menu.getName() + "'失败，地址必须以http(s)://开头");
        } else if (menu.getId().equals(menu.getParentId())) {
            return WebResult.error("修改菜单'" + menu.getName() + "'失败，上级菜单不能选择自己");
        }
        return toAjax(menuService.update(menu));
    }

    /**
     * 删除菜单
     *
     * @param menuId 菜单ID
     */
    @SaCheckRole(TenantConstants.SUPER_ADMIN_ROLE_KEY)
    @SaCheckPermission("system:menu:remove")
    @Log(title = "菜单管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{menuId}")
    public WebResult<Void> remove(@PathVariable("menuId") Long menuId) {
        if (menuService.hasChildByMenuId(menuId)) {
            return WebResult.error("存在子菜单,不允许删除");
        }
        if (menuService.checkMenuExistRole(menuId)) {
            return WebResult.error("菜单已分配,不允许删除");
        }
        return toAjax(menuService.deleteByIds(menuId));
    }

    /**
     * 获取menu下拉树列表,
     */
    @SaCheckRole(value = {
        TenantConstants.SUPER_ADMIN_ROLE_KEY,
        TenantConstants.TENANT_ADMIN_ROLE_KEY
    }, mode = SaMode.OR)
    @SaCheckPermission("system:menu:query")
    @GetMapping("/tree")
    public WebResult.TableDataInfo<TreeVo<SysMenuVo>> tree(SysMenuBo bo) {
        List<TreeVo<SysMenuVo>> list = menuService.selectTree(bo, LoginHelper.getUserId());
        return WebResult.success(list);
    }

    /**
     * 加载对应角色菜单列表树
     */
    @GetMapping(value = "/tree/{roleId}")
    public WebResult roleMenuByRole(@PathVariable("roleId") Long roleId) {
        List<TreeVo<SysMenuVo>> list = menuService.selectTree(new SysMenuBo(), LoginHelper.getUserId());

        Map<String, Object> ajax = new HashMap<>();
        ajax.put("checkedKeys", menuService.listByRoleId(roleId));
        ajax.put("menus", list);
        return WebResult.success(ajax);
    }
}
