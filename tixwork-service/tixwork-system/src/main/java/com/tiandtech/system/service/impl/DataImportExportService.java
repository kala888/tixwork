package com.tiandtech.system.service.impl;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.json.JSONUtil;
import com.alibaba.excel.EasyExcel;
import com.tiandtech.base.enums.ImportExportType;
import com.tiandtech.core.domain.model.LoginUser;
import com.tiandtech.core.exception.BizException;
import com.tiandtech.core.exception.ServiceException;
import com.tiandtech.excel.core.DataImportListener;
import com.tiandtech.excel.core.ExcelResult;
import com.tiandtech.excel.utils.ExcelUtil;
import com.tiandtech.mybatis.core.domain.BaseEntity;
import com.tiandtech.mybatis.core.service.BaseService;
import com.tiandtech.satoken.LoginHelper;
import com.tiandtech.system.domain.bo.SysImportExportRecordBo;
import com.tiandtech.system.domain.vo.SysImportExportRecordVo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataImportExportService {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final SysImportExportRecordService importExportRecordService;

    private String getMd5(MultipartFile file) {
        if (file == null) {
            return null;
        }
        try {
            return SecureUtil.md5(file.getInputStream());
        } catch (IOException e) {
            throw new ServiceException("文件损坏，MD5计算失败");
        }
    }

    @Transactional
    public <T extends BaseEntity> void exportData(List<T> list, Class<T> clz, String sheetName, HttpServletResponse response) {
        String fileName = ExcelUtil.exportExcel(list, sheetName, clz, response);
        SysImportExportRecordBo record = new SysImportExportRecordBo();
        record.setType(ImportExportType.EXPORT);
        record.setFileName(fileName);
        String result = StrUtil.format("导出【{}】记录{}条,条件:{}", sheetName, list.size(), "指定数据集");
        record.setResult(result);
        saveFileRecord(record);
    }

    @Transactional
    public <T extends BaseEntity> void exportData(T entity, Class<T> clz, String sheetName, BaseService service, HttpServletResponse response) {
        if (entity == null) {
            logger.warn("导入条件不能为空");
            return;
        }
        long total = service.count(entity);
        if (total > 4000) {
            throw new BizException("导出的数据太多了，最多支持4000条，请调整筛选条件");
        }
        List<T> list = service.list(entity);
        String fileName = ExcelUtil.exportExcel(list, sheetName, clz, response);
        SysImportExportRecordBo record = new SysImportExportRecordBo();
        record.setType(ImportExportType.EXPORT);
        record.setFileName(fileName);
        String result = StrUtil.format("导出【{}】记录{}条,条件:{}", sheetName, list.size(), JSONUtil.toJsonStr(entity));
        record.setResult(result);
        saveFileRecord(record);
    }

    protected void saveFileRecord(SysImportExportRecordBo record) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        record.setOperationUser(loginUser.getUserName());
        record.setOperationUserId(loginUser.getUserId());
        importExportRecordService.save(record);
    }

    @Transactional
    public <T> ExcelResult<T> importData(MultipartFile file, Class<T> clz, BaseService service) {
        String md5 = getMd5(file);
        SysImportExportRecordVo imported = importExportRecordService.getImportedRecord(md5);
        if (imported != null) {
            String msg = StrUtil.format(
                "出错原因：文件重复。\nTips：该文件在系统中存在导入记录，由于系统安全性原因，不容许重复操作，请仔细检查并修改。\n操作人： {}，操作时间： {}",
                DateUtil.formatDateTime(imported.getCreateTime()), imported.getOperationUser());
            throw new ServiceException(msg);
        }
        DataImportListener<T> listener = new DataImportListener<>();
        try {
            EasyExcel.read(file.getInputStream())
                .registerReadListener(listener)
                .headRowNumber(2)
                .head(clz)
                .autoCloseStream(false)
                .sheet()
                .doReadSync();
        } catch (IOException e) {
            throw new ServiceException("导入失败，文件可能损坏");
        }
        ExcelResult<T> result = listener.getExcelResult();
        if (result.getErrorList().size() == 0) {
            service.saveBatch(result.getList());

            // 保存记录
            SysImportExportRecordBo record = new SysImportExportRecordBo();
            record.setType(ImportExportType.IMPORT);
            record.setFileMd5(md5);
            record.setFileName(file.getOriginalFilename());
            record.setResult(result.getSummary());
            saveFileRecord(record);
        }
        return result;
    }
}
