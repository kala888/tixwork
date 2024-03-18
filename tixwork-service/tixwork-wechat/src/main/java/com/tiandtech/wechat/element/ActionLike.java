package com.tiandtech.wechat.element;

import com.tiandtech.core.domain.dto.BaseDTO;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class ActionLike extends BaseDTO {
    private String title;
    private String linkToUrl;
    private String imageUrl;
    private String icon;
    private String brief;
    private String code;
    private boolean disabled;
    private boolean statInPage;
    private String uiType;
}
