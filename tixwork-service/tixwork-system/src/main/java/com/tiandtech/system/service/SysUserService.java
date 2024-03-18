package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysUser;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.mapper.SysUserMapper;

import java.util.List;

/**
 * 用户 业务层
 */
public interface SysUserService {


    Page<SysUserVo> listByPage(SysUserBo user, PageQuery pageQuery);

    Page<SysUserVo> listUserListByRole(Long role, PageQuery pageQuery);

    /**
     * 根据条件分页查询用户列表
     *
     * @param user 用户信息
     * @return 用户信息集合信息
     */
    List<SysUserVo> list(SysUserBo user);

//    /**
//     * 根据条件分页查询已分配用户角色列表
//     *
//     * @param user 用户信息
//     * @return 用户信息集合信息
//     */
//    TableDataInfo<SysUserVo> selectAllocatedList(SysUserBo user, PageQuery pageQuery);

//    /**
//     * 根据条件分页查询未分配用户角色列表
//     *
//     * @param user 用户信息
//     * @return 用户信息集合信息
//     */
//    TableDataInfo<SysUserVo> selectUnallocatedList(SysUserBo user, PageQuery pageQuery);

    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    SysUserVo selectUserByUserName(String userName);

    /**
     * 通过手机号查询用户
     *
     * @param mobile 手机号
     * @return 用户对象信息
     */
    SysUserVo selectUserByMobile(String mobile);

    /**
     * 通过openId查询用户
     *
     * @param openId 微信的openId
     * @return 用户对象信息
     */
    SysUserVo selectUserByOpenId(String openId);

    /**
     * 通过用户ID查询用户
     *
     * @param userId 用户ID
     * @return 用户对象信息
     */
    SysUserVo selectUserById(Long userId);

    SysUserVo getProfile(Long userId);

    /**
     * 根据用户ID查询用户所属角色组
     *
     * @param userName 用户名
     * @return 结果
     */
    String selectUserRoleGroup(String userName);

    /**
     * 根据用户ID查询用户所属岗位组
     *
     * @param userName 用户名
     * @return 结果
     */
    String selectUserPostGroup(String userName);

    /**
     * 校验用户名称是否唯一
     *
     * @param user 用户信息
     * @return 结果
     */
    boolean checkUserNameUnique(SysUserBo user);

    /**
     * 校验手机号码是否唯一
     *
     * @param user 用户信息
     * @return 结果
     */
    boolean checkMobileUnique(SysUserBo user);

    /**
     * 校验email是否唯一
     *
     * @param user 用户信息
     * @return 结果
     */
    boolean checkEmailUnique(SysUserBo user);

    /**
     * 校验用户是否允许操作
     *
     * @param userId 用户ID
     */
    void checkUserAllowed(Long userId);

    /**
     * 校验用户是否有数据权限
     *
     * @param userId 用户id
     */
    void checkUserDataScope(Long userId);

    /**
     * 新增用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    int insertUser(SysUserBo user);

    /**
     * 注册用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    SysUser registerUser(SysUserBo user, String tenantId);

    /**
     * 修改用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    int updateUser(SysUserBo user);

    /**
     * 用户授权角色
     *
     * @param userId  用户ID
     * @param roleIds 角色组
     */
    void insertUserAuth(Long userId, Long[] roleIds);

    /**
     * 修改用户状态
     *
     * @param userId 用户ID
     * @param status 帐号状态
     * @return 结果
     */
    int updateUserStatus(Long userId, String status);

    /**
     * 修改用户基本信息
     *
     * @param user 用户信息
     * @return 结果
     */
    int updateUserProfile(SysUserBo user);

    /**
     * 修改用户头像
     *
     * @param userId 用户ID
     * @param avatar 头像地址
     * @return 结果
     */
    boolean updateUserAvatar(Long userId, String avatar);

    /**
     * 重置用户密码
     *
     * @param userId   用户ID
     * @param password 密码
     * @return 结果
     */
    int updatePassword(Long userId, String password);

    /**
     * 通过用户ID删除用户
     *
     * @param userId 用户ID
     * @return 结果
     */
    int delete(Long userId);

    /**
     * 批量删除用户信息
     *
     * @param userIds 需要删除的用户ID
     * @return 结果
     */
    int deleteByIds(Long[] userIds);

    SysUserMapper getBaseMapper();

}
