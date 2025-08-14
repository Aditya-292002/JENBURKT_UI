import { Injectable } from '@angular/core';
// import * as ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver';
import ExcelJS from 'exceljs/dist/exceljs';
@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

async exportAsExcelFile(
  data: any[],
  fileName: string,
  lockedColumns: string[],        // 👈 Columns to lock by key (e.g., ['ProductCode', 'Rate'])
  sheetPassword: string = '12345'      // 👈 Sheet protection password
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('SAMPLE_DATA');

  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Define worksheet columns from object keys
  const columns = Object.keys(data[0]).map(key => ({
    header: key,
    key: key,
    width: 20
  }));
  worksheet.columns = columns;

  // Add data rows
  data.forEach(row => {
    worksheet.addRow(row);
  });

  // Unlock all cells first
  worksheet.eachRow(row => {
    row.eachCell(cell => {
      cell.protection = { locked: false };
    });
  });

  // Lock only specified columns
  worksheet.eachRow(row => {
    row.eachCell((cell, colNumber) => {
      const columnKey = worksheet.getColumn(colNumber).key as string;
      if (lockedColumns.includes(columnKey)) {
        cell.protection = { locked: true };
      }
      
    });
  });
  worksheet.autoFilter = {
  from: { row: 1, column: 1 },
  to: { row: 1, column: worksheet.columnCount }
};

  // Enable worksheet protection
  await worksheet.protect(sheetPassword, {
    selectLockedCells: true,
    selectUnlockedCells: true,
    autoFilter: true,            
    sort: true,                     
    formatCells: false  
  });

  // Generate Excel file buffer and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  FileSaver.saveAs(blob, `${fileName}_${new Date().getTime()}.xlsx`);
}
}