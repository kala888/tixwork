package com.tiandtech.base.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EleImage {

    private String imageUrl;

    @Override
    public String toString() {
        return imageUrl;
    }
}
