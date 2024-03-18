package com.tiandtech.system.service.impl;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tiandtech.core.constant.CacheNames;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.core.service.OssService;
import com.tiandtech.core.utils.MapstructUtils;
import com.tiandtech.core.utils.SpringUtils;
import com.tiandtech.core.utils.StringUtils;
import com.tiandtech.core.utils.file.FileUtils;
import com.tiandtech.mybatis.core.page.PageQuery;
import com.tiandtech.oss.client.AccessPolicyType;
import com.tiandtech.oss.client.OssClient;
import com.tiandtech.oss.client.OssFactory;
import com.tiandtech.oss.client.UploadResult;
import com.tiandtech.system.domain.SysOssObject;
import com.tiandtech.system.domain.bo.SysOssObjectBo;
import com.tiandtech.system.domain.vo.SysOssObjectVo;
import com.tiandtech.system.mapper.SysOssObjectMapper;
import com.tiandtech.system.service.SysOssService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 文件上传 服务层实现
 */
@RequiredArgsConstructor
@Service
public class SysOssServiceImpl implements SysOssService, OssService {

    private final SysOssObjectMapper baseMapper;

    @Override
    public Page<SysOssObjectVo> listByPage(SysOssObjectBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<SysOssObject> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoPage(pageQuery.build(), lqw);
//        Page<SysOssVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
//        List<SysOssVo> filterResult = StreamUtils.toList(result.getRecords(), this::matchingUrl);
    }

    @Override
    public List<SysOssObjectVo> listByIds(Collection<Long> ossIds) {
        List<SysOssObjectVo> list = new ArrayList<>();
        for (Long id : ossIds) {
            SysOssObjectVo vo = SpringUtils.getAopProxy(this).getById(id);
            if (ObjectUtil.isNotNull(vo)) {
                list.add(this.matchingUrl(vo));
            }
        }
        return list;
    }

    @Override
    public String selectUrlByIds(String ossIds) {
        List<String> list = new ArrayList<>();
        for (Long id : StringUtils.splitTo(ossIds, Convert::toLong)) {
            SysOssObjectVo vo = SpringUtils.getAopProxy(this).getById(id);
            if (ObjectUtil.isNotNull(vo)) {
                list.add(this.matchingUrl(vo).getUrl());
            }
        }
        return String.join(StringUtils.SEPARATOR, list);
    }

    private LambdaQueryWrapper<SysOssObject> buildQueryWrapper(SysOssObjectBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<SysOssObject> lqw = Wrappers.lambdaQuery();
        lqw.like(StringUtils.isNotBlank(bo.getFileName()), SysOssObject::getFileName, bo.getFileName());
        lqw.like(StringUtils.isNotBlank(bo.getOriginalName()), SysOssObject::getOriginalName, bo.getOriginalName());
        lqw.eq(StringUtils.isNotBlank(bo.getFileSuffix()), SysOssObject::getFileSuffix, bo.getFileSuffix());
        lqw.eq(StringUtils.isNotBlank(bo.getUrl()), SysOssObject::getUrl, bo.getUrl());
        lqw.between(params.get("beginCreateTime") != null && params.get("endCreateTime") != null,
            SysOssObject::getCreateTime, params.get("beginCreateTime"), params.get("endCreateTime"));
        lqw.eq(ObjectUtil.isNotNull(bo.getCreateBy()), SysOssObject::getCreateBy, bo.getCreateBy());
        lqw.eq(StringUtils.isNotBlank(bo.getService()), SysOssObject::getService, bo.getService());
        return lqw;
    }

    @Cacheable(cacheNames = CacheNames.SYS_OSS, key = "#ossId")
    @Override
    public SysOssObjectVo getById(Long ossId) {
        return baseMapper.selectVoById(ossId);
    }

    @Override
    public void download(Long ossId, HttpServletResponse response) throws IOException {
        SysOssObjectVo sysOss = SpringUtils.getAopProxy(this).getById(ossId);
        if (ObjectUtil.isNull(sysOss)) {
            throw new ServiceException("文件数据不存在!");
        }
        FileUtils.setAttachmentResponseHeader(response, sysOss.getOriginalName());
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE + "; charset=UTF-8");
        OssClient storage = OssFactory.instance(sysOss.getService());
        try (InputStream inputStream = storage.getObjectContent(sysOss.getUrl())) {
            int available = inputStream.available();
            IoUtil.copy(inputStream, response.getOutputStream(), available);
            response.setContentLength(available);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    @Override
    public SysOssObjectVo upload(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String suffix = StringUtils.substring(originalFilename, originalFilename.lastIndexOf("."), originalFilename.length());
        OssClient storage = OssFactory.instance();
        UploadResult uploadResult;
        try {
            uploadResult = storage.uploadByName(file.getBytes(), originalFilename, file.getContentType());
//            uploadResult = storage.uploadSuffix(file.getBytes(), suffix, file.getContentType());
        } catch (IOException e) {
            throw new ServiceException(e.getMessage());
        }
        // 保存文件信息
        return buildResultEntity(originalFilename, suffix, storage.getConfigKey(), uploadResult);
    }

//    @Override
//    public SysOssVo upload(File file) {
//        String originalFilename = file.getName();
//        String suffix = StringUtils.substring(originalFilename, originalFilename.lastIndexOf("."), originalFilename.length());
//        OssClient storage = OssFactory.instance();
//        UploadResult uploadResult = storage.uploadSuffix(file, suffix);
//        // 保存文件信息
//        return buildResultEntity(originalFilename, suffix, storage.getConfigKey(), uploadResult);
//    }

    @NotNull
    private SysOssObjectVo buildResultEntity(String originalfileName, String suffix, String configKey, UploadResult uploadResult) {
        SysOssObject oss = new SysOssObject();
        oss.setUrl(uploadResult.getUrl());
        oss.setFileSuffix(suffix);
        oss.setFileName(uploadResult.getFilename());
        oss.setOriginalName(originalfileName);
        oss.setService(configKey);
        baseMapper.insert(oss);
        SysOssObjectVo sysOssVo = MapstructUtils.convert(oss, SysOssObjectVo.class);
        return this.matchingUrl(sysOssVo);
    }

    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if (isValid) {
            // 做一些业务上的校验,判断是否需要校验
        }
        List<SysOssObject> list = baseMapper.selectBatchIds(ids);
        for (SysOssObject sysOss : list) {
            OssClient storage = OssFactory.instance(sysOss.getService());
            storage.delete(sysOss.getUrl());
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }

    /**
     * 匹配Url
     *
     * @param oss OSS对象
     * @return oss 匹配Url的OSS对象
     */
    private SysOssObjectVo matchingUrl(SysOssObjectVo oss) {
        OssClient storage = OssFactory.instance(oss.getService());
        // 仅修改桶类型为 private 的URL，临时URL时长为120s
        if (AccessPolicyType.PRIVATE == storage.getAccessPolicy()) {
            oss.setUrl(storage.getPrivateUrl(oss.getFileName(), 120));
        }
        return oss;
    }
}
