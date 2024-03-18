package com.tiandtech.system.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.tree.Tree;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tiandtech.base.domain.dto.TreeVo;
import com.tiandtech.base.enums.MenuType;
import com.tiandtech.base.enums.VisibleType;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StreamUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.TreeBuildUtils;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysMenu;
import com.tiandtech.system.domain.SysRole;
import com.tiandtech.system.domain.SysRoleMenu;
import com.tiandtech.system.domain.bo.SysMenuBo;
import com.tiandtech.system.domain.vo.RouterVo;
import com.tiandtech.system.domain.vo.SysMenuVo;
import com.tiandtech.system.mapper.SysMenuMapper;
import com.tiandtech.system.mapper.SysRoleMapper;
import com.tiandtech.system.mapper.SysRoleMenuMapper;
import com.tiandtech.system.mapper.SysTenantPackageMapper;
import com.tiandtech.system.service.SysMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 菜单 业务层处理
 */
@RequiredArgsConstructor
@Service
public class SysMenuServiceImpl implements SysMenuService {

    private final SysMenuMapper baseMapper;
    private final SysRoleMapper roleMapper;
    private final SysRoleMenuMapper roleMenuMapper;
    private final SysTenantPackageMapper tenantPackageMapper;

    /**
     * 根据用户查询系统菜单列表
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    @Override
    public List<SysMenuVo> list(Long userId) {
        return list(new SysMenuBo(), userId);
    }

    /**
     * 查询系统菜单列表
     *
     * @param menu 菜单信息
     * @return 菜单列表
     */
    @Override
    public List<SysMenuVo> list(SysMenuBo menu, Long userId) {
        List<SysMenuVo> menuList;
        // 管理员显示所有菜单信息
        if (LoginHelper.isSuperAdmin(userId)) {
            menuList = baseMapper.selectVoList(new LambdaQueryWrapper<SysMenu>()
                .like(StringUtils.isNotBlank(menu.getName()), SysMenu::getName, menu.getName())
                .eq(menu.getVisible() != null, SysMenu::getVisible, menu.getVisible())
                .eq(StringUtils.isNotBlank(menu.getStatus()), SysMenu::getStatus, menu.getStatus())
                .orderByAsc(SysMenu::getParentId)
                .orderByAsc(SysMenu::getSortOrder));
        } else {
            QueryWrapper<SysMenu> wrapper = Wrappers.query();
            wrapper.eq("sur.user_id", userId)
                .like(StringUtils.isNotBlank(menu.getName()), "m.name", menu.getName())
                .eq(menu.getVisible() != null, "m.visible", menu.getVisible())
                .eq(StringUtils.isNotBlank(menu.getStatus()), "m.status", menu.getStatus())
                .orderByAsc("m.parent_id")
                .orderByAsc("m.sort_order");
            List<SysMenu> list = baseMapper.selectMenuListByUserId(wrapper);
            menuList = MapstructUtils.convert(list, SysMenuVo.class);
        }
        return menuList;
    }

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    @Override
    public Set<String> selectMenuPermsByUserId(Long userId) {
        List<String> perms = baseMapper.selectMenuPermsByUserId(userId);
        Set<String> permsSet = new HashSet<>();
        for (String perm : perms) {
            if (StringUtils.isNotEmpty(perm)) {
                permsSet.addAll(StringUtils.splitList(perm.trim()));
            }
        }
        return permsSet;
    }

//    /**
//     * 根据角色ID查询权限
//     *
//     * @param roleId 角色ID
//     * @return 权限列表
//     */
//    @Override
//    public Set<String> selectMenuPermsByRoleId(Long roleId) {
//        List<String> perms = baseMapper.selectMenuPermsByRoleId(roleId);
//        Set<String> permsSet = new HashSet<>();
//        for (String perm : perms) {
//            if (StringUtils.isNotEmpty(perm)) {
//                permsSet.addAll(StringUtils.splitList(perm.trim()));
//            }
//        }
//        return permsSet;
//    }

//    /**
//     * 根据用户ID查询菜单
//     *
//     * @param userId 用户名称
//     * @return 菜单列表
//     */
//    @Override
//    public List<SysMenu> selectMenuTreeByUserId(Long userId) {
//        List<SysMenu> menus;
//        if (LoginHelper.isSuperAdmin(userId)) {
//            menus = baseMapper.selectMenuTreeAll();
//        } else {
//            menus = baseMapper.selectMenuTreeByUserId(userId);
//        }
//        return getChildPerms(menus, 0);
//    }

