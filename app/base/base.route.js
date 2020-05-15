/* eslint-disable import/no-dynamic-require,global-require */
/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 3/19/19
 * Time: 6:25 PM
 */
const fs = require('fs');
const path = require('path');
const router = require('express').Router();


// Export all module routes
const modulesPath = path.resolve('app/modules');

fs.readdirSync(modulesPath).forEach((dir) => {

  if (!fs.statSync(`${modulesPath}/${dir}`).isDirectory()) return;

  const modelPath = `${modulesPath}/${dir}/${dir}.route.js`;

  // add all module route to router middleware using folder name route path
  if (fs.existsSync(modelPath)) {
    router.use(`/${dir}`, require(`${modulesPath}/${dir}/${dir}.route`))
  }
});

module.exports = router;
