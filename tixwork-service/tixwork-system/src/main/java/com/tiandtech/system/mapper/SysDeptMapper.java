package com.tiandtech.system.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.tiandtech.mybatis.annotation.DataColumn;
import com.tiandtech.mybatis.annotation.DataPermission;
import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysDept;
import com.tiandtech.system.domain.vo.SysDeptVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 部门管理 数据层
 */
@Repository
public interface SysDeptMapper extends BaseMapperPlus<SysDept, SysDeptVo> {

    /**
     * 查询部门管理数据
     *
     * @param queryWrapper 查询条件
     * @return 部门信息集合
     */
    @DataPermission({
        @DataColumn(key = "deptName", value = "dept_id")
    })
    List<SysDeptVo> selectDeptList(@Param(Constants.WRAPPER) Wrapper<SysDept> queryWrapper);

    @DataPermission({
        @DataColumn(key = "deptName", value = "dept_id")
    })
    SysDeptVo selectDeptById(Long deptId);

    /**
     * 根据角色ID查询部门树信息
     *
     * @param roleId            角色ID
     * @param deptCheckStrictly 部门树选择项是否关联显示
     * @return 选中部门列表
     */
    List<Long> selectDeptListByRoleId(@Param("roleId") Long roleId, @Param("deptCheckStrictly") boolean deptCheckStrictly);

}
