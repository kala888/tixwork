package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.secure.BCrypt;
import cn.hutool.core.lang.tree.Tree;
import cn.hutool.core.util.ArrayUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.GlobalConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StreamUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.excel.core.ExcelResult;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.redis.RedisUtils;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.bo.SysDeptBo;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.*;
import com.tiandtech.system.listener.SysUserImportListener;
import com.tiandtech.system.service.*;
import com.tiandtech.tenant.helper.TenantHelper;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户信息
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/user")
public class SysUserController extends BaseController {

    private final SysUserService userService;
    private final SysRoleService roleService;
    private final SysPostService postService;
    private final SysDeptService deptService;
    private final SysTenantService tenantService;

    /**
     * 获取用户列表
     */
    @SaCheckPermission("system:user:list")
    @PostMapping("/list")
    public TableDataInfo<SysUserVo> list(@RequestBody SysUserBo user, PageQuery pageQuery) {
        pageQuery.setOrderBy("createTime");
        Page<SysUserVo> page = userService.listByPage(user, pageQuery);
        return WebResult.success(page);
    }

    /**
     * 导出用户列表
     */
    @Log(title = "用户管理", businessType = BusinessType.EXPORT)
    @SaCheckPermission("system:user:export")
    @PostMapping("/export")
    public void export(SysUserBo user, HttpServletResponse response) {
        List<SysUserVo> list = userService.list(user);
        List<SysUserExportVo> listVo = MapstructUtils.convert(list, SysUserExportVo.class);
        ExcelUtil.exportExcel(listVo, "用户数据", SysUserExportVo.class, response);
    }

