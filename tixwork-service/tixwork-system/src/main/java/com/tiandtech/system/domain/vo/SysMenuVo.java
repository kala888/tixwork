package com.tiandtech.system.domain.vo;

import com.tiandtech.base.enums.MenuType;
import com.tiandtech.base.enums.VisibleType;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysMenu;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.ArrayList;
import java.util.List;


/**
 * 菜单权限视图对象 sys_menu
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AutoMapper(target = SysMenu.class)
public class SysMenuVo extends BaseEntity {

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
    private String component;
    private String queryParam;
    private String isFrame;
    private MenuType menuType;
    private VisibleType visible;
    private String status;
    private String perms;

    /**
     * 创建部门
     */
    private Long createDept;

    /**
     * 备注
     */
    private String remark;

    /**
     * 子菜单
     */
    private List<SysMenuVo> children = new ArrayList<>();

}
