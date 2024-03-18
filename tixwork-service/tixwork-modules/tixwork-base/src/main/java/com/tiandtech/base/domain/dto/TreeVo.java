package com.tiandtech.base.domain.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 配合前端的树结构实体类
 */
@Data
public class TreeVo<T> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String icon;
    private T extraData;
    private List<TreeVo<T>> children;

}
