package com.tiandtech.system.mapper;


import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysOssConfig;
import com.tiandtech.system.domain.vo.SysOssConfigVo;
import org.springframework.stereotype.Repository;

/**
 * 对象存储配置Mapper接口
 */
@Repository
public interface SysOssConfigMapper extends BaseMapperPlus<SysOssConfig, SysOssConfigVo> {

}
