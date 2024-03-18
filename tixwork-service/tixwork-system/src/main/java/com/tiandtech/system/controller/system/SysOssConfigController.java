package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.core.validate.AddGroup;
import com.tiandtech.core.validate.EditGroup;
import com.tiandtech.core.validate.QueryGroup;
import com.tiandtech.idempotent.RepeatSubmit;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysOssConfigBo;
import com.tiandtech.system.domain.vo.SysOssConfigVo;
import com.tiandtech.system.service.SysOssConfigService;
import com.tiandtech.web.core.BaseController;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 对象存储配置
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/oss-config")
public class SysOssConfigController extends BaseController {

    private final SysOssConfigService ossConfigService;


    /**
     * 查询对象存储配置列表
     */
    @SaCheckPermission("system:oss-config:list")
    @PostMapping("/list")
    public TableDataInfo<SysOssConfigVo> list(@RequestBody @Validated(QueryGroup.class) SysOssConfigBo bo, PageQuery pageQuery) {
        Page<SysOssConfigVo> list = ossConfigService.listByPage(bo, pageQuery);
        return WebResult.success(list);
    }

    /**
     * 获取对象存储配置详细信息
     *
     * @param ossConfigId OSS配置ID
     */
    @SaCheckPermission("system:oss-config:query")
    @GetMapping("/{ossConfigId}")
    public WebResult<SysOssConfigVo> getInfo(@NotNull(message = "主键不能为空")
                                             @PathVariable Long ossConfigId) {
        return WebResult.success(ossConfigService.getById(ossConfigId));
    }

    /**
     * 新增对象存储配置
     */
    @SaCheckPermission("system:oss-config:add")
    @Log(title = "对象存储配置", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public WebResult<Void> add(@Validated(AddGroup.class) @RequestBody SysOssConfigBo bo) {
        return toAjax(ossConfigService.insert(bo));
    }

    /**
     * 修改对象存储配置
     */
    @SaCheckPermission("system:oss-config:edit")
    @Log(title = "对象存储配置", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public WebResult<Void> edit(@Validated(EditGroup.class) @RequestBody SysOssConfigBo bo) {
        return toAjax(ossConfigService.update(bo));
    }

    /**
     * 删除对象存储配置
     *
     * @param ossConfigIds OSS配置ID串
     */
    @SaCheckPermission("system:oss-config:remove")
    @Log(title = "对象存储配置", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ossConfigIds}")
    public WebResult<Void> remove(@NotEmpty(message = "主键不能为空")
                                  @PathVariable Long[] ossConfigIds) {
        return toAjax(ossConfigService.deleteWithValidByIds(List.of(ossConfigIds), true));
    }

    /**
     * 状态修改
     */
    @SaCheckPermission("system:oss-config:edit")
    @Log(title = "对象存储状态修改", businessType = BusinessType.UPDATE)
    @PutMapping("/changeStatus")
    public WebResult<Void> changeStatus(@RequestBody SysOssConfigBo bo) {
        return toAjax(ossConfigService.updateOssConfigStatus(bo));
    }
}
