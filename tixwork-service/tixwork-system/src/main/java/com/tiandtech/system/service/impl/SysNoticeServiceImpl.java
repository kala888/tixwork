package com.tiandtech.system.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysNotice;
import com.tiandtech.system.domain.bo.SysNoticeBo;
import com.tiandtech.system.domain.vo.SysNoticeVo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.mapper.SysNoticeMapper;
import com.tiandtech.system.mapper.SysUserMapper;
import com.tiandtech.system.service.SysNoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * 公告 服务层实现
 */
@RequiredArgsConstructor
@Service
public class SysNoticeServiceImpl implements SysNoticeService {

    private final SysNoticeMapper baseMapper;
    private final SysUserMapper userMapper;

    @Override
    public Page<SysNoticeVo> listByPage(SysNoticeBo notice, PageQuery pageQuery) {
        LambdaQueryWrapper<SysNotice> lqw = buildQueryWrapper(notice);
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    /**
     * 查询公告信息
     *
     * @param noticeId 公告ID
     * @return 公告信息
     */
    @Override
    public SysNoticeVo getById(Long noticeId) {
        return baseMapper.selectVoById(noticeId);
    }

    /**
     * 查询公告列表
     *
     * @param notice 公告信息
     * @return 公告集合
     */
    @Override
    public List<SysNoticeVo> list(SysNoticeBo notice) {
        LambdaQueryWrapper<SysNotice> lqw = buildQueryWrapper(notice);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<SysNotice> buildQueryWrapper(SysNoticeBo bo) {
        LambdaQueryWrapper<SysNotice> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getNoticeTitle()), SysNotice::getNoticeTitle, bo.getNoticeTitle());
        lqw.eq(bo.getNoticeType() != null, SysNotice::getNoticeType, bo.getNoticeType());
        if (StringUtils.isNotBlank(bo.getCreateByName())) {
            SysUserVo sysUser = userMapper.selectUserByUserName(bo.getCreateByName());
            lqw.eq(SysNotice::getCreateBy, ObjectUtil.isNotNull(sysUser) ? sysUser.getId() : null);
        }
        return lqw;
    }

    /**
     * 新增公告
     *
     * @param bo 公告信息
     * @return 结果
     */
    @Override
    public int insert(SysNoticeBo bo) {
        SysNotice notice = MapstructUtils.convert(bo, SysNotice.class);
        return baseMapper.insert(notice);
    }

    /**
     * 修改公告
     *
     * @param bo 公告信息
     * @return 结果
     */
    @Override
    public int update(SysNoticeBo bo) {
        SysNotice notice = MapstructUtils.convert(bo, SysNotice.class);
        return baseMapper.updateById(notice);
    }

    /**
     * 删除公告对象
     *
     * @param noticeId 公告ID
     * @return 结果
     */
    @Override
    public int delete(Long noticeId) {
        return baseMapper.deleteById(noticeId);
    }

    /**
     * 批量删除公告信息
     *
     * @param noticeIds 需要删除的公告ID
     * @return 结果
     */
    @Override
    public int deleteByIds(Long[] noticeIds) {
        return baseMapper.deleteBatchIds(Arrays.asList(noticeIds));
    }

    @Override
    public List<SysNotice> selectLatest() {
        LambdaQueryWrapper<SysNotice> lqw = new LambdaQueryWrapper<SysNotice>();
        lqw.last("limit 3");
        return baseMapper.selectList(lqw);
    }
}
