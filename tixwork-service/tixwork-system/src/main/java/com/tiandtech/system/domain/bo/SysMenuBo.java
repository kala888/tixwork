package com.tiandtech.system.domain.bo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tiandtech.base.enums.MenuType;
import com.tiandtech.base.enums.VisibleType;
import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysMenu;
import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 菜单权限业务对象 sys_menu
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = SysMenu.class, reverseConvertGenerate = false)
public class SysMenuBo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return name;
    }

    private Long parentId;

    /**
     * 菜单名称
     */
    @NotBlank(message = "菜单名称不能为空", groups = {AddGroup.class, EditGroup.class})
    @Size(min = 0, max = 50, message = "菜单名称长度不能超过{max}个字符")
    private String name;

    /**
     * 菜单图标
     */
    private String icon;

    /**
     * 路由地址
     */
    @Size(min = 0, max = 200, message = "路由地址不能超过{max}个字符")
    private String path;


    /**
     * 跳转路径
     */
    @Size(min = 0, max = 200, message = "跳转路径不能超过{max}个字符")
    private String redirect;

    /**
     * 显示顺序
     */
    @NotNull(message = "显示顺序不能为空", groups = {AddGroup.class, EditGroup.class})
    private Double sortOrder;


    /**
     * 组件路径
     */
    @Size(min = 0, max = 200, message = "组件路径不能超过{max}个字符")
    private String component;

    /**
     * 路由参数
     */
    private String queryParam;

    /**
     * 是否为外链（0是 1否）
     */
    private String isFrame;


    /**
     * 菜单类型（M目录 C菜单 F按钮）
     */
    @NotNull(message = "菜单类型不能为空", groups = {AddGroup.class, EditGroup.class})
    private MenuType menuType;

    @NotNull(message = "菜单类型不能为空")
    private VisibleType visible;

    /**
     * 菜单状态（0正常 1停用）
     */
    private String status;

    /**
     * 权限标vis识
     */
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Size(min = 0, max = 100, message = "权限标识长度不能超过{max}个字符")
    private String perms;

    /**
     * 备注
     */
    private String remark;

}
