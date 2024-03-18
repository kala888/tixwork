package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysNotice;
import com.tiandtech.system.domain.bo.SysNoticeBo;
import com.tiandtech.system.domain.vo.SysNoticeVo;

import java.util.List;

/**
 * 公告 服务层
 */
public interface SysNoticeService {


    Page<SysNoticeVo> listByPage(SysNoticeBo notice, PageQuery pageQuery);

    /**
     * 查询公告信息
     *
     * @param noticeId 公告ID
     * @return 公告信息
     */
    SysNoticeVo getById(Long noticeId);

    /**
     * 查询公告列表
     *
     * @param notice 公告信息
     * @return 公告集合
     */
    List<SysNoticeVo> list(SysNoticeBo notice);

    /**
     * 新增公告
     *
     * @param bo 公告信息
     * @return 结果
     */
    int insert(SysNoticeBo bo);

    /**
     * 修改公告
     *
     * @param bo 公告信息
     * @return 结果
     */
    int update(SysNoticeBo bo);

    /**
     * 删除公告信息
     *
     * @param noticeId 公告ID
     * @return 结果
     */
    int delete(Long noticeId);

    /**
     * 批量删除公告信息
     *
     * @param noticeIds 需要删除的公告ID
     * @return 结果
     */
    int deleteByIds(Long[] noticeIds);

    List<SysNotice> selectLatest();
}
