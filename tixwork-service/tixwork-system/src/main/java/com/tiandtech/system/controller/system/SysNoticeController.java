package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysNoticeBo;
import com.tiandtech.system.domain.vo.SysNoticeVo;
import com.tiandtech.system.service.SysNoticeService;
import com.tiandtech.web.core.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * 公告 信息操作处理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/notice")
public class SysNoticeController extends BaseController {

    private final SysNoticeService noticeService;

    /**
     * 获取通知公告列表
     */
    @SaCheckPermission("system:notice:list")
    @PostMapping("/list")
    public TableDataInfo<SysNoticeVo> list(@RequestBody SysNoticeBo notice, PageQuery pageQuery) {
        Page<SysNoticeVo> list = noticeService.listByPage(notice, pageQuery);
        return WebResult.success(list);
    }

    /**
     * 根据通知公告编号获取详细信息
     *
     * @param noticeId 公告ID
     */
    @SaCheckPermission("system:notice:query")
    @GetMapping(value = "/{noticeId}")
    public WebResult<SysNoticeVo> getInfo(@PathVariable Long noticeId) {
        return WebResult.success(noticeService.getById(noticeId));
    }

    /**
     * 新增通知公告
     */
    @SaCheckPermission("system:notice:add")
    @Log(title = "通知公告", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysNoticeBo notice) {
        return toAjax(noticeService.insert(notice));
    }

    /**
     * 修改通知公告
     */
    @SaCheckPermission("system:notice:edit")
    @Log(title = "通知公告", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysNoticeBo notice) {
        return toAjax(noticeService.update(notice));
    }

    /**
     * 删除通知公告
     *
     * @param noticeIds 公告ID串
     */
    @SaCheckPermission("system:notice:remove")
    @Log(title = "通知公告", businessType = BusinessType.DELETE)
    @DeleteMapping("/{noticeIds}")
    public WebResult<Void> remove(@PathVariable Long[] noticeIds) {
        return toAjax(noticeService.deleteByIds(noticeIds));
    }
}
