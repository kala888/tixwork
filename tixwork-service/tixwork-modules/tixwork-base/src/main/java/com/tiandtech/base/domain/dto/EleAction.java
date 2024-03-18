package com.tiandtech.base.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class EleAction {

    private String id;
    private String title;
    private String brief;

    private String code;
    private String linkToUrl;
    private String icon;
    private String imageUrl;
    private Map<String, Object> extraData;

}
