package com.tiandtech.base.domain.dto;

import lombok.Data;

@Data
public class EleToast {

    public EleToast(String text) {
        this.text = text;
    }

    private String text;
    private int duration = 2000;
}
