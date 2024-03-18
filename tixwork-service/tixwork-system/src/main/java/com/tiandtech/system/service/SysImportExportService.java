package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysImportExportRecordBo;
import com.tiandtech.system.domain.vo.SysImportExportRecordVo;

import java.util.List;

/**
 * 参数配置 服务层
 */
public interface SysImportExportService {


    Page<SysImportExportRecordVo> listByPage(SysImportExportRecordBo bo, PageQuery pageQuery);

    SysImportExportRecordVo getImportedRecord(String md5);

    boolean save(SysImportExportRecordBo bo);

    int deleteByIds(List<Long> ids);

}
