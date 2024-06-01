const path = require('path');
const express = require("express");

const { sequelize, createDatabase } = require('./core/sequelize');
const Models = require('./models');
createDatabase(sequelize);

const useHelpers = require("./core/helpers");
const useRouters = require("./core/routers");
const useSessions = require("./core/routers");

exports.bootstrapApp = function(app) {
  app.locals.app_path = path.join(__dirname, '..');
  app.locals.public_path = path.join(app.locals.app_path, "/public");
  app.locals.views_path = path.join(app.locals.app_path, "/views");
  app.locals.includes_path = path.join(app.locals.views_path, "/includes");

  
  app.use(express.static(app.locals.public_path));
  app.set("view engine", "ejs");
  app.set("views", [
    app.locals.views_path,
    app.locals.includes_path
  ]);
  
  useHelpers(app);
  useRouters(app);
  useSessions(app);
}