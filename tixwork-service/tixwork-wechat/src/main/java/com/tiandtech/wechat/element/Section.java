package com.tiandtech.wechat.element;

import com.tiandtech.core.domain.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class Section<T> extends BaseDTO {
    private String title;
    private String linkToUrl;
    private String imageUrl;
    private String icon;
    private String displayMode = "auto";
    private List<T> items;
}
