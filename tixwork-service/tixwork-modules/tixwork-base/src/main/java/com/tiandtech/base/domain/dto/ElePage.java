package com.tiandtech.base.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
public class ElePage extends EleObject {

    private String pageTitle;
    private String linkToUrl;
    private List<EleAction> actionList;
}
