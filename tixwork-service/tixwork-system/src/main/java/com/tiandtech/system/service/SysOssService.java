package com.tiandtech.system.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.system.domain.bo.SysOssObjectBo;
import com.tiandtech.system.domain.vo.SysOssObjectVo;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

/**
 * 文件上传 服务层
 */
public interface SysOssService {

    Page<SysOssObjectVo> listByPage(SysOssObjectBo sysOss, PageQuery pageQuery);

    List<SysOssObjectVo> listByIds(Collection<Long> ossIds);

    SysOssObjectVo getById(Long ossId);

    SysOssObjectVo upload(MultipartFile file);

//    SysOssVo upload(File file);

    void download(Long ossId, HttpServletResponse response) throws IOException;

    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);

}
