package com.tiandtech.wechat.vo;

import com.tiandtech.wechat.element.ActionLike;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProfileVo extends BasePage {
    private Long userId;
    private String title = "我的";
    private String nickName;
    private String avatar;
    private String brief;
    private String mobile;
    private List<ActionLike> orderActions;
    private List<ActionLike> lineActions;

    private String bindSeller;


}
