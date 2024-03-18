package com.tiandtech.wechat.vo;

import com.tiandtech.wechat.element.ActionLike;
import com.tiandtech.wechat.element.Section;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class HomePage extends BasePage {
    private String title = "钛安甄选";
    private List<ActionLike> slideList;
    private List<ActionLike> actionFloorList;
    private Section section;
    private String transactionId;
}
