package com.tiandtech.system.service.impl;

import cn.dev33.satoken.secure.BCrypt;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.RandomUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.CacheNames;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.constant.TenantConstants;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.*;
import com.tiandtech.system.domain.bo.SysTenantBo;
import com.tiandtech.system.domain.vo.SysTenantVo;
import com.tiandtech.system.mapper.*;
import com.tiandtech.system.service.SysTenantExtendService;
import com.tiandtech.system.service.SysTenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * 租户Service业务层处理
 */
@RequiredArgsConstructor
@Service
public class SysTenantServiceImpl implements SysTenantService {

    private final SysTenantExtendService extendService;
    private final SysTenantMapper baseMapper;
    private final SysTenantPackageMapper tenantPackageMapper;
    private final SysUserMapper userMapper;
    private final SysDeptMapper deptMapper;
    private final SysRoleMapper roleMapper;
    private final SysRoleMenuMapper roleMenuMapper;
    private final SysRoleDeptMapper roleDeptMapper;
    private final SysUserRoleMapper userRoleMapper;
    private final SysConfigMapper configMapper;

    /**
     * 查询租户
     */
    @Override
    public SysTenantVo getById(Long id) {
        return baseMapper.selectVoById(id);
    }

    /**
     * 基于租户ID查询租户
     */
    @Cacheable(cacheNames = CacheNames.SYS_TENANT, key = "#tenantId")
    @Override
    public SysTenantVo getByTenantId(String tenantId) {
        return baseMapper.selectVoOne(new LambdaQueryWrapper<SysTenant>().eq(SysTenant::getTenantId, tenantId));
    }

