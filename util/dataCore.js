let Core = require("../repository/core").Core;
    modules = Core.module('app');

module.exports.Core = Core;

require("../repository/User");
require("../Servise/UserDataServise");
require("../Servise/LibraryDataServise");

modules.run();

module.exports = { 
    userDataServise: modules.get('app.userDataServise'),
    userRepository: modules.get('app.userRepository'),
    LibraryDataServise: modules.get('app.libraryDataServise')
};