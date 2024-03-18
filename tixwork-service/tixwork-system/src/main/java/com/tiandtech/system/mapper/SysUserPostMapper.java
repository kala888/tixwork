package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysUserPost;
import org.springframework.stereotype.Repository;

/**
 * 用户与岗位关联表 数据层
 */
@Repository
public interface SysUserPostMapper extends BaseMapperPlus<SysUserPost, SysUserPost> {

}
