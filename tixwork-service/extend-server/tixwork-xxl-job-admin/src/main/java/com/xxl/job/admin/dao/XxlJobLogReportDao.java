package com.xxl.job.admin.dao;

import com.xxl.job.admin.core.model.XxlJobLogReport;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * job log
 * <p>
 * tixwork
 */
@Mapper
public interface XxlJobLogReportDao {

    public int save(XxlJobLogReport xxlJobLogReport);

    public int update(XxlJobLogReport xxlJobLogReport);

    public List<XxlJobLogReport> queryLogReport(@Param("triggerDayFrom") Date triggerDayFrom,
                                                @Param("triggerDayTo") Date triggerDayTo);

    public XxlJobLogReport queryLogReportTotal();

}
