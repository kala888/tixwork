package com.tiandtech.system.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.CacheNames;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.service.UserService;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StreamUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.mybatis.helper.DataBaseHelper;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysDept;
import com.tiandtech.system.domain.SysUser;
import com.tiandtech.system.domain.SysUserPost;
import com.tiandtech.system.domain.SysUserRole;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.SysPostVo;
import com.tiandtech.system.domain.vo.SysRoleVo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.mapper.*;
import com.tiandtech.system.service.SysUserExtendService;
import com.tiandtech.system.service.SysUserService;
import com.tiandtech.tenant.helper.TenantHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 用户 业务层处理
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class SysUserServiceImpl implements SysUserService, UserService {

    private final SysUserExtendService extendService;
    private final SysUserMapper baseMapper;
    private final SysDeptMapper deptMapper;
    private final SysRoleMapper roleMapper;
    private final SysPostMapper postMapper;
    private final SysUserRoleMapper userRoleMapper;
    private final SysUserPostMapper userPostMapper;

    @Override
    public Page<SysUserVo> listByPage(SysUserBo user, PageQuery pageQuery) {
        return baseMapper.selectPageUserList(pageQuery.build(), this.buildQueryWrapper(user));
    }

    /**
     * 根据条件分页查询用户列表
     *
     * @param user 用户信息
     * @return 用户信息集合信息
     */
    @Override
    public List<SysUserVo> list(SysUserBo user) {
        return baseMapper.selectUserList(this.buildQueryWrapper(user));
    }

    private Wrapper<SysUser> buildQueryWrapper(SysUserBo user) {
        Map<String, Object> params = user.getParams();
        QueryWrapper<SysUser> wrapper = Wrappers.query();
        wrapper.eq("u.del_flag", UserConstants.USER_NORMAL)
            .eq(ObjectUtil.isNotNull(user.getId()), "u.user_id", user.getId())
            .like(StringUtils.isNotBlank(user.getUserName()), "u.user_name", user.getUserName())
            .like(StringUtils.isNotBlank(user.getNickName()), "u.nick_name", user.getNickName())
            .eq(StringUtils.isNotBlank(user.getStatus()), "u.status", user.getStatus())
            .like(StringUtils.isNotBlank(user.getMobile()), "u.mobile", user.getMobile())
            .between(params.get("beginTime") != null && params.get("endTime") != null,
                "u.create_time", params.get("beginTime"), params.get("endTime"))
            .and(ObjectUtil.isNotNull(user.getDeptId()), w -> {
                List<SysDept> deptList = deptMapper.selectList(new LambdaQueryWrapper<SysDept>()
                    .select(SysDept::getId)
                    .apply(DataBaseHelper.findInSet(user.getDeptId(), "ancestors")));
                List<Long> ids = StreamUtils.toList(deptList, SysDept::getId);
                ids.add(user.getDeptId());
                w.in("u.dept_id", ids);
            });
        return wrapper;
    }

    @Override
    public Page<SysUserVo> listUserListByRole(Long roleId, PageQuery pageQuery) {
        QueryWrapper<SysUser> wrapper = Wrappers.query();
        wrapper.eq(ObjectUtil.isNotNull(roleId), "sur.role_id", roleId)
            .eq("u.del_flag", UserConstants.USER_NORMAL)
            .orderByAsc("u.user_id");
        return userRoleMapper.selectUserPageByRoleId(pageQuery.build(), wrapper);
    }

//    /**
//     * 根据条件分页查询已分配用户角色列表
//     *
//     * @param user 用户信息
//     * @return 用户信息集合信息
//     */
//    @Override
//    public TableDataInfo<SysUserVo> selectAllocatedList(SysUserBo user, PageQuery pageQuery) {
//        QueryWrapper<SysUser> wrapper = Wrappers.query();
//        wrapper.eq("u.del_flag", UserConstants.USER_NORMAL)
//            .eq(ObjectUtil.isNotNull(user.getRoleId()), "r.role_id", user.getRoleId())
//            .like(StringUtils.isNotBlank(user.getUserName()), "u.user_name", user.getUserName())
//            .eq(StringUtils.isNotBlank(user.getStatus()), "u.status", user.getStatus())
//            .like(StringUtils.isNotBlank(user.getMobile()), "u.mobile", user.getMobile());
//        Page<SysUserVo> page = baseMapper.selectAllocatedList(pageQuery.build(), wrapper);
//        return WebResult.success(page);
//    }

//    /**
//     * 根据条件分页查询未分配用户角色列表
//     *
//     * @param user 用户信息
//     * @return 用户信息集合信息
//     */
//    @Override
//    public TableDataInfo<SysUserVo> selectUnallocatedList(SysUserBo user, PageQuery pageQuery) {
//        List<Long> userIds = userRoleMapper.selectUserIdsByRoleId(user.getRoleId());
//        QueryWrapper<SysUser> wrapper = Wrappers.query();
//        wrapper.eq("u.del_flag", UserConstants.USER_NORMAL)
//            .and(w -> w.ne("r.role_id", user.getRoleId()).or().isNull("r.role_id"))
//            .notIn(CollUtil.isNotEmpty(userIds), "u.user_id", userIds)
//            .like(StringUtils.isNotBlank(user.getUserName()), "u.user_name", user.getUserName())
//            .like(StringUtils.isNotBlank(user.getMobile()), "u.mobile", user.getMobile());
//        Page<SysUserVo> page = baseMapper.selectUnallocatedList(pageQuery.build(), wrapper);
//        return WebResult.success(page);
//    }

    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    @Override
    public SysUserVo selectUserByUserName(String userName) {
        return baseMapper.selectUserByUserName(userName);
    }

    /**
     * 通过手机号查询用户
     *
     * @param mobile 手机号
     * @return 用户对象信息
     */
    @Override
    public SysUserVo selectUserByMobile(String mobile) {
        return baseMapper.selectUserByMobile(mobile);
    }

    @Override
    public SysUserVo selectUserByOpenId(String openId) {
        return baseMapper.selectUserByOpenId(openId);
    }

    /**
     * 通过用户ID查询用户
     *
     * @param userId 用户ID
     * @return 用户对象信息
     */
    @Override
    public SysUserVo selectUserById(Long userId) {
        return baseMapper.selectUserById(userId);
    }

    @Override
    public SysUserVo getProfile(Long userId) {
        return baseMapper.getProfile(userId);
    }

    /**
     * 查询用户所属角色组
     *
     * @param userName 用户名
     * @return 结果
     */
    @Override
    public String selectUserRoleGroup(String userName) {
        List<SysRoleVo> list = roleMapper.selectRolesByUserName(userName);
        if (CollUtil.isEmpty(list)) {
            return StringUtils.EMPTY;
        }
        return StreamUtils.join(list, SysRoleVo::getRoleName);
    }

    /**
     * 查询用户所属岗位组
     *
     * @param userName 用户名
     * @return 结果
     */
    @Override
    public String selectUserPostGroup(String userName) {
        List<SysPostVo> list = postMapper.selectPostsByUserName(userName);
        if (CollUtil.isEmpty(list)) {
            return StringUtils.EMPTY;
        }
        return StreamUtils.join(list, SysPostVo::getPostName);
    }

    /**
     * 校验用户名称是否唯一
     *
     * @param user 用户信息
     * @return 结果
     */
    @Override
    public boolean checkUserNameUnique(SysUserBo user) {
        boolean exist = TenantHelper.ignore(() ->
            baseMapper.exists(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getUserName, user.getUserName())
                .ne(ObjectUtil.isNotNull(user.getId()), SysUser::getId, user.getId()))
        );
        return !exist;
    }

    /**
     * 校验手机号码是否唯一
     *
     * @param user 用户信息
     */
    @Override
    public boolean checkMobileUnique(SysUserBo user) {
        boolean exist = TenantHelper.ignore(() ->
            baseMapper.exists(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getMobile, user.getMobile())
                .ne(ObjectUtil.isNotNull(user.getId()), SysUser::getId, user.getId()))
        );
        return !exist;
    }

    /**
     * 校验email是否唯一
     *
     * @param user 用户信息
     */
    @Override
    public boolean checkEmailUnique(SysUserBo user) {
        boolean exist = TenantHelper.ignore(() ->
            baseMapper.exists(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getEmail, user.getEmail())
                .ne(ObjectUtil.isNotNull(user.getId()), SysUser::getId, user.getId()))
        );
        return !exist;
    }

    /**
     * 校验用户是否允许操作
     *
     * @param userId 用户ID
     */
    @Override
    public void checkUserAllowed(Long userId) {
        if (ObjectUtil.isNotNull(userId) && LoginHelper.isSuperAdmin(userId)) {
            throw new ServiceException("不允许操作超级管理员用户");
        }
    }

    /**
     * 校验用户是否有数据权限
     *
     * @param userId 用户id
     */
    @Override
    public void checkUserDataScope(Long userId) {
        if (ObjectUtil.isNull(userId)) {
            return;
        }
        if (LoginHelper.isSuperAdmin()) {
            return;
        }
        if (ObjectUtil.isNull(baseMapper.selectUserById(userId))) {
            throw new ServiceException("没有权限访问用户数据！");
        }
    }

    /**
     * 新增保存用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int insertUser(SysUserBo user) {
        SysUser sysUser = MapstructUtils.convert(user, SysUser.class);
        // 新增用户信息
        int rows = baseMapper.insert(sysUser);
        if (rows == 0) {
            return rows;
        }
        user.setId(sysUser.getId());
        // 新增用户岗位关联
        insertUserPost(user, false);
        // 新增用户与角色管理
        insertUserRole(user, false);

        extendService.postUserCreate(sysUser);

        return rows;
    }

    /**
     * 注册用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    @Override
    public SysUser registerUser(SysUserBo user, String tenantId) {
        user.setCreateBy(user.getId());
        user.setUpdateBy(user.getId());
        SysUser sysUser = MapstructUtils.convert(user, SysUser.class);
        sysUser.setTenantId(tenantId);
        int result = baseMapper.insert(sysUser);
        if (result == 0) {
            return null;
        }
        extendService.postUserRegistry(sysUser);
        return sysUser;
    }

    /**
     * 修改保存用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateUser(SysUserBo user) {
        // 新增用户与角色管理
        insertUserRole(user, true);
        // 新增用户与岗位管理
        insertUserPost(user, true);
        SysUser sysUser = MapstructUtils.convert(user, SysUser.class);
        // 防止错误更新后导致的数据误删除
        int flag = baseMapper.updateById(sysUser);
        if (flag < 1) {
            throw new ServiceException("修改用户" + user.getUserName() + "信息失败");
        }
        return flag;
    }

    /**
     * 用户授权角色
     *
     * @param userId  用户ID
     * @param roleIds 角色组
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertUserAuth(Long userId, Long[] roleIds) {
        insertUserRole(userId, roleIds, true);
    }

    /**
     * 修改用户状态
     *
     * @param userId 用户ID
     * @param status 帐号状态
     * @return 结果
     */
    @Override
    public int updateUserStatus(Long userId, String status) {
        return baseMapper.update(null,
            new LambdaUpdateWrapper<SysUser>()
                .set(SysUser::getStatus, status)
                .eq(SysUser::getId, userId));
    }

    /**
     * 修改用户基本信息
     *
     * @param user 用户信息
     * @return 结果
     */
    @Override
    public int updateUserProfile(SysUserBo user) {
        return baseMapper.update(null,
            new LambdaUpdateWrapper<SysUser>()
                .set(ObjectUtil.isNotEmpty(user.getNickName()), SysUser::getNickName, user.getNickName())
                .set(StringUtils.isNotEmpty(user.getMobile()), SysUser::getMobile, user.getMobile())
                .set(StringUtils.isNotEmpty(user.getEmail()), SysUser::getEmail, user.getEmail())
                .set(StringUtils.isNotEmpty(user.getAvatar()), SysUser::getAvatar, user.getAvatar())
                .set(user.getGender() != null, SysUser::getGender, user.getGender())
                .eq(SysUser::getId, user.getId()));
    }

    /**
     * 修改用户头像
     *
     * @param userId 用户ID
     * @param avatar 头像地址
     * @return 结果
     */
    @Override
    public boolean updateUserAvatar(Long userId, String avatar) {
        return baseMapper.update(null,
            new LambdaUpdateWrapper<SysUser>()
                .set(SysUser::getAvatar, avatar)
                .eq(SysUser::getId, userId)) > 0;
    }

    /**
     * 重置用户密码
     *
     * @param userId   用户ID
     * @param password 密码
     * @return 结果
     */
    @Override
    public int updatePassword(Long userId, String password) {
        return baseMapper.update(null,
            new LambdaUpdateWrapper<SysUser>()
                .set(SysUser::getPassword, password)
                .set(SysUser::getUpdateBy, LoginHelper.getUserId())
                .eq(SysUser::getId, userId));
    }

    /**
     * 新增用户角色信息
     *
     * @param user  用户对象
     * @param clear 清除已存在的关联数据
     */
    private void insertUserRole(SysUserBo user, boolean clear) {
        this.insertUserRole(user.getId(), user.getRoleIds(), clear);
    }

    /**
     * 新增用户岗位信息
     *
     * @param user  用户对象
     * @param clear 清除已存在的关联数据
     */
    private void insertUserPost(SysUserBo user, boolean clear) {
        Long[] posts = user.getPostIds();
        if (ArrayUtil.isNotEmpty(posts)) {
            if (clear) {
                // 删除用户与岗位关联
                userPostMapper.delete(new LambdaQueryWrapper<SysUserPost>().eq(SysUserPost::getUserId, user.getId()));
            }
            // 新增用户与岗位管理
            List<SysUserPost> list = StreamUtils.toList(List.of(posts), postId -> {
                SysUserPost up = new SysUserPost();
                up.setUserId(user.getId());
                up.setPostId(postId);
                return up;
            });
            userPostMapper.insertBatch(list);
        }
    }

    /**
     * 新增用户角色信息
     *
     * @param userId  用户ID
     * @param roleIds 角色组
     * @param clear   清除已存在的关联数据
     */
    private void insertUserRole(Long userId, Long[] roleIds, boolean clear) {
        if (ArrayUtil.isNotEmpty(roleIds)) {
            // 判断是否具有此角色的操作权限
            List<SysRoleVo> roles = roleMapper.selectRoleList(new LambdaQueryWrapper<>());
            if (CollUtil.isEmpty(roles)) {
                throw new ServiceException("没有权限访问角色的数据");
            }
            List<Long> roleList = StreamUtils.toList(roles, SysRoleVo::getId);
            if (!LoginHelper.isSuperAdmin(userId)) {
                roleList.remove(UserConstants.SUPER_ADMIN_ID);
            }
            List<Long> canDoRoleList = StreamUtils.filter(List.of(roleIds), roleList::contains);
            if (CollUtil.isEmpty(canDoRoleList)) {
                throw new ServiceException("没有权限访问角色的数据");
            }
            if (clear) {
                // 删除用户与角色关联
                userRoleMapper.delete(new LambdaQueryWrapper<SysUserRole>().eq(SysUserRole::getUserId, userId));
            }
            // 新增用户与角色管理
            List<SysUserRole> list = StreamUtils.toList(canDoRoleList, roleId -> {
                SysUserRole ur = new SysUserRole();
                ur.setUserId(userId);
                ur.setRoleId(roleId);
                return ur;
            });
            userRoleMapper.insertBatch(list);
        }
    }

    /**
     * 通过用户ID删除用户
     *
     * @param userId 用户ID
     * @return 结果
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int delete(Long userId) {
        // 删除用户与角色关联
        userRoleMapper.delete(new LambdaQueryWrapper<SysUserRole>().eq(SysUserRole::getUserId, userId));
        // 删除用户与岗位表
        userPostMapper.delete(new LambdaQueryWrapper<SysUserPost>().eq(SysUserPost::getUserId, userId));
        // 防止更新失败导致的数据删除
        int flag = baseMapper.deleteById(userId);
        if (flag < 1) {
            throw new ServiceException("删除用户失败!");
        }
        return flag;
    }

    /**
     * 批量删除用户信息
     *
     * @param userIds 需要删除的用户ID
     * @return 结果
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByIds(Long[] userIds) {
        for (Long userId : userIds) {
            checkUserAllowed(userId);
            checkUserDataScope(userId);
        }
        List<Long> ids = List.of(userIds);
        // 删除用户与角色关联
        userRoleMapper.delete(new LambdaQueryWrapper<SysUserRole>().in(SysUserRole::getUserId, ids));
        // 删除用户与岗位表
        userPostMapper.delete(new LambdaQueryWrapper<SysUserPost>().in(SysUserPost::getUserId, ids));
        // 防止更新失败导致的数据删除
        int flag = baseMapper.deleteBatchIds(ids);
        if (flag < 1) {
            throw new ServiceException("删除用户失败!");
        }
        return flag;
    }

    @Cacheable(cacheNames = CacheNames.SYS_USER_NAME, key = "#userId")
    @Override
    public String selectUserNameById(Long userId) {
        SysUser sysUser = baseMapper.selectOne(new LambdaQueryWrapper<SysUser>()
            .select(SysUser::getUserName).eq(SysUser::getId, userId));
        return ObjectUtil.isNull(sysUser) ? null : sysUser.getUserName();
    }

    @Override
    public SysUserMapper getBaseMapper() {
        return this.baseMapper;
    }
}
