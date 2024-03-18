package com.tiandtech.wechat.domain;

import com.tiandtech.base.domain.dto.EleImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 *
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WxArticle {

    private String title;
    private String brief;
    private String coverImage;
    private List<EleImage> imageList;
    private String url;
}
