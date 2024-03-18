package com.tiandtech.system.mapper;


import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysOssObject;
import com.tiandtech.system.domain.vo.SysOssObjectVo;
import org.springframework.stereotype.Repository;

/**
 * 文件上传 数据层
 */
@Repository
public interface SysOssObjectMapper extends BaseMapperPlus<SysOssObject, SysOssObjectVo> {

}
