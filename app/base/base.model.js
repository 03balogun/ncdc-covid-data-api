/* eslint-disable import/no-dynamic-require,global-require */
const fs = require('fs');

// Export all module models
const models = {};
const modulesPath = './app/modules';

// read all models in the modules folder
fs.readdirSync(modulesPath).forEach((dir) => {

  if (!fs.statSync(`${modulesPath}/${dir}`).isDirectory()) return;

  const modelPath = `.${modulesPath}/${dir}/${dir}.model.js`;

  if (fs.existsSync(modelPath)) {
    models[dir.replace('-', '')] = require(`${modelPath}`);
  }

});

module.exports = models;
