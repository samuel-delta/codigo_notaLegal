const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const path = require('path');
const fs = require('fs');
const { readPDF, readTXT, readExcel } = require('./cypress/support/index.js');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: './cypress/support/e2e.js',

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
        deleteDownloads() {
        const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
        fs.readdirSync(downloadsFolder).forEach(file => {
          fs.unlinkSync(path.join(downloadsFolder, file));
        });
        return null;
        },
      });

      config.env.stepDefinitions = 'cypress/e2e/step_definitions/**/*.js';

      return config;
    },
  },
});
