package com.tiandtech.mybatis.core.domain;

import cn.hutool.core.map.MapUtil;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.tiandtech.core.validate.EditGroup;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Entity基类
 */

@Data
public class BaseEntity implements Serializable {


    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id")
    @NotNull(message = "id不能为空", groups = {EditGroup.class})
    private Long id;

    // Vo层使用，后续考虑改到VO层去
    @TableField(exist = false)
    @Setter(AccessLevel.NONE)
    private String displayName;

    /**
     * 创建者
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createBy;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /**
     * 更新者
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateBy;

    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;


    /**
     * 搜索值
     */
    @JsonIgnore
    @TableField(exist = false)
    private String searchValue;

    /**
     * 创建部门
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createDept;

    /**
     * 请求参数
     */
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @TableField(exist = false)
    private Map<String, Object> params = new HashMap<>();

    /**
     * 额外的扩展属性
     */
    @TableField(exist = false)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String, Object> extraData = new HashMap<>();


    public void addExtraData(String key, Object value) {
        if (extraData == null) {
            extraData = new HashMap<>();
        }
        this.extraData.put(key, value);
    }

    public <T> T getExtraData(String key, Class<T> clazz) {
        return MapUtil.get(this.extraData, key, clazz);
    }

}
