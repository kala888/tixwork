package com.tiandtech.system.domain.vo;

import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * 缓存监控列表信息
 */
@Data
public class CacheListInfoVo {

    private Properties info;

    private Long dbSize;

    private List<Map<String, String>> commandStats;

}
