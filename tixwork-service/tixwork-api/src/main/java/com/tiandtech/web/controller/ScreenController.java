package com.tiandtech.web.controller;

import com.tiandtech.base.domain.dto.ChartSlot;
import com.tiandtech.base.domain.dto.ChartSlot.SlotType;
import com.tiandtech.base.utils.NameUtils;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.exception.BizException;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.reflect.ReflectUtils;
import com.tiandtech.idempotent.RepeatSubmit;
import com.tiandtech.log.Log;
import com.tiandtech.log.enums.BusinessType;
import com.tiandtech.web.core.BaseController;
import com.tiandtech.web.service.ScreenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;

/**
 * 大屏控制 请求
 */
@RestController()
@RequestMapping("/screen")
public class ScreenController extends BaseController {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 小心使用，存在非法调用风险
     *
     * @param bean bean的名称，必须继承自ScreenService
     * @param slot 方法名称，必须是public方法
     */
    @GetMapping("/{bean}/{slot}")
    @Log(title = "函件模版", businessType = BusinessType.UPDATE)
    @RepeatSubmit(interval = 1000)
    public WebResult dispatcher(@PathVariable String bean, @PathVariable String slot) {
        try {
            // 1.或者{bean}Service对应的实例，强制拼接Service。
            String beanName = NameUtils.toCamelCase(bean) + "Service";
            var serviceBean = SpringUtils.getBean(beanName);
            if (!(serviceBean instanceof ScreenService)) {
                throw new BizException("请求的大屏数据不存在");
            }
            // 2.获取{slot}对应的Public方法，这里只应该获取public方法
            Method method = ReflectUtils.getPublicMethod(serviceBean.getClass(), slot);
            if (method == null) {
                throw new BizException("请求的大屏数据不存在");
            }
            var result = ReflectUtils.invoke(serviceBean, slot);
            return WebResult.success(result);
        } catch (Exception e) {
            logger.info("获取slot信息异常", e);
        }
        return WebResult.success(new ChartSlot(SlotType.NOT_SUPPORT));
    }
}
