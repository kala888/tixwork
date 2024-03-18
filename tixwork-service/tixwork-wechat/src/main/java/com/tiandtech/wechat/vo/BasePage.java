package com.tiandtech.wechat.vo;

import com.tiandtech.wechat.element.ActionLike;
import lombok.Data;

import java.util.List;

@Data
public class BasePage {
    private String title;
    private String linkToUrl;
    private List<ActionLike> actionList;
}
