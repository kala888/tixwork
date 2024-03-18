package com.tiandtech.base.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EleSlide extends EleObject {

    private String imageUrl;
    private String videoUrl;
    private String linkToUrl;
}
