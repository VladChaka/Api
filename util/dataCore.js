let Core = require("../repository/core").Core;
    modules = Core.module('app');

module.exports.Core = Core;

require("../repository/User");
require("../Servise/DataServise");

modules.run();
let user = modules.get('app.userRepository'),
    dataServise = modules.get('app.dataServise');

module.exports = { dataServise: dataServise, userRepository: user };