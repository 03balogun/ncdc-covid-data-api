/* eslint-disable import/no-dynamic-require,global-require */
const fs = require('fs');
const path = require('path');

// Export all module models
const models = {};
const modulesPath = path.resolve('app/modules');

// read all models in the modules folder
fs.readdirSync(modulesPath).forEach((dir) => {

  if (!fs.statSync(`${modulesPath}/${dir}`).isDirectory()) return;

  const modelPath = `${modulesPath}/${dir}/${dir}.model.js`;

  if (fs.existsSync(modelPath)) {
    models[dir.replace('-', '')] = require(`${modulesPath}/${dir}/${dir}.model`);
  }

});

module.exports = models;
