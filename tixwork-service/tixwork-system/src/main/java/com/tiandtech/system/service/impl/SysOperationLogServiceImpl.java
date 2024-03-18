package com.tiandtech.system.service.impl;

import cn.hutool.core.util.ArrayUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.ip.AddressUtils;
import com.tiandtech.log.event.OperationEvent;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysOperationLog;
import com.tiandtech.system.domain.bo.SysOperationLogBo;
import com.tiandtech.system.domain.vo.SysOperationLogVo;
import com.tiandtech.system.mapper.SysOperationLogMapper;
import com.tiandtech.system.service.SysOperationLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 操作日志 服务层处理
 */
@RequiredArgsConstructor
@Service
public class SysOperationLogServiceImpl implements SysOperationLogService {

    private final SysOperationLogMapper baseMapper;

    /**
     * 操作日志记录
     */
    @Async
    @EventListener
    public void record(OperationEvent event) {
        SysOperationLogBo bo = MapstructUtils.convert(event, SysOperationLogBo.class);
        // 远程查询操作地点
        bo.setLocation(AddressUtils.getRealAddressByIP(bo.getIp()));
        insert(bo);
    }

    @Override
    public Page<SysOperationLogVo> listByPage(SysOperationLogBo bo, PageQuery pageQuery) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<SysOperationLog> lqw = new LambdaQueryWrapper<SysOperationLog>()
            .like(StringUtils.isNotBlank(bo.getTitle()), SysOperationLog::getTitle, bo.getTitle())
            .eq(bo.getBusinessType() != null && bo.getBusinessType() > 0,
                SysOperationLog::getBusinessType, bo.getBusinessType())
            .func(f -> {
                if (ArrayUtil.isNotEmpty(bo.getBusinessTypes())) {
                    f.in(SysOperationLog::getBusinessType, Arrays.asList(bo.getBusinessTypes()));
                }
            })
            .eq(bo.getStatus() != null,
                SysOperationLog::getStatus, bo.getStatus())
            .like(StringUtils.isNotBlank(bo.getUserName()), SysOperationLog::getUserName, bo.getUserName())
            .between(params.get("beginTime") != null && params.get("endTime") != null,
                SysOperationLog::getCreateTime, params.get("beginTime"), params.get("endTime"));
        if (StringUtils.isBlank(pageQuery.getOrderBy())) {
            pageQuery.setOrderBy("id");
            pageQuery.setIsAsc("desc");
        }
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    /**
     * 新增操作日志
     *
     * @param bo 操作日志对象
     */
    @Override
    public void insert(SysOperationLogBo bo) {
        SysOperationLog log = MapstructUtils.convert(bo, SysOperationLog.class);
        log.setCreateTime(new Date());
        baseMapper.insert(log);
    }

    /**
     * 查询系统操作日志集合
     */
    @Override
    public List<SysOperationLogVo> list(SysOperationLogBo bo) {
        Map<String, Object> params = bo.getParams();
        return baseMapper.selectVoList(new LambdaQueryWrapper<SysOperationLog>()
            .like(StringUtils.isNotBlank(bo.getTitle()), SysOperationLog::getTitle, bo.getTitle())
            .eq(bo.getBusinessType() != null && bo.getBusinessType() > 0,
                SysOperationLog::getBusinessType, bo.getBusinessType())
            .func(f -> {
                if (ArrayUtil.isNotEmpty(bo.getBusinessTypes())) {
                    f.in(SysOperationLog::getBusinessType, Arrays.asList(bo.getBusinessTypes()));
                }
            })
            .eq(bo.getStatus() != null && bo.getStatus() > 0,
                SysOperationLog::getStatus, bo.getStatus())
            .like(StringUtils.isNotBlank(bo.getUserName()), SysOperationLog::getUserName, bo.getUserName())
            .between(params.get("beginTime") != null && params.get("endTime") != null,
                SysOperationLog::getCreateTime, params.get("beginTime"), params.get("endTime"))
            .orderByDesc(SysOperationLog::getId));
    }

    /**
     * 批量删除系统操作日志
     */
    @Override
    public int deleteByIds(Long[] ids) {
        return baseMapper.deleteBatchIds(Arrays.asList(ids));
    }

    /**
     * 查询操作日志详细
     */
    @Override
    public SysOperationLogVo getById(Long id) {
        return baseMapper.selectVoById(id);
    }

    /**
     * 清空操作日志
     */
    @Override
    public void clean() {
        baseMapper.delete(new LambdaQueryWrapper<>());
    }
}
