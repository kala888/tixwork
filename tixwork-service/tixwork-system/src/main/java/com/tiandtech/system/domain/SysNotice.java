package com.tiandtech.system.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.tiandtech.base.enums.NoticeType;
import com.tiandtech.tenant.core.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;


/**
 * 通知公告表 sys_notice
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_notice")
public class SysNotice extends TenantEntity {

    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public String getDisplayName() {
        return this.noticeTitle;
    }

    private String noticeTitle;
    private NoticeType noticeType;
    private String noticeContent;
    private String status;
    private String remark;

}
