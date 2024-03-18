package com.tiandtech.system.listener;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.crypto.digest.BCrypt;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.ValidatorUtils;
import com.tiandtech.excel.core.ExcelListener;
import com.tiandtech.excel.core.ExcelResult;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.SysConfig;
import com.tiandtech.system.domain.bo.SysUserBo;
import com.tiandtech.system.domain.vo.SysUserImportVo;
import com.tiandtech.system.domain.vo.SysUserVo;
import com.tiandtech.system.service.SysConfigService;
import com.tiandtech.system.service.SysUserService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * 系统用户自定义导入
 */
@Slf4j
public class SysUserImportListener extends AnalysisEventListener<SysUserImportVo> implements ExcelListener<SysUserImportVo> {

    private final SysUserService userService;

    private final String password;

    private final Boolean isUpdateSupport;

    private final Long operUserId;

    private int successNum = 0;
    private int failureNum = 0;
    private final StringBuilder successMsg = new StringBuilder();
    private final StringBuilder failureMsg = new StringBuilder();

    public SysUserImportListener(Boolean isUpdateSupport) {
        SysConfig cfg = SpringUtils.getBean(SysConfigService.class).getByKey("sys.user.initPassword");
        this.userService = SpringUtils.getBean(SysUserService.class);
        this.password = BCrypt.hashpw(cfg.getValue());
        this.isUpdateSupport = isUpdateSupport;
        this.operUserId = LoginHelper.getUserId();
    }

    @Override
    public void invoke(SysUserImportVo userVo, AnalysisContext context) {
        SysUserVo sysUser = this.userService.selectUserByUserName(userVo.getUserName());
        try {
            // 验证是否存在这个用户
            if (ObjectUtil.isNull(sysUser)) {
                SysUserBo user = BeanUtil.toBean(userVo, SysUserBo.class);
                ValidatorUtils.validate(user);
                user.setPassword(password);
                user.setCreateBy(operUserId);
                userService.insertUser(user);
                successNum++;
                successMsg.append("<br/>").append(successNum).append("、账号 ").append(user.getUserName()).append(" 导入成功");
            } else if (isUpdateSupport) {
                Long userId = sysUser.getId();
                SysUserBo user = BeanUtil.toBean(userVo, SysUserBo.class);
                user.setId(userId);
                ValidatorUtils.validate(user);
                userService.checkUserAllowed(user.getId());
                userService.checkUserDataScope(user.getId());
                user.setUpdateBy(operUserId);
                userService.updateUser(user);
                successNum++;
                successMsg.append("<br/>").append(successNum).append("、账号 ").append(user.getUserName()).append(" 更新成功");
            } else {
                failureNum++;
                failureMsg.append("<br/>").append(failureNum).append("、账号 ").append(sysUser.getUserName()).append(" 已存在");
            }
        } catch (Exception e) {
            failureNum++;
            String msg = "<br/>" + failureNum + "、账号 " + userVo.getUserName() + " 导入失败：";
            failureMsg.append(msg).append(e.getMessage());
            log.error(msg, e);
        }
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {

    }

    @Override
    public ExcelResult<SysUserImportVo> getExcelResult() {
        return new ExcelResult<>() {

            @Override
            public String getSummary() {
                if (failureNum > 0) {
                    failureMsg.insert(0, "很抱歉，导入失败！共 " + failureNum + " 条数据格式不正确，错误如下：");
                    throw new ServiceException(failureMsg.toString());
                } else {
                    successMsg.insert(0, "恭喜您，数据已全部导入成功！共 " + successNum + " 条，数据如下：");
                }
                return successMsg.toString();
            }

            @Override
            public List<SysUserImportVo> getList() {
                return null;
            }

            @Override
            public List<String> getErrorList() {
                return null;
            }
        };
    }
}
