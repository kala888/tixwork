package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.base.enums.ConfigDataScope;
import com.tiandtech.base.enums.ConfigType;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.mybatis.handler.ObjectLinkTypeHandler;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * 参数配置表 sys_config
 */

@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "sys_config", resultMap = "SysConfigResult")
public class SysConfig extends TenantEntity {

    @Override
    public String getDisplayName() {
        return title;
    }

    /**
     * 参数键名
     */
    private String key;

    /**
     * 参数名称
     */
    private String title;


    /**
     * 参数键值
     */
    private String value;

    /**
     * CONFIG("配置"), DICT("字典"), DICT_VALUE("字典值");
     */
    private ConfigType type;


    // 公开，私有，系统级
    private ConfigDataScope dataScope;

    /**
     * type是DICT_VALUE的时候，parent不为空
     */
    @TableField(typeHandler = ObjectLinkTypeHandler.class)
    private SysConfig parent;


    /**
     * 排序顺序，最小的在最上面
     */
    private Double sortOrder;

    private String status;

    /**
     * 备注
     */
    private String remark;

    /**
     * 是否是默认值
     */
    private String isDefault;

    @TableField(exist = false)
    private List<SysConfig> values;

    public boolean getDefault() {
        return UserConstants.YES.equals(this.isDefault);
    }

}
