package com.tiandtech.system.service;

import com.tiandtech.base.domain.dto.TreeVo;
import com.tiandtech.system.domain.bo.SysMenuBo;
import com.tiandtech.system.domain.vo.RouterVo;
import com.tiandtech.system.domain.vo.SysMenuVo;

import java.util.List;
import java.util.Set;

/**
 * 菜单 业务层
 */
public interface SysMenuService {

    /**
     * 根据用户查询系统菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenuVo> list(Long userId);

    /**
     * 根据用户查询系统菜单列表
     *
     * @param menu   菜单信息
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenuVo> list(SysMenuBo menu, Long userId);

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    Set<String> selectMenuPermsByUserId(Long userId);

//    /**
//     * 根据角色ID查询权限
//     *
//     * @param roleId 角色ID
//     * @return 权限列表
//     */
//    Set<String> selectMenuPermsByRoleId(Long roleId);
//
//    /**
//     * 根据用户ID查询菜单树信息
//     *
//     * @param userId 用户ID
//     * @return 菜单列表
//     */
//    List<SysMenu> selectMenuTreeByUserId(Long userId);

    /**
     * 根据角色ID查询菜单树信息
     *
     * @param roleId 角色ID
     * @return 选中菜单列表
     */
    List<Long> listByRoleId(Long roleId);

//    /**
//     * 根据租户套餐ID查询菜单树信息
//     *
//     * @param packageId 租户套餐ID
//     * @return 选中菜单列表
//     */
//    List<Long> selectMenuListByPackageId(Long packageId);

//    /**
//     * 构建前端路由所需要的菜单
//     *
//     * @param menus 菜单列表
//     * @return 路由列表
//     */
//    List<RouterVo> buildMenus(List<SysMenu> menus);

//    /**
//     * 构建前端所需要下拉树结构
//     *
//     * @param menus 菜单列表
//     * @return 下拉树结构列表
//     */
//    List<Tree<Long>> buildMenuTreeSelect(List<SysMenuVo> menus);

    /**
     * 根据菜单ID查询信息
     *
     * @param menuId 菜单ID
     * @return 菜单信息
     */
    SysMenuVo getById(Long menuId);

    /**
     * 是否存在菜单子节点
     *
     * @param menuId 菜单ID
     * @return 结果 true 存在 false 不存在
     */
    boolean hasChildByMenuId(Long menuId);

    /**
     * 查询菜单是否存在角色
     *
     * @param menuId 菜单ID
     * @return 结果 true 存在 false 不存在
     */
    boolean checkMenuExistRole(Long menuId);

    /**
     * 新增保存菜单信息
     *
     * @param bo 菜单信息
     * @return 结果
     */
    int insert(SysMenuBo bo);

    /**
     * 修改保存菜单信息
     *
     * @param bo 菜单信息
     * @return 结果
     */
    int update(SysMenuBo bo);

    /**
     * 删除菜单管理信息
     *
     * @param menuId 菜单ID
     * @return 结果
     */
    int deleteByIds(Long menuId);

    /**
     * 校验菜单名称是否唯一
     *
     * @param menu 菜单信息
     * @return 结果
     */
    boolean checkMenuNameUnique(SysMenuBo menu);

    List<RouterVo> getRoutesByUserId(Long userId);

    List<TreeVo<SysMenuVo>> selectTree(SysMenuBo menu, Long userId);
}
