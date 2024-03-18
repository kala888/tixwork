package com.tiandtech.wechat.service;

import cn.hutool.cache.CacheUtil;
import cn.hutool.cache.impl.TimedCache;
import cn.hutool.core.date.DateUnit;
import com.tiandtech.base.domain.dto.EleImage;
import com.tiandtech.wechat.domain.WxArticle;
import lombok.SneakyThrows;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.material.WxMpMaterialNewsBatchGetResult;
import me.chanjar.weixin.mp.bean.material.WxMpNewsArticle;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 *
 */
@Service
public class WxArticleService {

    private static final String KEY_ARTICLE_LIST = "article-list";

    @Autowired
    private WxMpService wxService;

    TimedCache<String, Object> timedCache = CacheUtil.newTimedCache(4);

    @SneakyThrows
    public List<WxArticle> getArticles() {
        Object cached = timedCache.get(KEY_ARTICLE_LIST);
        if (cached != null) {
            return (List<WxArticle>) cached;
        }

        WxMpMaterialNewsBatchGetResult result = wxService.getMaterialService().materialNewsBatchGet(0, 20);
        List<WxArticle> list = result.getItems().stream().map(it -> {
            WxMpNewsArticle sourceArticle = it.getContent().getArticles().get(0);

            List<EleImage> imageList = getImageList(sourceArticle.getContent());

            return WxArticle.builder()
                .title(sourceArticle.getTitle())
                .brief(sourceArticle.getDigest())
                .coverImage(sourceArticle.getThumbUrl())
                .url(sourceArticle.getUrl())
                .imageList(imageList).build();
        }).collect(Collectors.toList());

        timedCache.put(KEY_ARTICLE_LIST, list, DateUnit.SECOND.getMillis() * 60);
        return list;
    }

    private List<EleImage> getImageList(String html) {
        Document document = Jsoup.parse("<div>" + html + "</div>");
        Elements tagList = document.select("img");
        return tagList.stream()
            .filter(it -> !"gif".equalsIgnoreCase(it.attr("data-type")))
            .map(it -> it.attr("data-src"))
            .filter(Objects::nonNull)
            .map(it -> EleImage.builder().imageUrl(it).build())
            .limit(5)
            .collect(Collectors.toList());
    }
}
