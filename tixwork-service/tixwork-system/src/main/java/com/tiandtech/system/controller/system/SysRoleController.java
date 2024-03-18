package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysUserRole;
import com.tiandtech.system.domain.bo.SysDeptBo;
import com.tiandtech.system.domain.bo.SysRoleBo;
import com.tiandtech.system.domain.vo.DeptTreeSelectVo;
import com.tiandtech.system.domain.vo.SysRoleVo;
import com.tiandtech.system.service.SysDeptService;
import com.tiandtech.system.service.SysRoleService;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 角色信息
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/role")
public class SysRoleController extends BaseController {

    private final SysRoleService roleService;
    private final SysUserService userService;
    private final SysDeptService deptService;

    /**
     * 获取角色信息列表
     */
    @SaCheckPermission("system:role:list")
    @PostMapping("/list")
    public TableDataInfo<SysRoleVo> list(@RequestBody SysRoleBo role, PageQuery pageQuery) {
        Page<SysRoleVo> page = roleService.listByPage(role, pageQuery);
        return WebResult.success(page);
    }

    /**
     * 导出角色信息列表
     */
    @Log(title = "角色管理", businessType = BusinessType.EXPORT)
    @SaCheckPermission("system:role:export")
    @PostMapping("/export")
    public void export(SysRoleBo role, HttpServletResponse response) {
        List<SysRoleVo> list = roleService.list(role);
        ExcelUtil.exportExcel(list, "角色数据", SysRoleVo.class, response);
    }

    /**
     * 根据角色编号获取详细信息
     *
     * @param roleId 角色ID
     */
    @SaCheckPermission("system:role:query")
    @GetMapping(value = "/{roleId}")
    public WebResult<SysRoleVo> getInfo(@PathVariable Long roleId) {
        roleService.checkRoleDataScope(roleId);
        return WebResult.success(roleService.getById(roleId));
    }

    /**
     * 新增角色
     */
    @SaCheckPermission("system:role:add")
    @Log(title = "角色管理", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysRoleBo role) {
        roleService.checkRoleAllowed(role);
        if (!roleService.checkRoleNameUnique(role)) {
            return WebResult.error("新增角色'" + role.getRoleName() + "'失败，角色名称已存在");
        } else if (!roleService.checkRoleKeyUnique(role)) {
            return WebResult.error("新增角色'" + role.getRoleName() + "'失败，角色权限已存在");
        }
        return toAjax(roleService.insert(role));

    }

    /**
     * 更新role 和 menu关系
     */
    @SaCheckPermission("system:role:edit")
    @Log(title = "角色管理", businessType = BusinessType.UPDATE)
    @PutMapping("/changeRoleMenu")
    public WebResult changeRoleMenu(@RequestBody SysRoleBo role) {
        roleService.checkRoleAllowed(role);
        roleService.updateRoleMenuRelationship(role);
        return WebResult.success();
    }

    /**
     * 修改保存角色
     */
    @SaCheckPermission("system:role:edit")
    @Log(title = "角色管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysRoleBo role) {
        roleService.checkRoleAllowed(role);
        roleService.checkRoleDataScope(role.getId());
        if (!roleService.checkRoleNameUnique(role)) {
            return WebResult.error("修改角色'" + role.getRoleName() + "'失败，角色名称已存在");
        } else if (!roleService.checkRoleKeyUnique(role)) {
            return WebResult.error("修改角色'" + role.getRoleName() + "'失败，角色权限已存在");
        }

        if (roleService.update(role) > 0) {
            roleService.cleanOnlineUserByRole(role.getId());
            return WebResult.success();
        }
        return WebResult.error("修改角色'" + role.getRoleName() + "'失败，请联系管理员");
    }

    /**
     * 修改保存数据权限
     */
    @SaCheckPermission("system:role:edit")
    @Log(title = "角色管理", businessType = BusinessType.UPDATE)
    @PutMapping("/dataScope")
    public WebResult<Void> dataScope(@RequestBody SysRoleBo role) {
        roleService.checkRoleAllowed(role);
        roleService.checkRoleDataScope(role.getId());
        return toAjax(roleService.authDataScope(role));
    }

