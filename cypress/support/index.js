const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const XLSX = require('xlsx'); 

const readPDF = (pathToPdf) => {
  return new Promise((resolve) => {
    const pdfPath = path.resolve(pathToPdf);
    const pdfData = fs.readFileSync(pdfPath);
    pdf(pdfData).then(({ text }) => resolve(text));
  });
};

const readTXT = (pathToTxt) => {
  return new Promise((resolve) => {
    const txtPath = path.resolve(pathToTxt);
    const txtData = fs.readFileSync(txtPath, 'utf-8');
    resolve(txtData);
  });
};

const readExcel = (pathToExcel) => {
  return new Promise((resolve, reject) => {
    try {
      const excelPath = path.resolve(pathToExcel);
      const fileBuffer = fs.readFileSync(excelPath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // lê como array de arrays
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { readPDF, readTXT, readExcel };