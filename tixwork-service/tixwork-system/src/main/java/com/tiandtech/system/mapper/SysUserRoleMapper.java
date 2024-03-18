package com.tiandtech.system.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysUserRole;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.SysUserVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户与角色关联表 数据层
 */
@Repository
public interface SysUserRoleMapper extends BaseMapperPlus<SysUserRole, SysUserRole> {

    List<Long> selectUserIdsByRoleId(Long roleId);

    Page<SysUserVo> selectUserPageByRoleId(
        @Param("page") Page<SysUserBo> page,
        @Param(Constants.WRAPPER) Wrapper queryWrapper
    );

}