    /**
     * 导入数据
     *
     * @param file          导入文件
     * @param updateSupport 是否更新已存在数据
     */
    @Log(title = "用户管理", businessType = BusinessType.IMPORT)
    @SaCheckPermission("system:user:import")
    @PostMapping(value = "/importData", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public WebResult<String> importData(@RequestPart("file") MultipartFile file, boolean updateSupport) throws Exception {
        ExcelResult<SysUserImportVo> result = ExcelUtil.importExcel(file.getInputStream(), SysUserImportVo.class,
            new SysUserImportListener(updateSupport));
        return WebResult.success(result.getSummary());
    }

    /**
     * 获取导入模板
     */
    @PostMapping("/importTemplate")
    public void importTemplate(HttpServletResponse response) {
        ExcelUtil.exportExcel(new ArrayList<>(), "用户数据", SysUserImportVo.class, response);
    }

    /**
     * 根据用户编号获取详细信息
     *
     * @param userId 用户ID
     */
    @SaCheckPermission("system:user:query")
    @GetMapping(value = {"/", "/{userId}"})
    public WebResult<SysUserVo> getInfo(@PathVariable(value = "userId", required = true) Long userId) {
        userService.checkUserDataScope(userId);
        SysUserVo sysUser = userService.selectUserById(userId);
        List<Long> roleIds = StreamUtils.toList(sysUser.getRoles(), SysRoleVo::getId);
        sysUser.setRoleIds(roleIds);
        List<Long> postIds = postService.listByUserId(userId);
        sysUser.setPostIds(postIds);
        return WebResult.success(sysUser);
//
//        SysUserInfoVo userInfoVo = new SysUserInfoVo();
//        List<SysRoleVo> roles = roleService.selectRoleAll();
//        userInfoVo.setRoles(LoginHelper.isSuperAdmin(userId) ? roles : StreamUtils.filter(roles, r -> !r.isSuperAdmin()));
//        userInfoVo.setPosts(postService.selectPostAll());
//        if (ObjectUtil.isNotNull(userId)) {
//            SysUserVo sysUser = userService.selectUserById(userId);
//            userInfoVo.setUser(sysUser);
//            userInfoVo.setRoleIds(StreamUtils.toList(sysUser.getRoles(), SysRoleVo::getId));
//            userInfoVo.setPostIds(postService.selectPostListByUserId(userId));
//        }
//        return WebResult.success(userInfoVo);
    }

    /**
     * 新增用户
     */
    @SaCheckPermission("system:user:add")
    @Log(title = "用户管理", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysUserBo user) {
        if (!userService.checkUserNameUnique(user)) {
            return WebResult.error("新增用户'" + user.getUserName() + "'失败，登录账号已存在");
        } else if (StringUtils.isNotEmpty(user.getMobile()) && !userService.checkMobileUnique(user)) {
            return WebResult.error("新增用户'" + user.getUserName() + "'失败，手机号码已存在");
        } else if (StringUtils.isNotEmpty(user.getEmail()) && !userService.checkEmailUnique(user)) {
            return WebResult.error("新增用户'" + user.getUserName() + "'失败，邮箱账号已存在");
        }
        if (TenantHelper.isEnable()) {
            if (!tenantService.checkAccountBalance(TenantHelper.getTenantId())) {
                return WebResult.error("当前租户下用户名额不足，请联系管理员");
            }
        }
        user.setPassword(BCrypt.hashpw(user.getPassword()));
        return toAjax(userService.insertUser(user));
    }

    /**
     * 修改用户
     */
    @SaCheckPermission("system:user:edit")
    @Log(title = "用户管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysUserBo user) {
        userService.checkUserAllowed(user.getId());
        userService.checkUserDataScope(user.getId());
        if (!userService.checkUserNameUnique(user)) {
            return WebResult.error("修改用户'" + user.getUserName() + "'失败，登录账号已存在");
        } else if (StringUtils.isNotEmpty(user.getMobile()) && !userService.checkMobileUnique(user)) {
            return WebResult.error("修改用户'" + user.getUserName() + "'失败，手机号码已存在");
        } else if (StringUtils.isNotEmpty(user.getEmail()) && !userService.checkEmailUnique(user)) {
            return WebResult.error("修改用户'" + user.getUserName() + "'失败，邮箱账号已存在");
        }
        return toAjax(userService.updateUser(user));
    }

    /**
     * 删除用户
     *
     * @param userIds 角色ID串
     */
    @SaCheckPermission("system:user:remove")
    @Log(title = "用户管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{userIds}")
    public WebResult<Void> remove(@PathVariable Long[] userIds) {
        if (ArrayUtil.contains(userIds, LoginHelper.getUserId())) {
            return WebResult.error("当前用户不能删除");
        }
        return toAjax(userService.deleteByIds(userIds));
    }

//    /**
//     * 用户充值密码
//     */
//    @SaCheckPermission("system:user:resetPwd")
//    @Log(title = "用户管理", businessType = BusinessType.UPDATE)
//    @PutMapping("/resetPwd")
//    public WebResult<Void> resetPwd(@RequestBody SysUserBo user) {
//        userService.checkUserAllowed(user.getUserId());
//        userService.checkUserDataScope(user.getUserId());
//        user.setPassword(BCrypt.hashpw(user.getPassword()));
//        return toAjax(userService.resetUserPwd(user.getUserId(), user.getPassword()));
//    }

    /**
     * 状态修改
     */
    @SaCheckPermission("system:user:edit")
    @Log(title = "用户管理", businessType = BusinessType.UPDATE)
    @PutMapping("/changeStatus")
    public WebResult<Void> changeStatus(@RequestBody SysUserBo user) {
        userService.checkUserAllowed(user.getId());
        userService.checkUserDataScope(user.getId());
        return toAjax(userService.updateUserStatus(user.getId(), user.getStatus()));
    }

    /**
     * 根据用户编号获取授权角色
     *
     * @param userId 用户ID
     */
    @SaCheckPermission("system:user:query")
    @GetMapping("/authRole/{userId}")
    public WebResult<SysUserInfoVo> authRole(@PathVariable Long userId) {
        SysUserVo user = userService.selectUserById(userId);
        List<SysRoleVo> roles = roleService.listByUserId(userId);
        SysUserInfoVo userInfoVo = new SysUserInfoVo();
        userInfoVo.setUser(user);
        userInfoVo.setRoles(LoginHelper.isSuperAdmin(userId) ? roles : StreamUtils.filter(roles, r -> !r.isSuperAdmin()));
        return WebResult.success(userInfoVo);
    }

    /**
     * 用户授权角色
     *
     * @param userId  用户Id
     * @param roleIds 角色ID串
     */
    @SaCheckPermission("system:user:edit")
    @Log(title = "用户管理", businessType = BusinessType.GRANT)
    @PutMapping("/authRole")
    public WebResult<Void> insertAuthRole(Long userId, Long[] roleIds) {
        userService.checkUserDataScope(userId);
        userService.insertUserAuth(userId, roleIds);
        return WebResult.success();
    }

    /**
     * 获取部门树列表
     */
    @SaCheckPermission("system:user:list")
    @GetMapping("/deptTree")
    public WebResult<List<Tree<Long>>> deptTree(SysDeptBo dept) {
        return WebResult.success(deptService.selectDeptTreeList(dept));
    }


    /**
     * 根据用户Id获取Role和Post的选项
     */
    @SaCheckPermission("system:user:query")
    @GetMapping(value = {"/getRoleOptions"})
    public WebResult getRoleOptions() {
        List<SysRoleVo> roles = roleService.list();
        List<SysRoleVo> roleList = roles.stream().filter(r -> !r.isSuperAdmin()).collect(Collectors.toList());
        return WebResult.success(roleList);
    }

    /**
     * 根据用户Id获取Role和Post的选项
     */
    @SaCheckPermission("system:user:query")
    @GetMapping(value = {"/getPostOptions"})
    public WebResult getPostOptions() {
        List<SysPostVo> postList = postService.list();
        return WebResult.success(postList);
    }

    /**
     * 用户授权角色
     */
    @SaCheckPermission("system:user:list")
    @Log(title = "用户管理", businessType = BusinessType.GRANT)
    @PostMapping("/list-users-by-role/{roleId}")
    public TableDataInfo<SysUserVo> roleUserList(@PathVariable Long roleId, PageQuery pageQuery) {
        Page<SysUserVo> page = userService.listUserListByRole(roleId, pageQuery);
        return WebResult.success(page);
    }

    @SaCheckPermission("system:user:unlock")
    @Log(title = "账户解锁", businessType = BusinessType.OTHER)
    @GetMapping("/unlock/{userName}")
    public WebResult<Void> unlock(@PathVariable("userName") String userName) {
        String loginName = GlobalConstants.PWD_ERR_CNT_KEY + userName;
        if (RedisUtils.hasKey(loginName)) {
            RedisUtils.deleteObject(loginName);
        }
        return WebResult.success();
    }

}
