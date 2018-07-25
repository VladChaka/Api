let Core = require("../repository/core").Core;
    modules = Core.module('app');

module.exports.Core = Core;

require("../repository/User");
require("../Servise/DataServise");

modules.run();
let User = modules.get('app.repository.User'),
    dataServise = modules.get('app.Servise.DataServise');

module.exports = { dataServise: dataServise, User: User };