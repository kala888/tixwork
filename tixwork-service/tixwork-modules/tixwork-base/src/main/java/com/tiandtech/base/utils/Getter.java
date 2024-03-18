package com.tiandtech.base.utils;

import java.util.Optional;
import java.util.function.Supplier;

/**
 * 通过lambda的方式获取值，例如：
 * <p>
 * Optional<String> name = Getter.get(() -> user.getPets().get(0).getName());
 * <p>
 * String name = Getter.get(() -> user.getPets().get(0).getName()).orElse("kala888");
 * <p>
 * 业务异常应该忽略
 */
public class Getter {
//    private static final Logger logger = LoggerFactory.getLogger(Getter.class);

    public static <T> Optional<T> get(Supplier<T> resolver) {
        try {
            T result = resolver.get();
            return Optional.ofNullable(result);
        } catch (NullPointerException | IndexOutOfBoundsException | IllegalArgumentException ignored) {
            // 大部分是对象是需要联处理, 所以要处理NullPointerException，其他的业务异常要忽略
            // 其他白名单Exception：IndexOutOfBoundsException（list可能数组越界）
            // 各种格式转化异常包含在IllegalArgumentException例如, NumberFormatException
            return Optional.empty();
        }
    }
}
