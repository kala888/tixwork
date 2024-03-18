package com.tiandtech.system.domain.bo;

import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.system.domain.SysTenant;
import com.tiandtech.tenant.core.TenantEntity;
import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * 租户业务对象 sys_tenant
 */

@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = SysTenant.class, reverseConvertGenerate = false)
public class SysTenantBo extends TenantEntity {


    /**
     * 联系人
     */
    @NotBlank(message = "联系人不能为空", groups = {AddGroup.class, EditGroup.class})
    private String contactUserName;

    /**
     * 联系电话
     */
    @NotBlank(message = "联系电话不能为空", groups = {AddGroup.class, EditGroup.class})
    private String contactMobile;

    /**
     * 企业名称
     */
    @NotBlank(message = "企业名称不能为空", groups = {AddGroup.class, EditGroup.class})
    private String companyName;

    /**
     * 用户名（创建系统用户）
     */
    @NotBlank(message = "用户名不能为空", groups = {AddGroup.class})
    private String userName;

    /**
     * 密码（创建系统用户）
     */
    @NotBlank(message = "密码不能为空", groups = {AddGroup.class})
    private String password;

    /**
     * 统一社会信用代码
     */
    private String creditCode;

    /**
     * 地址
     */
    private String address;

    /**
     * 域名
     */
    private String domain;

    /**
     * 企业简介
     */
    private String intro;

    /**
     * 备注
     */
    private String remark;

    /**
     * 租户套餐编号
     */
    @NotNull(message = "租户套餐不能为空", groups = {AddGroup.class})
    private Long packageId;

    /**
     * 过期时间
     */
    private Date expireTime;

    /**
     * 用户数量（-1不限制）
     */
    private Long accountCount;

    /**
     * 租户状态（0正常 1停用）
     */
    private String status;


}
