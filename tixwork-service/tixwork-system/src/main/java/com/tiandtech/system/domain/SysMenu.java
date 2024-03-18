package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.base.enums.MenuType;
import com.tiandtech.base.enums.VisibleType;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.ArrayList;
import java.util.List;

/**
 * 菜单权限表 sys_menu
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_menu")
public class SysMenu extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return name;
    }

    private Long parentId;

    private String name;
    private String icon;
    private String path;
    private String redirect;
    private Double sortOrder;
    private String component; //暂时保留
    private String queryParam;
    private String isFrame; //是否为外链（0是 1否）
    private MenuType menuType;//FOLDER("目录"), MENU("菜单"), FUNC("功能");
    private VisibleType visible;
    private String status; //（0正常 1停用）
    private String perms;
    private String remark;


    @TableField(exist = false)
    private String parentName;

    @TableField(exist = false)
    private List<SysMenu> children = new ArrayList<>();

}
