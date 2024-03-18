package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tiandtech.base.enums.GenderType;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.enums.UserType;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.util.Date;

/**
 * 用户对象 sys_user
 */

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName(value = "sys_user")
public class SysUser extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    public String getDisplayName() {
        return this.nickName;
    }

    /**
     * 用户ID
     */
    @TableId(value = "user_id")
    private Long id;

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
    @JsonIgnore
    private String email;

    /**
     * 手机号码
     */
    @JsonIgnore
    private String mobile;

    /**
     * 用户性别
     */
    private GenderType gender;

    /**
     * 用户头像
     */
    private String avatar;

    private String openId;

    private String unionId;

    /**
     * 密码
     */
    @TableField(
        insertStrategy = FieldStrategy.NOT_EMPTY,
        updateStrategy = FieldStrategy.NOT_EMPTY,
        whereStrategy = FieldStrategy.NOT_EMPTY
    )
    @JsonIgnore
    private String password;

    /**
     * 帐号状态（0正常 1停用）
     */
    private String status;

    /**
     * 删除标志（0代表存在 2代表删除）
     */
    @TableLogic
    private String delFlag;

    /**
     * 最后登录IP
     */
    @JsonIgnore
    private String loginIp;

    /**
     * 最后登录时间
     */
    @JsonIgnore
    private Date loginDate;

    /**
     * 备注
     */
    @JsonIgnore
    private String remark;


    public SysUser(Long userId) {
        this.id = userId;
    }

    public boolean isSuperAdmin() {
        return UserConstants.SUPER_ADMIN_ID.equals(this.id);
    }

}
