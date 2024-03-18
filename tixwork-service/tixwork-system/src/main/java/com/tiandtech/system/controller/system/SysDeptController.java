package com.tiandtech.system.controller.system;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.tiandtech.base.domain.dto.TreeVo;
import com.tiandtech.core.constant.UserConstants;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.TreeBuildUtils;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.system.domain.bo.SysDeptBo;
import com.tiandtech.system.domain.vo.SysDeptVo;
import com.tiandtech.system.service.SysDeptService;
import com.tiandtech.web.core.BaseController;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 部门信息
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/system/dept")
public class SysDeptController extends BaseController {

    private final SysDeptService deptService;

    /**
     * 获取部门列表
     */
    @SaCheckPermission("system:dept:list")
    @PostMapping("/list")
    public WebResult<List<SysDeptVo>> list(@RequestBody SysDeptBo dept) {
        List<SysDeptVo> list = deptService.list(dept);
        return WebResult.success(list);
    }

//    /**
//     * 查询部门列表（排除节点）
//     *
//     * @param deptId 部门ID
//     */
//    @SaCheckPermission("system:dept:list")
//    @GetMapping("/list/exclude/{deptId}")
//    public WebResult<List<SysDeptVo>> excludeChild(@PathVariable(value = "deptId", required = false) Long deptId) {
//        List<SysDeptVo> list = deptService.list(new SysDeptBo());
//        list.removeIf(d -> d.getId().equals(deptId)
//            || StringUtils.splitList(d.getAncestors()).contains(Convert.toStr(deptId)));
//        return WebResult.success(list);
//    }

    /**
     * 根据部门编号获取详细信息
     *
     * @param deptId 部门ID
     */
    @SaCheckPermission("system:dept:query")
    @GetMapping(value = "/{deptId}")
    public WebResult<SysDeptVo> getInfo(@PathVariable Long deptId) {
        deptService.checkDeptDataScope(deptId);
        return WebResult.success(deptService.getById(deptId));
    }

    /**
     * 新增部门
     */
    @SaCheckPermission("system:dept:add")
    @Log(title = "部门管理", businessType = BusinessType.INSERT)
    @PostMapping
    public WebResult<Void> add(@Validated @RequestBody SysDeptBo dept) {
        if (!deptService.checkDeptNameUnique(dept)) {
            return WebResult.error("新增部门'" + dept.getDeptName() + "'失败，部门名称已存在");
        }
        return toAjax(deptService.insert(dept));
    }

    /**
     * 修改部门
     */
    @SaCheckPermission("system:dept:edit")
    @Log(title = "部门管理", businessType = BusinessType.UPDATE)
    @PutMapping
    public WebResult<Void> edit(@Validated @RequestBody SysDeptBo dept) {
        Long deptId = dept.getId();
        deptService.checkDeptDataScope(deptId);
        if (!deptService.checkDeptNameUnique(dept)) {
            return WebResult.error("修改部门'" + dept.getDeptName() + "'失败，部门名称已存在");
        } else if (dept.getParentId().equals(deptId)) {
            return WebResult.error("修改部门'" + dept.getDeptName() + "'失败，上级部门不能是自己");
        } else if (StringUtils.equals(UserConstants.DEPT_DISABLE, dept.getStatus())) {
            if (deptService.selectNormalChildrenDeptById(deptId) > 0) {
                return WebResult.error("该部门包含未停用的子部门!");
            } else if (deptService.checkDeptExistUser(deptId)) {
                return WebResult.error("该部门下存在已分配用户，不能禁用!");
            }
        }
        return toAjax(deptService.update(dept));
    }

    /**
     * 删除部门
     *
     * @param deptId 部门ID
     */
    @SaCheckPermission("system:dept:remove")
    @Log(title = "部门管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{deptId}")
    public WebResult<Void> remove(@PathVariable Long deptId) {
        if (deptService.hasChildByDeptId(deptId)) {
            return WebResult.error("存在下级部门,不允许删除");
        }
        if (deptService.checkDeptExistUser(deptId)) {
            return WebResult.error("部门存在用户,不允许删除");
        }
        deptService.checkDeptDataScope(deptId);
        return toAjax(deptService.deleteByIds(deptId));
    }

    /**
     * 获取部门下拉树列表
     */
    @SaCheckPermission("system:dept:list")
    @GetMapping("/tree")
    public WebResult.TableDataInfo<TreeVo<SysDeptVo>> selectTree(SysDeptBo dept) {
        List<SysDeptVo> list = deptService.list(dept);
        List<TreeVo<SysDeptVo>> tree = toTreeVo(list);
        return WebResult.success(tree);
    }


    /**
     * 加载对应角色部门列表树
     */
    @SaCheckPermission("system:dept:list")
    @GetMapping(value = "/tree/{roleId}")
    public WebResult roleDeptTreeSelect(@PathVariable("roleId") Long roleId) {

        List<SysDeptVo> list = deptService.list(new SysDeptBo());
        List<TreeVo<SysDeptVo>> tree = toTreeVo(list);

        Map<String, Object> ajax = new HashMap<>();
        ajax.put("checkedKeys", deptService.listByRoleId(roleId));
        ajax.put("depts", tree);
        return WebResult.success(ajax);
    }

    @NotNull
    private static List<TreeVo<SysDeptVo>> toTreeVo(List<SysDeptVo> list) {
        return TreeBuildUtils.toTreeVo(list, (dept, tree) -> {
            tree.setId(dept.getId());
            tree.setParentId(dept.getParentId());
            tree.setName(dept.getDeptName());
            tree.setWeight(dept.getSortOrder());
            tree.putExtra("extraData", dept);
            tree.putExtra("icon", dept.getDeptType().name().toLowerCase());
        });
    }

}
