package com.tiandtech.system.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysPost;
import com.tiandtech.system.domain.SysUserPost;
import com.tiandtech.system.domain.bo.SysPostBo;
import com.tiandtech.system.domain.vo.SysPostVo;
import com.tiandtech.system.mapper.SysPostMapper;
import com.tiandtech.system.mapper.SysUserPostMapper;
import com.tiandtech.system.service.SysPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * 岗位信息 服务层处理
 */
@RequiredArgsConstructor
@Service
public class SysPostServiceImpl implements SysPostService {

    private final SysPostMapper baseMapper;
    private final SysUserPostMapper userPostMapper;

    @Override
    public Page<SysPostVo> listByPage(SysPostBo post, PageQuery pageQuery) {
        LambdaQueryWrapper<SysPost> lqw = buildQueryWrapper(post);
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    /**
     * 查询岗位信息集合
     *
     * @param post 岗位信息
     * @return 岗位信息集合
     */
    @Override
    public List<SysPostVo> list(SysPostBo post) {
        LambdaQueryWrapper<SysPost> lqw = buildQueryWrapper(post);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<SysPost> buildQueryWrapper(SysPostBo bo) {
        LambdaQueryWrapper<SysPost> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getPostCode()), SysPost::getPostCode, bo.getPostCode());
        lqw.like(StringUtils.isNotBlank(bo.getPostName()), SysPost::getPostName, bo.getPostName());
        lqw.eq(StringUtils.isNotBlank(bo.getStatus()), SysPost::getStatus, bo.getStatus());
        lqw.orderByAsc(SysPost::getSortOrder);
        return lqw;
    }

    /**
     * 查询所有岗位
     *
     * @return 岗位列表
     */
    @Override
    public List<SysPostVo> list() {
        return baseMapper.selectVoList(new QueryWrapper<>());
    }

    /**
     * 通过岗位ID查询岗位信息
     *
     * @param postId 岗位ID
     * @return 角色对象信息
     */
    @Override
    public SysPostVo getById(Long postId) {
        return baseMapper.selectVoById(postId);
    }

    /**
     * 根据用户ID获取岗位选择框列表
     *
     * @param userId 用户ID
     * @return 选中岗位ID列表
     */
    @Override
    public List<Long> listByUserId(Long userId) {
        return baseMapper.selectPostListByUserId(userId);
    }

    /**
     * 校验岗位名称是否唯一
     *
     * @param post 岗位信息
     * @return 结果
     */
    @Override
    public boolean checkPostNameUnique(SysPostBo post) {
        boolean exist = baseMapper.exists(new LambdaQueryWrapper<SysPost>()
            .eq(SysPost::getPostName, post.getPostName())
            .ne(ObjectUtil.isNotNull(post.getId()), SysPost::getId, post.getId()));
        return !exist;
    }

    /**
     * 校验岗位编码是否唯一
     *
     * @param post 岗位信息
     * @return 结果
     */
    @Override
    public boolean checkPostCodeUnique(SysPostBo post) {
        boolean exist = baseMapper.exists(new LambdaQueryWrapper<SysPost>()
            .eq(SysPost::getPostCode, post.getPostCode())
            .ne(ObjectUtil.isNotNull(post.getId()), SysPost::getId, post.getId()));
        return !exist;
    }

    /**
     * 通过岗位ID查询岗位使用数量
     *
     * @param postId 岗位ID
     * @return 结果
     */
    @Override
    public long countUserPostById(Long postId) {
        return userPostMapper.selectCount(new LambdaQueryWrapper<SysUserPost>().eq(SysUserPost::getPostId, postId));
    }

    /**
     * 删除岗位信息
     *
     * @param postId 岗位ID
     * @return 结果
     */
    @Override
    public int delete(Long postId) {
        return baseMapper.deleteById(postId);
    }

    /**
     * 批量删除岗位信息
     *
     * @param postIds 需要删除的岗位ID
     * @return 结果
     */
    @Override
    public int deleteByIds(Long[] postIds) {
        for (Long postId : postIds) {
            SysPost post = baseMapper.selectById(postId);
            if (countUserPostById(postId) > 0) {
                throw new ServiceException(String.format("%1$s已分配,不能删除", post.getPostName()));
            }
        }
        return baseMapper.deleteBatchIds(Arrays.asList(postIds));
    }

    /**
     * 新增保存岗位信息
     *
     * @param bo 岗位信息
     * @return 结果
     */
    @Override
    public int insert(SysPostBo bo) {
        SysPost post = MapstructUtils.convert(bo, SysPost.class);
        return baseMapper.insert(post);
    }

    /**
     * 修改保存岗位信息
     *
     * @param bo 岗位信息
     * @return 结果
     */
    @Override
    public int update(SysPostBo bo) {
        SysPost post = MapstructUtils.convert(bo, SysPost.class);
        return baseMapper.updateById(post);
    }
}
