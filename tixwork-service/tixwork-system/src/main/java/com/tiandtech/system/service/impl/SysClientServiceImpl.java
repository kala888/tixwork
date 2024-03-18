package com.tiandtech.system.service.impl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysClient;
import com.tiandtech.system.domain.bo.SysClientBo;
import com.tiandtech.system.domain.vo.SysClientVo;
import com.tiandtech.system.mapper.SysClientMapper;
import com.tiandtech.system.service.SysClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 客户端管理Service业务层处理
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class SysClientServiceImpl implements SysClientService {

    private final SysClientMapper baseMapper;

    /**
     * 查询客户端管理
     */
    @Override
    public SysClientVo queryById(Long id) {
        SysClientVo vo = baseMapper.selectVoById(id);
        vo.setGrantTypeList(List.of(vo.getGrantType().split(",")));
        return vo;
    }


    /**
     * 查询客户端管理
     */
    @Override
    public SysClient queryByClientId(String clientId) {
        return baseMapper.selectOne(new LambdaQueryWrapper<SysClient>().eq(SysClient::getClientId, clientId));
    }

    /**
     * 查询客户端管理列表
     */
    @Override
    public WebResult.TableDataInfo<SysClientVo> queryPageList(SysClientBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<SysClient> lqw = buildQueryWrapper(bo);
        Page<SysClientVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        result.getRecords().forEach(r -> r.setGrantTypeList(List.of(r.getGrantType().split(","))));
        return WebResult.success(result);
    }

    /**
     * 查询客户端管理列表
     */
    @Override
    public List<SysClientVo> queryList(SysClientBo bo) {
        LambdaQueryWrapper<SysClient> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<SysClient> buildQueryWrapper(SysClientBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<SysClient> lqw = Wrappers.lambdaQuery();
        lqw.eq(StringUtils.isNotBlank(bo.getClientId()), SysClient::getClientId, bo.getClientId());
        lqw.eq(StringUtils.isNotBlank(bo.getClientKey()), SysClient::getClientKey, bo.getClientKey());
        lqw.eq(StringUtils.isNotBlank(bo.getClientSecret()), SysClient::getClientSecret, bo.getClientSecret());
        lqw.eq(StringUtils.isNotBlank(bo.getStatus()), SysClient::getStatus, bo.getStatus());
        return lqw;
    }

    /**
     * 新增客户端管理
     */
    @Override
    public Boolean insertByBo(SysClientBo bo) {
        SysClient add = MapstructUtils.convert(bo, SysClient.class);
        validEntityBeforeSave(add);
        add.setGrantType(String.join(",", bo.getGrantTypeList()));
        // 生成clientid
        String clientKey = bo.getClientKey();
        String clientSecret = bo.getClientSecret();
        add.setClientId(SecureUtil.md5(clientKey + clientSecret));
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setId(add.getId());
        }
        return flag;
    }

    /**
     * 修改客户端管理
     */
    @Override
    public Boolean updateByBo(SysClientBo bo) {
        SysClient update = MapstructUtils.convert(bo, SysClient.class);
        validEntityBeforeSave(update);
        update.setGrantType(String.join(",", bo.getGrantTypeList()));
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 修改状态
     */
    @Override
    public int updateUserStatus(Long id, String status) {
        return baseMapper.update(null,
            new LambdaUpdateWrapper<SysClient>()
                .set(SysClient::getStatus, status)
                .eq(SysClient::getId, id));
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(SysClient entity) {
        // 做一些数据校验,如唯一约束
    }

    /**
     * 批量删除客户端管理
     */
    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if (isValid) {
            // 做一些业务上的校验,判断是否需要校验
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }
}
