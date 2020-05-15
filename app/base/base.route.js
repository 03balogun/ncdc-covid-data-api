/* eslint-disable import/no-dynamic-require,global-require */
const fs = require('fs');
const router = require('express').Router();


// Export all module routes
const modulesPath = './app/modules';

fs.readdirSync(modulesPath).forEach((dir) => {

  if (!fs.statSync(`${modulesPath}/${dir}`).isDirectory()) return;

  const modelPath = `${modulesPath}/${dir}/${dir}.route.js`;

  // add all module route to router middleware using folder name route path
  if (fs.existsSync(modelPath)) {
    router.use(`/${dir}`, require(`../modules/${dir}/${dir}.route`))
  }
});

module.exports = router;
