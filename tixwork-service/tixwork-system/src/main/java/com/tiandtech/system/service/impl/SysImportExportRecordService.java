package com.tiandtech.system.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.base.enums.ImportExportType;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.SysImportExportRecord;
import com.tiandtech.system.domain.bo.SysImportExportRecordBo;
import com.tiandtech.system.domain.vo.SysImportExportRecordVo;
import com.tiandtech.system.mapper.SysImportExportRecordMapper;
import com.tiandtech.system.service.SysImportExportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SysImportExportRecordService implements SysImportExportService {

    private final SysImportExportRecordMapper baseMapper;

    @Override
    public Page<SysImportExportRecordVo> listByPage(SysImportExportRecordBo entity, PageQuery pageQuery) {
        LambdaQueryWrapper<SysImportExportRecord> lqw = buildQueryWrapper(entity);
        if (StringUtils.isBlank(pageQuery.getOrderBy())) {
            pageQuery.setOrderBy("create_time");
            pageQuery.setIsAsc("desc");
        }
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
    }

    @Override
    public SysImportExportRecordVo getImportedRecord(String md5) {
        LambdaQueryWrapper<SysImportExportRecord> lqw = Wrappers.lambdaQuery();
        lqw.eq(SysImportExportRecord::getFileMd5, md5);
        lqw.eq(SysImportExportRecord::getType, ImportExportType.IMPORT);
        return baseMapper.selectVoOne(lqw);
    }

    private LambdaQueryWrapper<SysImportExportRecord> buildQueryWrapper(SysImportExportRecordBo entity) {
        LambdaQueryWrapper<SysImportExportRecord> lqw = Wrappers.lambdaQuery();
        lqw.like(StrUtil.isNotEmpty(entity.getFileName()), SysImportExportRecord::getFileName, entity.getFileName());
        lqw.like(ObjectUtil.isNotNull(entity.getType()), SysImportExportRecord::getType, entity.getType());
        lqw.like(StrUtil.isNotEmpty(entity.getOperationUser()), SysImportExportRecord::getOperationUser, entity.getOperationUser());
        lqw.eq(ObjectUtil.isNotNull(entity.getOperationUserId()), SysImportExportRecord::getOperationUserId, entity.getOperationUserId());
        return lqw;
    }

    @Override
    public int deleteByIds(List<Long> ids) {
        return baseMapper.deleteBatchIds(ids);
    }

    @Override
    public boolean save(SysImportExportRecordBo bo) {
        SysImportExportRecord entity = MapstructUtils.convert(bo, SysImportExportRecord.class);
        if (entity != null && StrUtil.length(entity.getResult()) > 4000) {
            String sub = StrUtil.subPre(entity.getResult(), 3997) + "...";
            entity.setResult(sub);
        }
        return baseMapper.insertOrUpdate(entity);
    }

}
