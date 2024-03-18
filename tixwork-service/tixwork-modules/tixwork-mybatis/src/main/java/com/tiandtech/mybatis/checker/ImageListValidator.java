package com.tiandtech.mybatis.checker;

import cn.hutool.core.collection.CollectionUtil;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

/**
 * 验证手机号 Pattern.compile("(?:0|86|\\+86)?1[3-9]\\d{9}");
 */
public class ImageListValidator implements ConstraintValidator<ImageListChecker, List<String>> {

    private int max;

    @Override
    public void initialize(ImageListChecker checker) {
        this.max = checker.max();
    }

    @Override
    public boolean isValid(List<String> imageList, ConstraintValidatorContext constraintValidatorContext) {
        if (CollectionUtil.isEmpty(imageList)) {
            return true;
        }
        return imageList.size() <= max;
//        文件格式众多，就不判断了，有需要再说
    }
}
