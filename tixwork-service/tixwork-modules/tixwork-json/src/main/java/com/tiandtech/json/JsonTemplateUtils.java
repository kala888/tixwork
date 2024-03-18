package com.tiandtech.json;

import cn.hutool.cache.impl.LRUCache;
import cn.hutool.core.io.resource.ResourceUtil;

import java.util.Map;

public class JsonTemplateUtils {


    /**
     * 最多 200M 最大 2M 缓存 1小时
     */
    private static final LRUCache<String, String> cache = new LRUCache<>(1024 * 1024 * 100, 1000 * 60 * 60);

    private static final String FILE_SOURCE_FOLDER = "json-templates/";

//    private static final String FILE_CONTENT_KEY = "jsonContent:";
///**
// * Redis 缓存版本
// *
// * @param fileName
// * @return
// */
//    private static String getContent(String fileName) {
//        String key = FILE_CONTENT_KEY + fileName;
//        String data = RedisUtils.getCacheObject(key);
//        Console.log("load", key, "from redis");
//        if (StringUtils.isEmpty(data)) {
//            Console.log("load", key, "from file system");
//            data = ResourceUtil.readUtf8Str(FILE_SOURCE_FOLDER + fileName);
//            if (StringUtils.isEmpty(data)) {
//                throw new ServiceException("没有在resources中找到模板文件：" + fileName);
//            }
//            // 模板文件，缓存10分钟， REDIS重启，应该重置
//            RedisUtils.setCacheObject(key, data, 10, TimeUnit.MINUTES);
//        }
//        return data;
//    }

    /**
     * hutool 缓存的文件
     *
     * @param fileName
     * @return
     */
    public static String getContent(String fileName) {
        String content = cache.get(fileName);
        if (content == null) {
            byte[] bytes = ResourceUtil.readBytes(FILE_SOURCE_FOLDER + fileName);
            content = new String(bytes);
            cache.put(fileName, content);
        }
        return content;
    }


    /**
     * 在resources/json-templates 下的文件JSON模板文件 例如home-page.json 后续可以通过，  BeanUtil.setProperty(map,"actionList[0].title","Listof 样例");来修改值
     *
     * @param fileName
     * @return
     */
    public static Map parseMap(String fileName) {
        String content = getContent(fileName);
        return JsonUtils.parseMap(content);
    }

}
