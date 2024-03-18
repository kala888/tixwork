package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysNotice;
import com.tiandtech.system.domain.vo.SysNoticeVo;
import org.springframework.stereotype.Repository;

/**
 * 通知公告表 数据层
 */
@Repository
public interface SysNoticeMapper extends BaseMapperPlus<SysNotice, SysNoticeVo> {

}