    /**
     * 根据角色ID查询菜单树信息
     *
     * @param roleId 角色ID
     * @return 选中菜单列表
     */
    @Override
    public List<Long> listByRoleId(Long roleId) {
        SysRole role = roleMapper.selectById(roleId);
        return baseMapper.selectMenuListByRoleId(roleId, role.getMenuCheckStrictly());
    }

//    /**
//     * 根据租户套餐ID查询菜单树信息
//     *
//     * @param packageId 租户套餐ID
//     * @return 选中菜单列表
//     */
//    @Override
//    public List<Long> selectMenuListByPackageId(Long packageId) {
//        SysTenantPackage tenantPackage = tenantPackageMapper.selectById(packageId);
//        List<Long> menuIds = tenantPackage.getMenuIds();
//        if (CollUtil.isEmpty(menuIds)) {
//            return List.of();
//        }
//        List<Long> parentIds = null;
//        if (tenantPackage.getMenuCheckStrictly()) {
//            parentIds = baseMapper.selectObjs(new LambdaQueryWrapper<SysMenu>()
//                .select(SysMenu::getParentId)
//                .in(SysMenu::getId, menuIds), Convert::toLong);
//        }
//        return baseMapper.selectObjs(new LambdaQueryWrapper<SysMenu>()
//            .in(SysMenu::getId, menuIds)
//            .notIn(CollUtil.isNotEmpty(parentIds), SysMenu::getId, parentIds), Convert::toLong);
//    }

//    /**
//     * 构建前端路由所需要的菜单
//     *
//     * @param menus 菜单列表
//     * @return 路由列表
//     */
//    @Override
//    public List<RouterVo> buildMenus(List<SysMenu> menus) {
//        List<RouterVo> routers = new LinkedList<>();
//        for (SysMenu menu : menus) {
//            RouterVo router = BeanUtil.copyProperties(menu, RouterVo.class);
//            router.setHideInMenu(VisibleType.HIDE == menu.getVisible());
//            router.setName(menu.getRouteName());
//            router.setPath(menu.getRouterPath());
//            router.setComponent(menu.getComponentInfo());
//            router.setQuery(menu.getQueryParam());
//            router.setMeta(new MetaVo(menu.getMenuName(), menu.getIcon(), StringUtils.equals("1", menu.getIsCache()), menu.getPath()));
//            List<SysMenu> cMenus = menu.getChildren();
//            if (CollUtil.isNotEmpty(cMenus) && MenuType.FOLDER == menu.getMenuType()) {
//                router.setAlwaysShow(true);
//                router.setRedirect("noRedirect");
//                router.setChildren(buildMenus(cMenus));
//            } else if (menu.isMenuFrame()) {
//                router.setMeta(null);
//                List<RouterVo> childrenList = new ArrayList<>();
//                RouterVo children = new RouterVo();
//                children.setPath(menu.getPath());
//                children.setComponent(menu.getComponentInfo());
//                children.setName(StringUtils.capitalize(menu.getPath()));
//                children.setMeta(
//                    new MetaVo(menu.getMenuName(), menu.getIcon(), StringUtils.equals("1", menu.getIsCache()), menu.getPath()));
//                children.setQuery(menu.getQueryParam());
//                childrenList.add(children);
//                router.setChildren(childrenList);
//            } else if (menu.getParentId().intValue() == 0 && menu.isInnerLink()) {
//                router.setMeta(new MetaVo(menu.getMenuName(), menu.getIcon()));
//                router.setPath("/");
//                List<RouterVo> childrenList = new ArrayList<>();
//                RouterVo children = new RouterVo();
//                String routerPath = SysMenu.innerLinkReplaceEach(menu.getPath());
//                children.setPath(routerPath);
//                children.setComponent(UserConstants.INNER_LINK);
//                children.setName(StringUtils.capitalize(routerPath));
//                children.setMeta(new MetaVo(menu.getMenuName(), menu.getIcon(), menu.getPath()));
//                childrenList.add(children);
//                router.setChildren(childrenList);
//            }
//            routers.add(router);
//        }
//        return routers;
//    }

//    /**
//     * 构建前端所需要下拉树结构
//     *
//     * @param menus 菜单列表
//     * @return 下拉树结构列表
//     */
//    @Override
//    public List<Tree<Long>> buildMenuTreeSelect(List<SysMenuVo> menus) {
//        if (CollUtil.isEmpty(menus)) {
//            return CollUtil.newArrayList();
//        }
//        return TreeBuildUtils.build(menus, (menu, tree) -> {
//            BeanUtil.copyProperties(menu, tree);
//            tree.setId(menu.getId())
//                .setParentId(menu.getParentId())
//                .setName(menu.getName())
//                .setWeight(menu.getSortOrder());
//        });
//    }

    /**
     * 根据菜单ID查询信息
     *
     * @param menuId 菜单ID
     * @return 菜单信息
     */
    @Override
    public SysMenuVo getById(Long menuId) {
        return baseMapper.selectVoById(menuId);
    }

    /**
     * 是否存在菜单子节点
     *
     * @param menuId 菜单ID
     * @return 结果
     */
    @Override
    public boolean hasChildByMenuId(Long menuId) {
        return baseMapper.exists(new LambdaQueryWrapper<SysMenu>().eq(SysMenu::getParentId, menuId));
    }

    /**
     * 查询菜单使用数量
     *
     * @param menuId 菜单ID
     * @return 结果
     */
    @Override
    public boolean checkMenuExistRole(Long menuId) {
        return roleMenuMapper.exists(new LambdaQueryWrapper<SysRoleMenu>().eq(SysRoleMenu::getMenuId, menuId));
    }

