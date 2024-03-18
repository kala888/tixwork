package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysPostBo;
import com.tiandtech.system.domain.vo.SysPostVo;
import com.tiandtech.system.service.SysPostService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 岗位信息操作处理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/post")
public class SysPostController extends BaseController {

    private final SysPostService postService;

    /**
     * 获取岗位列表
     */
    @SaCheckPermission("system:post:list")
    @PostMapping("/list")
    public TableDataInfo<SysPostVo> list(@RequestBody SysPostBo post, PageQuery pageQuery) {
        Page<SysPostVo> list = postService.listByPage(post, pageQuery);
        return WebResult.success(list);
    }

    /**
     * 导出岗位列表
     */
    @Log(title = "岗位管理", businessType = BusinessType.EXPORT)
    @SaCheckPermission("system:post:export")
    @PostMapping("/export")
    public void export(SysPostBo post, HttpServletResponse response) {
        List<SysPostVo> list = postService.list(post);
        ExcelUtil.exportExcel(list, "岗位数据", SysPostVo.class, response);
    }

    /**
     * 根据岗位编号获取详细信息
     *
     * @param postId 岗位ID
     */
    @SaCheckPermission("system:post:query")
    @GetMapping(value = "/{postId}")
    public WebResult<SysPostVo> getInfo(@PathVariable Long postId) {
        return WebResult.success(postService.getById(postId));
    }

    /**
     * 新增岗位
     */
    @SaCheckPermission("system:post:add")
    @Log(title = "岗位管理", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysPostBo post) {
        if (!postService.checkPostNameUnique(post)) {
            return WebResult.error("新增岗位'" + post.getPostName() + "'失败，岗位名称已存在");
        } else if (!postService.checkPostCodeUnique(post)) {
            return WebResult.error("新增岗位'" + post.getPostName() + "'失败，岗位编码已存在");
        }
        return toAjax(postService.insert(post));
    }

    /**
     * 修改岗位
     */
    @SaCheckPermission("system:post:edit")
    @Log(title = "岗位管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysPostBo post) {
        if (!postService.checkPostNameUnique(post)) {
            return WebResult.error("修改岗位'" + post.getPostName() + "'失败，岗位名称已存在");
        } else if (!postService.checkPostCodeUnique(post)) {
            return WebResult.error("修改岗位'" + post.getPostName() + "'失败，岗位编码已存在");
        } else if (UserConstants.POST_DISABLE.equals(post.getStatus())
            && postService.countUserPostById(post.getId()) > 0) {
            return WebResult.error("该岗位下存在已分配用户，不能禁用!");
        }
        return toAjax(postService.update(post));
    }

    /**
     * 删除岗位
     *
     * @param postIds 岗位ID串
     */
    @SaCheckPermission("system:post:remove")
    @Log(title = "岗位管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{postIds}")
    public WebResult<Void> remove(@PathVariable Long[] postIds) {
        return toAjax(postService.deleteByIds(postIds));
    }

}
