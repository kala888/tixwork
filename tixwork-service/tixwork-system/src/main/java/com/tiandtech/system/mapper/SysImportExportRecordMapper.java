package com.tiandtech.system.mapper;

import com.tiandtech.mybatis.core.mapper.BaseMapperPlus;
import com.tiandtech.system.domain.SysImportExportRecord;
import com.tiandtech.system.domain.vo.SysImportExportRecordVo;
import org.springframework.stereotype.Repository;

/**
 * 导入记录Mapper接口
 */
@Repository
public interface SysImportExportRecordMapper extends BaseMapperPlus<SysImportExportRecord, SysImportExportRecordVo> {

}
