package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.domain.WebResult.TableDataInfo;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysConfig;
import com.tiandtech.system.service.SysConfigService;
import com.tiandtech.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 参数配置 信息操作处理
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/config")
public class SysConfigController extends BaseController {

    private final SysConfigService configService;

    /**
     * 获取参数配置列表
     */
    @SaCheckPermission("system:config:list")
    @PostMapping("/list")
    public TableDataInfo<SysConfig> list(@RequestBody SysConfig config, PageQuery pageQuery) {
        Page<SysConfig> page = configService.listByPage(config, pageQuery);
        return WebResult.success(page);
    }

    /**
     * 导出参数配置列表
     */
    @Log(title = "参数管理", businessType = BusinessType.EXPORT)
    @SaCheckPermission("system:config:export")
    @PostMapping("/export")
    public void export(SysConfig config, HttpServletResponse response) {
        List<SysConfig> list = configService.list(config);
        ExcelUtil.exportExcel(list, "参数数据", SysConfig.class, response);
    }

    /**
     * 根据参数编号获取详细信息
     */
    @SaCheckPermission("system:config:query")
    @GetMapping(value = "/{id}")
    public WebResult<SysConfig> getInfo(@PathVariable Long id) {
        return WebResult.success(configService.getById(id));
    }

    /**
     * 根据参数键名查询参数值
     */
    @GetMapping(value = "/key/{key}")
    public WebResult<String> getConfigKey(@PathVariable String key) {
        String value = configService.getConfigValue(key);
        return WebResult.success(value);
    }

    /**
     * 新增参数配置
     */
    @SaCheckPermission("system:config:add")
    @Log(title = "参数管理", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysConfig config) {
        if (!configService.checkConfigKeyUnique(config)) {
            return WebResult.error("新增参数'" + config.getTitle() + "'失败，参数键名已存在");
        }
        configService.insert(config);
        return WebResult.success();
    }

    /**
     * 修改参数配置
     */
    @SaCheckPermission("system:config:edit")
    @Log(title = "参数管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysConfig config) {
        if (!configService.checkConfigKeyUnique(config)) {
            return WebResult.error("修改参数'" + config.getTitle() + "'失败，参数键名已存在");
        }
        configService.update(config);
        return WebResult.success();
    }

    /**
     * 根据参数键名修改参数配置
     */
    @SaCheckPermission("system:config:edit")
    @Log(title = "参数管理", businessType = BusinessType.UPDATE)
    @PutMapping("/updateByKey")
    public WebResult<Void> updateByKey(@RequestBody SysConfig config) {
        configService.update(config);
        return WebResult.success();
    }

    /**
     * 删除参数配置
     *
     * @param configIds 参数ID串
     */
    @SaCheckPermission("system:config:remove")
    @Log(title = "参数管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{configIds}")
    public WebResult<Void> remove(@PathVariable Long[] configIds) {
        configService.deleteByIds(configIds);
        return WebResult.success();
    }

    /**
     * 刷新参数缓存
     */
    @SaCheckPermission("system:config:remove")
    @Log(title = "参数管理", businessType = BusinessType.CLEAN)
    @DeleteMapping("/refreshCache")
    public WebResult<Void> refreshCache() {
        configService.resetConfigCache();
        return WebResult.success();
    }
}
