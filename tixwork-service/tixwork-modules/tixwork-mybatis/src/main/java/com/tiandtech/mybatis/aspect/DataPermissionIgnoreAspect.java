package com.tiandtech.mybatis.aspect;

import com.tiandtech.mybatis.helper.DataPermissionHelper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DataPermissionIgnoreAspect {

    @Around("@annotation(com.tiandtech.mybatis.annotation.DataPermissionIgnore)")
    public Object handleDataPermissionIgnore(ProceedingJoinPoint joinPoint) {
        // 执行原始方法调用
        return DataPermissionHelper.ignore(() -> {
            try {
                return joinPoint.proceed();
            } catch (Throwable e) {
                throw new RuntimeException(e);
            }
        });
    }
}
