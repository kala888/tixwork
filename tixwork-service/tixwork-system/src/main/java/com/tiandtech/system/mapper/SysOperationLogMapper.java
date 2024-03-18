package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysOperationLog;
import com.tiandtech.system.domain.vo.SysOperationLogVo;
import org.springframework.stereotype.Repository;

/**
 * 操作日志 数据层
 */
@Repository
public interface SysOperationLogMapper extends BaseMapperPlus<SysOperationLog, SysOperationLogVo> {

}
