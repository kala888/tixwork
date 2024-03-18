package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysLoginRecord;
import com.tiandtech.system.domain.vo.SysLoginRecordVo;
import org.springframework.stereotype.Repository;

/**
 * 系统访问日志情况信息 数据层
 */
@Repository
public interface SysLoginRecordMapper extends BaseMapperPlus<SysLoginRecord, SysLoginRecordVo> {

}
