package com.tiandtech.core.utils;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.lang.tree.Tree;
import cn.hutool.core.lang.tree.TreeNodeConfig;
import cn.hutool.core.lang.tree.TreeUtil;
import cn.hutool.core.lang.tree.parser.NodeParser;
import com.tiandtech.base.domain.dto.TreeVo;
import com.tiandtech.core.utils.reflect.ReflectUtils;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 扩展 hutool TreeUtil 封装系统树构建
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TreeBuildUtils extends TreeUtil {

    /**
     * 根据前端定制差异化字段
     */
//    public static final TreeNodeConfig DEFAULT_CONFIG = TreeNodeConfig.DEFAULT_CONFIG.setNameKey("label");
    public static <T, K> List<Tree<K>> build(List<T> list, NodeParser<T, K> nodeParser) {
        if (CollUtil.isEmpty(list)) {
            return ListUtil.empty();
        }
        TreeNodeConfig treeNodeConfig = new TreeNodeConfig();
        treeNodeConfig.setIdKey("id");
//        treeNodeConfig.setNameKey("label");
        treeNodeConfig.setDeep(5);

        K k = ReflectUtils.invokeGetter(list.get(0), "parentId");
        return TreeUtil.build(list, k, treeNodeConfig, nodeParser);
    }


    public static <T> List<TreeVo<T>> toTreeVo(List<T> list, NodeParser<T, Object> nodeParser) {

        TreeNodeConfig treeNodeConfig = new TreeNodeConfig();
        treeNodeConfig.setIdKey("id");
        treeNodeConfig.setNameKey("title");
        treeNodeConfig.setDeep(5);

        List<Tree<Object>> data = TreeUtil.build(list, 0L, treeNodeConfig, nodeParser);
        List<TreeVo<T>> result = convertToTreeVoList(data);
        return result;
    }

    private static <T> List<TreeVo<T>> convertToTreeVoList(List<Tree<Object>> treeNodeList) {
        List<TreeVo<T>> treeVoList = new ArrayList<>();
        if (CollUtil.isNotEmpty(treeNodeList)) {
            for (Tree<Object> treeNode : treeNodeList) {
                TreeVo<T> treeVo = BeanUtil.toBean(treeNode, TreeVo.class);
                treeVo.setChildren(convertToTreeVoList(treeNode.getChildren()));
                treeVoList.add(treeVo);
            }
        }
        return treeVoList;
    }


}
