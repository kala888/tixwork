package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 岗位表 sys_post
 */

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_post")
public class SysPost extends TenantEntity {

    /**
     * 岗位编码
     */
    private String postCode;

    /**
     * 岗位名称
     */
    private String postName;

    /**
     * 岗位排序
     */
    private Double sortOrder;

    /**
     * 状态（0正常 1停用）
     */
    private String status;

    /**
     * 备注
     */
    private String remark;

}