    /**
     * 新增保存菜单信息
     *
     * @param bo 菜单信息
     * @return 结果
     */
    @Override
    public int insert(SysMenuBo bo) {
        SysMenu menu = MapstructUtils.convert(bo, SysMenu.class);
        return baseMapper.insert(menu);
    }

    /**
     * 修改保存菜单信息
     *
     * @param bo 菜单信息
     * @return 结果
     */
    @Override
    public int update(SysMenuBo bo) {
        SysMenu menu = MapstructUtils.convert(bo, SysMenu.class);
        return baseMapper.updateById(menu);
    }

    /**
     * 删除菜单管理信息
     *
     * @param menuId 菜单ID
     * @return 结果
     */
    @Override
    public int deleteByIds(Long menuId) {
        return baseMapper.deleteById(menuId);
    }

    /**
     * 校验菜单名称是否唯一
     *
     * @param menu 菜单信息
     * @return 结果
     */
    @Override
    public boolean checkMenuNameUnique(SysMenuBo menu) {
        boolean exist = baseMapper.exists(new LambdaQueryWrapper<SysMenu>()
            .eq(SysMenu::getName, menu.getName())
            .eq(SysMenu::getParentId, menu.getParentId())
            .ne(ObjectUtil.isNotNull(menu.getId()), SysMenu::getId, menu.getId()));
        return !exist;
    }

    /**
     * 根据父节点的ID获取所有子节点
     *
     * @param list     分类表
     * @param parentId 传入的父节点ID
     * @return String
     */
    private List<SysMenu> getChildPerms(List<SysMenu> list, int parentId) {
        List<SysMenu> returnList = new ArrayList<>();
        for (SysMenu t : list) {
            // 一、根据传入的某个父节点ID,遍历该父节点的所有子节点
            if (t.getParentId() == parentId) {
                recursionFn(list, t);
                returnList.add(t);
            }
        }
        return returnList;
    }

    /**
     * 递归列表
     */
    private void recursionFn(List<SysMenu> list, SysMenu t) {
        // 得到子节点列表
        List<SysMenu> childList = StreamUtils.filter(list, n -> n.getParentId().equals(t.getId()));
        t.setChildren(childList);
        for (SysMenu tChild : childList) {
            // 判断是否有子节点
            if (list.stream().anyMatch(n -> n.getParentId().equals(tChild.getId()))) {
                recursionFn(list, tChild);
            }
        }
    }


    @Override
    public List<RouterVo> getRoutesByUserId(Long userId) {
        List<SysMenu> menus = null;
        if (LoginHelper.isSuperAdmin(userId)) {
            menus = baseMapper.selectMenuTreeAll();
        } else {
            menus = baseMapper.selectMenuTreeByUserId(userId);
        }
        List<SysMenu> list = toTree(menus);
        return getRoutes(list);
    }

    private List<SysMenu> toTree(List<SysMenu> menus) {
        if (CollUtil.isEmpty(menus)) {
            return CollUtil.newArrayList();
        }

        List<Tree<Object>> list = TreeBuildUtils.build(menus, (menu, tree) -> {
            tree.setId(menu.getId())
                .setParentId(menu.getParentId())
                .setName(menu.getName())
                .setWeight(menu.getSortOrder());
            BeanUtil.copyProperties(menu, tree);
        });
        return list.stream().map(it -> BeanUtil.toBean(it, SysMenu.class)).toList();
    }

    private List<RouterVo> getRoutes(List<SysMenu> menus) {
        List<RouterVo> routers = new LinkedList<RouterVo>();
//        CollectionUtil.sort(
//            menus,
//            Comparator.comparing(SysMenu::getSortOrder, Comparator.nullsFirst(Double::compareTo))
//        );
        for (SysMenu menu : menus) {
            RouterVo router = BeanUtil.copyProperties(menu, RouterVo.class);
            router.setHideInMenu(VisibleType.HIDE == menu.getVisible());

            List<SysMenu> subMenuList = menu.getChildren();
            if (!subMenuList.isEmpty() && MenuType.FOLDER == menu.getMenuType()) {
                //目录型父节点
                List<RouterVo> subRoutes = getRoutes(subMenuList);
                router.setChildren(subRoutes);
            }

            routers.add(router);
        }
        return routers;
    }

    @Override
    public List<TreeVo<SysMenuVo>> selectTree(SysMenuBo bo, Long userId) {
        List<SysMenuVo> list = this.list(bo, userId);
        List<TreeVo<SysMenuVo>> data = TreeBuildUtils.toTreeVo(list, (menu, tree) -> {
            tree.setId(menu.getId());
            tree.setParentId(menu.getParentId());
            tree.setName(menu.getName());
            tree.setWeight(menu.getSortOrder());
            tree.putExtra("extraData", menu);
            tree.putExtra("icon", menu.getIcon());
        });
        return data;
    }

}
