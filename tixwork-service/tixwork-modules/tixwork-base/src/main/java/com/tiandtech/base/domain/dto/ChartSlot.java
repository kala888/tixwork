package com.tiandtech.base.domain.dto;

import lombok.Data;

@Data
public class ChartSlot {

    public enum SlotType {
        TABLE, CARD, BAR, PIE, ROSE, LINE, NOT_SUPPORT;
    }

    public ChartSlot(SlotType type) {
        this.type = type;
    }

    private String title;
    private String brief;
    private Object value; //可能是candidateValue list
    private SlotType type;

}
