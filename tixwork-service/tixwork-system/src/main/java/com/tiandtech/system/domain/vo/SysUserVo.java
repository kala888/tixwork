package com.tiandtech.system.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tiandtech.base.enums.GenderType;
import com.tiandtech.core.enums.UserType;
import com.tiandtech.system.domain.SysUser;
import io.github.linpeilie.annotations.AutoMapper;
import io.github.linpeilie.annotations.AutoMapping;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 用户信息视图对象 sys_user
 */
@Data
@AutoMapper(target = SysUser.class)
public class SysUserVo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public String getDisplayName() {
        return this.nickName;
    }

    /**
     * 用户ID
     */
    public Long getId() {
        return this.userId;
    }

    @AutoMapping(target = "id")
    private Long userId;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 部门ID
     */
    private Long deptId;

    /**
     * 用户账号
     */
    private String userName;

    /**
     * 用户昵称
     */
    private String nickName;

    /**
     * 用户类型（sys_user系统用户）
     */
    private UserType userType;

    /**
     * 用户邮箱
     */
//    @Sensitive(strategy = SensitiveStrategy.EMAIL)
    private String email;

    /**
     * 手机号码
     */
//    @Sensitive(strategy = SensitiveStrategy.PHONE)
    private String mobile;

    /**
     * 用户性别（0男 1女 2未知）
     */
    private GenderType gender;

    /**
     * 头像地址
     */
//    @Translation(type = TransConstant.OSS_ID_TO_URL)
    private String avatar;

    /**
     * 密码
     */
    @JsonIgnore
    @JsonProperty
    private String password;

    private String openId;

    private String unionId;

    /**
     * 帐号状态（0正常 1停用）
     */
    private String status;

    /**
     * 最后登录IP
     */
    private String loginIp;

    /**
     * 最后登录时间
     */
    private Date loginDate;

    /**
     * 备注
     */
    private String remark;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 部门对象
     */
    private SysDeptVo dept;

    /**
     * 角色对象
     */
    private List<SysRoleVo> roles;

    /**
     * 角色组
     */
    private List<Long> roleIds;

    /**
     * 岗位组
     */
    private List<Long> postIds;

    /**
     * 数据权限 当前角色ID
     */
    private Long roleId;


    /**
     * 用户所属角色组
     */
    private String roleGroup;

    /**
     * 用户所属岗位组
     */
    private String postGroup;

}
