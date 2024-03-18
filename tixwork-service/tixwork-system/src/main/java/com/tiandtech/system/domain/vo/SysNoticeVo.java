package com.tiandtech.system.domain.vo;

import com.tiandtech.base.enums.NoticeType;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.system.domain.SysNotice;
import com.tiandtech.translation.TransConstant;
import com.tiandtech.translation.Translation;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.util.Date;


/**
 * 通知公告视图对象 sys_notice
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AutoMapper(target = SysNotice.class)
public class SysNoticeVo extends BaseEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.noticeTitle;
    }


    /**
     * 公告标题
     */
    private String noticeTitle;

    /**
     * 公告类型
     */
    private NoticeType noticeType;

    /**
     * 公告内容
     */
    private String noticeContent;

    /**
     * 公告状态（0正常 1关闭）
     */
    private String status;

    /**
     * 备注
     */
    private String remark;

    /**
     * 创建者
     */
    private Long createBy;

    /**
     * 创建人名称
     */
    @Translation(type = TransConstant.USER_ID_TO_NAME, mapper = "createBy")
    private String createByName;

    /**
     * 创建时间
     */
    private Date createTime;

}