    /**
     * 状态修改
     */
    @SaCheckPermission("system:role:edit")
    @Log(title = "角色管理", businessType = BusinessType.UPDATE)
    @PutMapping("/changeStatus")
    public WebResult<Void> changeStatus(@RequestBody SysRoleBo role) {
        roleService.checkRoleAllowed(role);
        roleService.checkRoleDataScope(role.getId());
        return toAjax(roleService.updateRoleStatus(role.getId(), role.getStatus()));
    }

    /**
     * 删除角色
     *
     * @param roleIds 角色ID串
     */
    @SaCheckPermission("system:role:remove")
    @Log(title = "角色管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{roleIds}")
    public WebResult<Void> remove(@PathVariable Long[] roleIds) {
        return toAjax(roleService.deleteRoleByIds(roleIds));
    }

    /**
     * 获取角色选择框列表
     */
    @SaCheckPermission("system:role:query")
    @GetMapping("/optionselect")
    public WebResult<List<SysRoleVo>> optionselect() {
        return WebResult.success(roleService.list());
    }

//    /**
//     * 查询已分配用户角色列表
//     */
//    @SaCheckPermission("system:role:list")
//    @GetMapping("/authUser/allocatedList")
//    public TableDataInfo<SysUserVo> allocatedList(SysUserBo user, PageQuery pageQuery) {
//        return userService.selectAllocatedList(user, pageQuery);
//    }

//    /**
//     * 查询未分配用户角色列表
//     */
//    @SaCheckPermission("system:role:list")
//    @GetMapping("/authUser/unallocatedList")
//    public TableDataInfo<SysUserVo> unallocatedList(SysUserBo user, PageQuery pageQuery) {
//        return userService.selectUnallocatedList(user, pageQuery);
//    }

    /**
     * 取消授权用户
     */
    @SaCheckPermission("system:role:edit")
    @Log(title = "角色管理", businessType = BusinessType.GRANT)
    @PutMapping("/authUser/cancel")
    public WebResult<Void> cancelAuthUser(@RequestBody SysUserRole userRole) {
        return toAjax(roleService.deleteAuthUser(userRole));
    }

//    /**
//     * 批量取消授权用户
//     *
//     * @param roleId  角色ID
//     * @param userIds 用户ID串
//     */
//    @SaCheckPermission("system:role:edit")
//    @Log(title = "角色管理", businessType = BusinessType.GRANT)
//    @PutMapping("/authUser/cancelAll")
//    public WebResult<Void> cancelAuthUserAll(Long roleId, Long[] userIds) {
//        return toAjax(roleService.deleteAuthUsers(roleId, userIds));
//    }

//    /**
//     * 批量选择用户授权
//     *
//     * @param roleId  角色ID
//     * @param userIds 用户ID串
//     */
//    @SaCheckPermission("system:role:edit")
//    @Log(title = "角色管理", businessType = BusinessType.GRANT)
//    @PutMapping("/authUser/selectAll")
//    public WebResult<Void> selectAuthUserAll(Long roleId, Long[] userIds) {
//        roleService.checkRoleDataScope(roleId);
//        return toAjax(roleService.insertAuthUsers(roleId, userIds));
//    }

    /**
     * 获取对应角色部门树列表
     *
     * @param roleId 角色ID
     */
    @SaCheckPermission("system:role:list")
    @GetMapping(value = "/deptTree/{roleId}")
    public WebResult<DeptTreeSelectVo> roleDeptTreeselect(@PathVariable("roleId") Long roleId) {
        DeptTreeSelectVo selectVo = new DeptTreeSelectVo();
        selectVo.setCheckedKeys(deptService.listByRoleId(roleId));
        selectVo.setDepts(deptService.selectDeptTreeList(new SysDeptBo()));
        return WebResult.success(selectVo);
    }
}
