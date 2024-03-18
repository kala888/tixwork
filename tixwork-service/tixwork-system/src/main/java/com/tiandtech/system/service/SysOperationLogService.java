package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysOperationLogBo;
import com.tiandtech.system.domain.vo.SysOperationLogVo;

import java.util.List;

/**
 * 操作日志 服务层
 */
public interface SysOperationLogService {

    Page<SysOperationLogVo> listByPage(SysOperationLogBo log, PageQuery pageQuery);

    /**
     * 新增操作日志
     *
     * @param bo 操作日志对象
     */
    void insert(SysOperationLogBo bo);

    /**
     * 查询系统操作日志集合
     */
    List<SysOperationLogVo> list(SysOperationLogBo bo);

    /**
     * 批量删除系统操作日志
     */
    int deleteByIds(Long[] ids);

    /**
     * 查询操作日志详细
     */
    SysOperationLogVo getById(Long id);

    /**
     * 清空操作日志
     */
    void clean();
}
