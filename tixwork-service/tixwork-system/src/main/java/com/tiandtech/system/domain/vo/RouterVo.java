package com.tiandtech.system.domain.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

/**
 * 路由配置信息
 */
@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class RouterVo {

    private String name;
    private String icon;
    private String path;
    private String component;
    private String redirect;

    private String target;
    private Boolean hideInMenu;
    private List<RouterVo> children;

    private String[] authority;

}
