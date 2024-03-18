package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysPost;
import com.tiandtech.system.domain.vo.SysPostVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 岗位信息 数据层
 */
@Repository
public interface SysPostMapper extends BaseMapperPlus<SysPost, SysPostVo> {

    /**
     * 根据用户ID获取岗位选择框列表
     *
     * @param userId 用户ID
     * @return 选中岗位ID列表
     */
    List<Long> selectPostListByUserId(Long userId);

    /**
     * 查询用户所属岗位组
     *
     * @param userName 用户名
     * @return 结果
     */
    List<SysPostVo> selectPostsByUserName(String userName);

}
