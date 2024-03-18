package com.tiandtech.security;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpStatus;
import com.tiandtech.core.config.TixworkConfig;
import com.tiandtech.core.domain.WebResult;
import com.tiandtech.core.exception.BizException;
import com.tiandtech.core.exception.DemoModeException;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.exception.base.BaseException;
import com.tiandtech.core.utils.StreamUtils;
import com.tiandtech.core.utils.ToAdmin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.sql.SQLException;
import java.util.Map;

/**
 * 全局异常处理器
 */
@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
@ControllerAdvice
public class GlobalExceptionHandler {

    private final TixworkConfig config;

    private void tellAdminThereIsAnError(String type, String url, Exception e) {
        String title = StrUtil.format("{}, 发生{}异常.", config.getName(), type);
        String content = StrUtil.format("请求：{} \n {}.", url, e.getMessage());
        ToAdmin.say(title, content);
    }

    /**
     * 权限码异常
     */
    @ExceptionHandler(NotPermissionException.class)
    public WebResult<Void> handleNotPermissionException(NotPermissionException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',权限码校验失败'{}'", requestURI, e.getMessage());
        return WebResult.error(HttpStatus.HTTP_FORBIDDEN, "没有访问权限，请联系管理员授权");
    }

    /**
     * 角色权限异常
     */
    @ExceptionHandler(NotRoleException.class)
    public WebResult<Void> handleNotRoleException(NotRoleException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',角色权限校验失败'{}'", requestURI, e.getMessage());
        return WebResult.error(HttpStatus.HTTP_FORBIDDEN, "没有访问权限，请联系管理员授权");
    }

    /**
     * 认证失败
     */
    @ExceptionHandler(NotLoginException.class)
    public WebResult<Void> handleNotLoginException(NotLoginException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',认证失败'{}',无法访问系统资源", requestURI, e);
        return WebResult.error(HttpStatus.HTTP_UNAUTHORIZED, "认证失败，无法访问系统资源");
    }

    /**
     * 请求方式不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public WebResult<Void> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',不支持'{}'请求", requestURI, e.getMethod());
        return WebResult.error(e.getMessage());
    }

    /**
     * 业务异常
     */
    @ExceptionHandler(ServiceException.class)
    public WebResult<Void> handleServiceException(ServiceException e, HttpServletRequest request) {
        log.error(e.getMessage());
        Integer code = e.getCode();
        return ObjectUtil.isNotNull(code) ? WebResult.error(code, e.getMessage()) : WebResult.error(e.getMessage());
    }

    /**
     * BizException
     */
    @ExceptionHandler(BizException.class)
    public WebResult<Void> handleBizException(BizException e, HttpServletRequest request) {
        log.error(e.getMessage());
        return WebResult.error(e.getMessage());
    }

    @ExceptionHandler(BaseException.class)
    public WebResult<Void> handleBaseException(BaseException e, HttpServletRequest request) {
        log.error(e.getMessage());
        return WebResult.error(e.getMessage());
    }


    /**
     * 请求路径中缺少必需的路径变量
     */
    @ExceptionHandler(MissingPathVariableException.class)
    public WebResult<Void> handleMissingPathVariableException(MissingPathVariableException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求路径中缺少必需的路径变量'{}',发生系统异常.", requestURI);
        return WebResult.error(String.format("请求路径中缺少必需的路径变量[%s]", e.getVariableName()));
    }

    /**
     * 请求参数类型不匹配
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public WebResult<Void> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求参数类型不匹配'{}',发生系统异常.", requestURI);
        return WebResult.error(
            String.format("请求参数类型不匹配，参数[%s]要求类型为：'%s'，但输入值为：'%s'", e.getName(), e.getRequiredType().getName(),
                e.getValue()));
    }

    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(SQLException.class)
    public WebResult<Void> handleSQLException(SQLException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',发生未知异常.", requestURI, e);
        tellAdminThereIsAnError("SQL异常", requestURI, e);
        return WebResult.error(e.getMessage());
    }


    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    public WebResult<Void> handleRuntimeException(RuntimeException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',发生未知异常.", requestURI, e);
        return WebResult.error("系统运行时刻异常，稍后再试。");
    }

    /**
     * 系统异常
     */
    @ExceptionHandler(Exception.class)
    public WebResult<Void> handleException(Exception e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',发生系统异常.", requestURI);
        return WebResult.error(e.getMessage());
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(BindException.class)
    public WebResult<Void> handleBindException(BindException e) {
        log.error(e.getMessage());
        String message = StreamUtils.join(e.getAllErrors(), DefaultMessageSourceResolvable::getDefaultMessage, ", ");
        return WebResult.error(message);
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public WebResult<Void> constraintViolationException(ConstraintViolationException e) {
        log.error(e.getMessage());
        String message = StreamUtils.join(e.getConstraintViolations(), ConstraintViolation::getMessage, ", ");
        return WebResult.error(message);
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public WebResult<Void> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage());
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        return WebResult.error(message);
    }

    /**
     * 演示模式异常
     */
    @ExceptionHandler(DemoModeException.class)
    public WebResult<Void> handleDemoModeException(DemoModeException e) {
        return WebResult.error("演示模式，不允许操作");
    }

    /**
     * 404 异常
     */
    @ResponseStatus(org.springframework.http.HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoHandlerFoundException.class)
    public WebResult errorHandler(HttpServletRequest request) {
        Map data = MapUtil.builder()
            .put("msg", "请求地址不存在")
            .put("path11", request.getRequestURI())
            .put("method", request.getMethod())
            .build();
        return WebResult.error(HttpStatus.HTTP_NOT_FOUND, "请求地址不存在", data);
    }
}
