package com.tiandtech.system.service.impl;

import cn.hutool.http.useragent.UserAgent;
import cn.hutool.http.useragent.UserAgentUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.Constants;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.ip.AddressUtils;
import com.tiandtech.log.event.LoginEvent;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysLoginRecord;
import com.tiandtech.system.domain.bo.SysLoginRecordBo;
import com.tiandtech.system.domain.vo.SysLoginRecordVo;
import com.tiandtech.system.mapper.SysLoginRecordMapper;
import com.tiandtech.system.service.SysLoginRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 系统访问日志情况信息 服务层处理
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class SysLoginRecordServiceImpl implements SysLoginRecordService {

    private final SysLoginRecordMapper baseMapper;

    /**
     * 记录登录信息
     *
     * @param loginRecordEvent 登录事件
     */
    @Async
    @EventListener
    public void saveLoginRecord(LoginEvent loginRecordEvent) {
        String ip = loginRecordEvent.getIp();
        final UserAgent userAgent = UserAgentUtil.parse(loginRecordEvent.getUserAgent());

        String address = AddressUtils.getRealAddressByIP(ip);
        String stringBuilder = getBlock(ip)
            + address
            + getBlock(loginRecordEvent.getUserName())
            + getBlock(loginRecordEvent.getStatus())
            + getBlock(loginRecordEvent.getMessage());
        // 打印信息到日志
        log.info(stringBuilder, loginRecordEvent.getArgs());
        // 获取客户端操作系统
        String os = userAgent.getOs().getName();
        // 获取客户端浏览器
        String browser = userAgent.getBrowser().getName();
        // 封装对象
        SysLoginRecordBo loginRecordBo = new SysLoginRecordBo();
        loginRecordBo.setTenantId(loginRecordEvent.getTenantId());
        loginRecordBo.setUserName(loginRecordEvent.getUserName());
        loginRecordBo.setIpaddr(ip);
        loginRecordBo.setLoginLocation(address);
        loginRecordBo.setBrowser(browser);
        loginRecordBo.setOs(os);
        loginRecordBo.setMsg(loginRecordEvent.getMessage());
        // 日志状态
        if (StringUtils.equalsAny(loginRecordEvent.getStatus(), Constants.LOGIN_SUCCESS, Constants.LOGOUT, Constants.REGISTER)) {
            loginRecordBo.setStatus(Constants.SUCCESS);
        } else if (Constants.LOGIN_FAIL.equals(loginRecordEvent.getStatus())) {
            loginRecordBo.setStatus(Constants.FAIL);
        }
        // 插入数据
        insert(loginRecordBo);
    }

    private String getBlock(Object msg) {
        if (msg == null) {
            msg = "";
        }
        return "[" + msg.toString() + "]";
    }

    @Override
    public Page<SysLoginRecordVo> listByPage(SysLoginRecordBo loginRecordBo, PageQuery pageQuery) {
        Map<String, Object> params = loginRecordBo.getParams();
        LambdaQueryWrapper<SysLoginRecord> lqw = new LambdaQueryWrapper<SysLoginRecord>()
            .like(StringUtils.isNotBlank(loginRecordBo.getIpaddr()), SysLoginRecord::getIpaddr, loginRecordBo.getIpaddr())
            .eq(StringUtils.isNotBlank(loginRecordBo.getStatus()), SysLoginRecord::getStatus, loginRecordBo.getStatus())
            .like(StringUtils.isNotBlank(loginRecordBo.getUserName()), SysLoginRecord::getUserName, loginRecordBo.getUserName())
            .between(params.get("beginTime") != null && params.get("endTime") != null,
                SysLoginRecord::getLoginTime, params.get("beginTime"), params.get("endTime"));
        if (StringUtils.isBlank(pageQuery.getOrderBy())) {
            pageQuery.setOrderBy("id");
            pageQuery.setIsAsc("desc");
        }
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    /**
     * 新增系统登录日志
     *
     * @param bo 访问日志对象
     */
    @Override
    public void insert(SysLoginRecordBo bo) {
        SysLoginRecord record = MapstructUtils.convert(bo, SysLoginRecord.class);
        record.setLoginTime(new Date());
        baseMapper.insert(record);
    }

    /**
     * 查询系统登录日志集合
     *
     * @param loginRecordBo 访问日志对象
     * @return 登录记录集合
     */
    @Override
    public List<SysLoginRecordVo> list(SysLoginRecordBo loginRecordBo) {
        Map<String, Object> params = loginRecordBo.getParams();
        return baseMapper.selectVoList(new LambdaQueryWrapper<SysLoginRecord>()
            .like(StringUtils.isNotBlank(loginRecordBo.getIpaddr()), SysLoginRecord::getIpaddr, loginRecordBo.getIpaddr())
            .eq(StringUtils.isNotBlank(loginRecordBo.getStatus()), SysLoginRecord::getStatus, loginRecordBo.getStatus())
            .like(StringUtils.isNotBlank(loginRecordBo.getUserName()), SysLoginRecord::getUserName, loginRecordBo.getUserName())
            .between(params.get("beginTime") != null && params.get("endTime") != null,
                SysLoginRecord::getLoginTime, params.get("beginTime"), params.get("endTime"))
            .orderByDesc(SysLoginRecord::getId));
    }

    /**
     * 批量删除系统登录日志
     *
     * @param infoIds 需要删除的登录日志ID
     * @return 结果
     */
    @Override
    public int deleteByIds(Long[] infoIds) {
        return baseMapper.deleteBatchIds(Arrays.asList(infoIds));
    }

    /**
     * 清空系统登录日志
     */
    @Override
    public void clean() {
        baseMapper.delete(new LambdaQueryWrapper<>());
    }
}
