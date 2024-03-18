package com.tiandtech.excel.core;
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import com.alibaba.excel.metadata.Head;
import com.alibaba.excel.metadata.data.WriteCellData;
import com.alibaba.excel.write.metadata.holder.WriteSheetHolder;
import com.alibaba.excel.write.style.column.AbstractColumnWidthStyleStrategy;
import com.tiandtech.base.utils.Getter;
import org.apache.poi.ss.usermodel.Cell;

import java.util.List;

public class ColumnWidthStrategy extends AbstractColumnWidthStyleStrategy {

    private static final int MAX_COLUMN_WIDTH = 512 * 40; //约34个字

    public ColumnWidthStrategy() {
    }

    protected void setColumnWidth(WriteSheetHolder writeSheetHolder, List<WriteCellData<?>> cellDataList, Cell cell,
                                  Head head, Integer relativeRowIndex, Boolean isHead) {
        int width = writeSheetHolder.getSheet().getColumnWidth(cell.getColumnIndex());


        //大于10列默认6个字，否则用20个字
        Integer columns = Getter.get(() -> writeSheetHolder.getExcelWriteHeadProperty().getHeadMap().size()).orElse(10);
        int defaultWidth = columns > 10 ? 512 * 8 : 512 * 12;

        if (isHead) {
            if (width < defaultWidth) {
                writeSheetHolder.getSheet().setColumnWidth(cell.getColumnIndex(), defaultWidth);
            }
        }
        if (width > MAX_COLUMN_WIDTH) {
            writeSheetHolder.getSheet().setColumnWidth(cell.getColumnIndex(), MAX_COLUMN_WIDTH);
        }
    }
}
