package com.tiandtech.system.controller.system;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.core.validate.QueryGroup;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.ratelimiter.LimitType;
import com.tiandtech.ratelimiter.RateLimiter;
import com.tiandtech.system.domain.bo.SysOssObjectBo;
import com.tiandtech.system.domain.vo.SysOssObjectVo;
import com.tiandtech.system.domain.vo.SysOssUploadVo;
import com.tiandtech.system.service.SysOssService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * 文件上传 控制层
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/oss-object")
public class SysOssObjectController extends BaseController {

    private final SysOssService ossService;

    /**
     * 查询OSS对象存储列表
     */
    @SaCheckPermission("system:oss-object:list")
    @PostMapping("/list")
    public TableDataInfo<SysOssObjectVo> list(@RequestBody @Validated(QueryGroup.class) SysOssObjectBo bo, PageQuery pageQuery) {
        Page<SysOssObjectVo> list = ossService.listByPage(bo, pageQuery);
        return WebResult.success(list);
    }

    /**
     * 查询OSS对象基于id串
     *
     * @param ossIds OSS对象ID串
     */
    @SaCheckPermission("system:oss-object:list")
    @GetMapping("/listByIds/{ossIds}")
    public WebResult<List<SysOssObjectVo>> listByIds(@NotEmpty(message = "主键不能为空")
                                                     @PathVariable Long[] ossIds) {
        List<SysOssObjectVo> list = ossService.listByIds(Arrays.asList(ossIds));
        return WebResult.success(list);
    }

    /**
     * 上传OSS对象存储
     *
     * @param file 文件
     */
//    @SaCheckPermission("system:oss-object:upload")
    @SaCheckLogin
    @RateLimiter(count = 10, time = 120, limitType = LimitType.IP)
    @Log(title = "OSS对象存储", businessType = BusinessType.INSERT)
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public WebResult<SysOssUploadVo> upload(@RequestPart("file") MultipartFile file) {
        if (ObjectUtil.isNull(file)) {
            return WebResult.error("上传文件不能为空");
        }
        SysOssObjectVo oss = ossService.upload(file);
        SysOssUploadVo uploadVo = new SysOssUploadVo();
        uploadVo.setUrl(oss.getUrl());
        uploadVo.setFileName(oss.getOriginalName());
        uploadVo.setOssId(oss.getId().toString());
        return WebResult.success(uploadVo);
    }

    /**
     * 下载OSS对象
     *
     * @param ossId OSS对象ID
     */
    @SaCheckPermission("system:oss-object:download")
    @GetMapping("/download/{ossId}")
    public void download(@PathVariable Long ossId, HttpServletResponse response) throws IOException {
        ossService.download(ossId, response);
    }

    /**
     * 删除OSS对象存储
     *
     * @param ossIds OSS对象ID串
     */
    @SaCheckPermission("system:oss-object:remove")
    @Log(title = "OSS对象存储", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ossIds}")
    public WebResult<Void> remove(@NotEmpty(message = "主键不能为空")
                                  @PathVariable Long[] ossIds) {
        return toAjax(ossService.deleteWithValidByIds(List.of(ossIds), true));
    }

}
