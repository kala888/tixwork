package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysLoginRecordBo;
import com.tiandtech.system.domain.vo.SysLoginRecordVo;

import java.util.List;

/**
 * 系统访问日志情况信息 服务层
 */
public interface SysLoginRecordService {


    Page<SysLoginRecordVo> listByPage(SysLoginRecordBo loginRecord, PageQuery pageQuery);

    /**
     * 新增系统登录日志
     *
     * @param bo 访问日志对象
     */
    void insert(SysLoginRecordBo bo);

    /**
     * 查询系统登录日志集合
     *
     * @param loginRecord 访问日志对象
     * @return 登录记录集合
     */
    List<SysLoginRecordVo> list(SysLoginRecordBo loginRecord);

    /**
     * 批量删除系统登录日志
     *
     * @param infoIds 需要删除的登录日志ID
     * @return 结果
     */
    int deleteByIds(Long[] infoIds);

    /**
     * 清空系统登录日志
     */
    void clean();
}
