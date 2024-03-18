package com.tiandtech.wechat.controller;

import com.tiandtech.core.domain.WebResult;
import com.tiandtech.wechat.domain.WxArticle;
import com.tiandtech.wechat.service.WxArticleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/wechat-article")
public class WxArticleController {

    private final WxArticleService articleService;

    public WxArticleController(WxArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping(value = "/list")
    public WebResult list() {
        WebResult result = new WebResult();
        List<WxArticle> list = articleService.getArticles();
        result.setData(list);
        return result;
    }
}
