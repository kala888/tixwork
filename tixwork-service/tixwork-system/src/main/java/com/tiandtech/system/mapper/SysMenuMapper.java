package com.tiandtech.system.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.tiandtech.base.enums.MenuType;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysMenu;
import com.tiandtech.system.domain.vo.SysMenuVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 菜单表 数据层
 */
@Repository
public interface SysMenuMapper extends BaseMapperPlus<SysMenu, SysMenuVo> {

    /**
     * 根据用户所有权限
     *
     * @return 权限列表
     */
    List<String> selectMenuPerms();

    /**
     * 根据用户查询系统菜单列表
     *
     * @param queryWrapper 查询条件
     * @return 菜单列表
     */
    List<SysMenu> selectMenuListByUserId(@Param(Constants.WRAPPER) Wrapper<SysMenu> queryWrapper);

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    List<String> selectMenuPermsByUserId(Long userId);

    /**
     * 根据角色ID查询权限
     *
     * @param roleId 角色ID
     * @return 权限列表
     */
    List<String> selectMenuPermsByRoleId(Long roleId);

    /**
     * 根据用户ID查询菜单
     *
     * @return 菜单列表
     */
    default List<SysMenu> selectMenuTreeAll() {
        LambdaQueryWrapper<SysMenu> lqw = new LambdaQueryWrapper<SysMenu>()
            .in(SysMenu::getMenuType, MenuType.FOLDER, MenuType.MENU)
            .eq(SysMenu::getStatus, UserConstants.MENU_NORMAL)
            .orderByAsc(SysMenu::getParentId)
            .orderByAsc(SysMenu::getSortOrder);
        return this.selectList(lqw);
    }

    /**
     * 根据用户ID查询菜单
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    List<SysMenu> selectMenuTreeByUserId(Long userId);

    /**
     * 根据角色ID查询菜单树信息
     *
     * @param roleId            角色ID
     * @param menuCheckStrictly 菜单树选择项是否关联显示
     * @return 选中菜单列表
     */
    List<Long> selectMenuListByRoleId(@Param("roleId") Long roleId, @Param("menuCheckStrictly") boolean menuCheckStrictly);

}