    /**
     * 查询租户列表
     */
    @Override
    public Page<SysTenantVo> listByPage(SysTenantBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<SysTenant> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    /**
     * 查询租户列表
     */
    @Override
    public List<SysTenantVo> list(SysTenantBo bo) {
        LambdaQueryWrapper<SysTenant> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<SysTenant> buildQueryWrapper(SysTenantBo bo) {
        LambdaQueryWrapper<SysTenant> lqw = Wrappers.lambdaQuery();
        lqw.eq(StringUtils.isNotBlank(bo.getTenantId()), SysTenant::getTenantId, bo.getTenantId());
        lqw.like(StringUtils.isNotBlank(bo.getContactUserName()), SysTenant::getContactUserName, bo.getContactUserName());
        lqw.eq(StringUtils.isNotBlank(bo.getContactMobile()), SysTenant::getContactMobile, bo.getContactMobile());
        lqw.like(StringUtils.isNotBlank(bo.getCompanyName()), SysTenant::getCompanyName, bo.getCompanyName());
        lqw.eq(StringUtils.isNotBlank(bo.getCreditCode()), SysTenant::getCreditCode, bo.getCreditCode());
        lqw.eq(StringUtils.isNotBlank(bo.getAddress()), SysTenant::getAddress, bo.getAddress());
        lqw.eq(StringUtils.isNotBlank(bo.getIntro()), SysTenant::getIntro, bo.getIntro());
        lqw.like(StringUtils.isNotBlank(bo.getDomain()), SysTenant::getDomain, bo.getDomain());
        lqw.eq(bo.getPackageId() != null, SysTenant::getPackageId, bo.getPackageId());
        lqw.eq(bo.getExpireTime() != null, SysTenant::getExpireTime, bo.getExpireTime());
        lqw.eq(bo.getAccountCount() != null, SysTenant::getAccountCount, bo.getAccountCount());
        lqw.eq(StringUtils.isNotBlank(bo.getStatus()), SysTenant::getStatus, bo.getStatus());
        return lqw;
    }

    /**
     * 新增租户
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean insert(SysTenantBo bo) {
        SysTenant add = MapstructUtils.convert(bo, SysTenant.class);

        //1. 获取所有租户编号, 以便获取一个tenantId
        List<String> tenantIds = baseMapper.selectObjs(new LambdaQueryWrapper<SysTenant>().select(SysTenant::getTenantId)).stream()
            .map(Convert::toStr).toList();
        String tenantId = generateTenantId(tenantIds);
        add.setTenantId(tenantId);
        boolean flag = baseMapper.insert(add) > 0;
        if (!flag) {
            throw new ServiceException("创建租户失败");
        }
        bo.setId(add.getId());

        //2. 根据套餐创建角色
        Long roleId = createTenantRole(tenantId, bo.getPackageId());

        //3. 创建部门: 公司名是部门名称
        SysDept dept = new SysDept();
        dept.setTenantId(tenantId);
        dept.setDeptName(bo.getCompanyName());
        dept.setLeader(bo.getUserName());
        dept.setParentId(Constants.TOP_PARENT_ID);
        dept.setAncestors(Constants.TOP_PARENT_ID.toString());
        deptMapper.insert(dept);
        Long deptId = dept.getId();

        //4. 角色和部门关联表
        SysRoleDept roleDept = new SysRoleDept();
        roleDept.setRoleId(roleId);
        roleDept.setDeptId(deptId);
        roleDeptMapper.insert(roleDept);

        //5. 创建企业管理员账户
        SysUser user = new SysUser();
        user.setTenantId(tenantId);
        user.setUserName(bo.getUserName());
        user.setNickName(bo.getUserName());
        user.setMobile(bo.getContactMobile());
        user.setNickName(bo.getContactUserName());
        user.setRemark(bo.getAddress());
        user.setPassword(BCrypt.hashpw(bo.getPassword()));
        user.setDeptId(deptId);
        userMapper.insert(user);

        //6. 用户和角色关联表
        SysUserRole userRole = new SysUserRole();
        userRole.setUserId(user.getId());
        userRole.setRoleId(roleId);
        userRoleMapper.insert(userRole);

        //7. 复制默认租户的配置
        String defaultTenantId = TenantConstants.DEFAULT_TENANT_ID;
        List<SysConfig> list = configMapper.selectList(new LambdaQueryWrapper<SysConfig>().eq(SysConfig::getTenantId, defaultTenantId));

        Map<Long, SysConfig> cache = new HashMap<>();
        list.forEach(it -> {
            cache.put(it.getId(), it);
            it.setId(null);
            it.setTenantId(tenantId);
        });
        List<SysConfig> configAndDict = list.stream().filter(it -> it.getParent() == null).toList();
        configMapper.insertBatch(configAndDict);
        List<SysConfig> values = list.stream().filter(it -> it.getParent() != null).toList();
        values.forEach(it -> {
            SysConfig parent = cache.get(it.getParent().getId());
            it.setParent(parent);
        });
        configMapper.insertBatch(values);

        extendService.postTenantCreate(add);

        return true;
    }

    /**
     * 生成租户id
     *
     * @param tenantIds 已有租户id列表
     * @return 租户id
     */
    private String generateTenantId(List<String> tenantIds) {
        // 随机生成6位
        String numbers = RandomUtil.randomNumbers(6);
        // 判断是否存在，如果存在则重新生成
        if (tenantIds.contains(numbers)) {
            generateTenantId(tenantIds);
        }
        return numbers;
    }

    /**
     * 根据租户菜单创建租户角色
     *
     * @param tenantId  租户编号
     * @param packageId 租户套餐id
     * @return 角色id
     */
    private Long createTenantRole(String tenantId, Long packageId) {
        // 获取租户套餐
        SysTenantPackage tenantPackage = tenantPackageMapper.selectById(packageId);
        if (ObjectUtil.isNull(tenantPackage)) {
            throw new ServiceException("套餐不存在");
        }
        // 获取套餐菜单id
        List<Long> menuIds = tenantPackage.getMenuIds();

        // 创建角色
        SysRole role = new SysRole();
        role.setTenantId(tenantId);
        role.setRoleName(TenantConstants.TENANT_ADMIN_ROLE_NAME);
        role.setRoleKey(TenantConstants.TENANT_ADMIN_ROLE_KEY);
        role.setSortOrder(10d);
        role.setStatus(TenantConstants.NORMAL);
        roleMapper.insert(role);
        Long roleId = role.getId();

        // 创建角色菜单
        List<SysRoleMenu> roleMenus = new ArrayList<>(menuIds.size());
        menuIds.forEach(menuId -> {
            SysRoleMenu roleMenu = new SysRoleMenu();
            roleMenu.setRoleId(roleId);
            roleMenu.setMenuId(menuId);
            roleMenus.add(roleMenu);
        });
        roleMenuMapper.insertBatch(roleMenus);

        return roleId;
    }

    /**
     * 修改租户
     */
    @CacheEvict(cacheNames = CacheNames.SYS_TENANT, key = "#bo.tenantId")
    @Override
    public Boolean update(SysTenantBo bo) {
        SysTenant tenant = MapstructUtils.convert(bo, SysTenant.class);
        tenant.setTenantId(null);
        tenant.setPackageId(null);
        return baseMapper.updateById(tenant) > 0;
    }

//    /**
//     * 修改租户状态
//     *
//     * @param bo 租户信息
//     * @return 结果
//     */
//    @CacheEvict(cacheNames = CacheNames.SYS_TENANT, key = "#bo.tenantId")
//    @Override
//    public int updateTenantStatus(SysTenantBo bo) {
//        SysTenant tenant = MapstructUtils.convert(bo, SysTenant.class);
//        return baseMapper.updateById(tenant);
//    }

    /**
     * 校验租户是否允许操作
     *
     * @param tenantId 租户ID
     */
    @Override
    public void checkTenantAllowed(String tenantId) {
        if (ObjectUtil.isNotNull(tenantId) && TenantConstants.DEFAULT_TENANT_ID.equals(tenantId)) {
            throw new ServiceException("不允许操作管理租户");
        }
    }

    /**
     * 批量删除租户
     */
    @CacheEvict(cacheNames = CacheNames.SYS_TENANT, allEntries = true)
    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if (isValid) {
            // 做一些业务上的校验,判断是否需要校验
            if (ids.contains(TenantConstants.SUPER_ADMIN_ID)) {
                throw new ServiceException("超管租户不能删除");
            }
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }

    /**
     * 校验企业名称是否唯一
     */
    @Override
    public boolean checkCompanyUnique(SysTenantBo bo) {
        boolean exist = baseMapper.exists(new LambdaQueryWrapper<SysTenant>().ne(SysTenant::getTenantId, bo.getTenantId())
            .and(w -> w.eq(SysTenant::getCompanyName, bo.getCompanyName()).or().eq(SysTenant::getCreditCode, bo.getCreditCode()))
            .ne(ObjectUtil.isNotNull(bo.getTenantId()), SysTenant::getTenantId, bo.getTenantId()));
        return !exist;
    }

    /**
     * 校验账号余额
     */
    @Override
    public boolean checkAccountBalance(String tenantId) {
        SysTenantVo tenant = SpringUtils.getAopProxy(this).getByTenantId(tenantId);
        // 如果余额为-1代表不限制
        if (tenant.getAccountCount() == -1) {
            return true;
        }
        Long userNumber = userMapper.selectCount(new LambdaQueryWrapper<>());
        // 如果余额大于0代表还有可用名额
        return tenant.getAccountCount() - userNumber > 0;
    }

//    /**
//     * 校验有效期
//     */
//    @Override
//    public boolean checkExpireTime(String tenantId) {
//        SysTenantVo tenant = SpringUtils.getAopProxy(this).getByTenantId(tenantId);
//        // 如果未设置过期时间代表不限制
//        if (ObjectUtil.isNull(tenant.getExpireTime())) {
//            return true;
//        }
//        // 如果当前时间在过期时间之前则通过
//        return new Date().before(tenant.getExpireTime());
//    }

    /**
     * 同步租户套餐
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean syncTenantPackage(String tenantId) {
        SysTenantVo tenant = baseMapper.selectVoOne(new LambdaQueryWrapper<SysTenant>().eq(SysTenant::getTenantId, tenantId));
        if (tenant == null) {
            throw new ServiceException("租户不存在");
        }
        Long packageId = tenant.getPackageId();
        SysTenantPackage tenantPackage = tenantPackageMapper.selectById(packageId);
        if (tenantPackage == null) {
            throw new ServiceException("套餐不存在");
        }
        List<SysRole> roles = roleMapper.selectList(new LambdaQueryWrapper<SysRole>().eq(SysRole::getTenantId, tenantId));
        List<Long> roleIds = new ArrayList<>(roles.size() - 1);
        List<Long> menuIds = tenantPackage.getMenuIds();
        roles.forEach(item -> {
            if (TenantConstants.TENANT_ADMIN_ROLE_KEY.equals(item.getRoleKey())) {
                List<SysRoleMenu> roleMenus = new ArrayList<>(menuIds.size());
                menuIds.forEach(menuId -> {
                    SysRoleMenu roleMenu = new SysRoleMenu();
                    roleMenu.setRoleId(item.getId());
                    roleMenu.setMenuId(menuId);
                    roleMenus.add(roleMenu);
                });
                roleMenuMapper.delete(new LambdaQueryWrapper<SysRoleMenu>().eq(SysRoleMenu::getRoleId, item.getId()));
                roleMenuMapper.insertBatch(roleMenus);
            } else {
                roleIds.add(item.getId());
            }
        });
        if (!roleIds.isEmpty()) {
            roleMenuMapper.delete(new LambdaQueryWrapper<SysRoleMenu>().in(SysRoleMenu::getRoleId, roleIds)
                .notIn(!menuIds.isEmpty(), SysRoleMenu::getMenuId, menuIds));
        }
        return true;
    }
}
