const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const pdfParse = require('pdf-parse');

async function readPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

function readTXT(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet, { header: 1 });
}

function limparDownloads(folder) {
  if (!fs.existsSync(folder)) return;
  const files = fs.readdirSync(folder);
  files.forEach(file => {
    const filePath = path.join(folder, file);
    if (fs.lstatSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    }
  });
}

function findDownloadedFile({ folder, extension }) {
  const dir = path.isAbsolute(folder) ? folder : path.join(__dirname, folder);
  if (!fs.existsSync(dir)) {
    throw new Error(`Folder not found: ${dir}`);
  }
  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith(extension.toLowerCase()));
  if (files.length === 0) {
    throw new Error(`No files with extension ${extension} found in folder ${dir}`);
  }
  const sortedFiles = files
    .map(f => ({ name: f, time: fs.statSync(path.join(dir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);
  return sortedFiles[0].name;
}

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: './cypress/support/e2e.js',
    downloadsFolder: 'cypress/downloads',
    
    env: {
      TAGS: 'not @ignore', // Permite filtrar cenários por tag
      stepDefinitions: 'cypress/e2e/step_definitions/**/*.js',
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      const bundler = webpack({
        webpackOptions: {
          resolve: {
            extensions: ['.js'],
            alias: {
              '@pages': path.resolve(__dirname, 'cypress/support/pages'),
            },
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
              },
              {
                test: /\.feature$/,
                use: [
                  {
                    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                    options: config,
                  },
                ],
              },
            ],
          },
        },
      });

      on('file:preprocessor', bundler);

      on('task', {
        readPDF,
        readTXT,
        readExcel,
        limparDownloads() {
          const downloadsFolder = config.downloadsFolder || path.join(__dirname, 'cypress/downloads');
          limparDownloads(downloadsFolder);
          return null;
        },
        findDownloadedFile(args) {
          return findDownloadedFile(args);
        },
      });

      return config;
    },
  },
});
