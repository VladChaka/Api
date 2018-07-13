require.config({
    baseUrl: "js",
    paths: {
        'domReady': '../node_modules/requirejs-domready/domReady',
        'angular': '../node_modules/angular/angular.min',
        'angularResource': '../node_modules/angular-resource/angular-resource',
        'usersController': 'controllers/usersController',
        'usersService': 'services/usersService',
        'tokenService': 'services/tokenService',
        'authenticationService': 'services/authenticationService',
        'remoteService': 'remoteservices/remoteService',
        'reverseFilter': 'filters/reverseFilter',
        'startFromFilter': 'filters/startFromFilter',
        'authorizationFormComponent': 'components/authorizationFormComponent',
        'formAddUserComponent': 'components/formAddUserComponent',
        'profileControlPanelComponent': 'components/profileControlPanelComponent',
        'userProfileComponent': 'components/userProfileComponent',
        'mainPageDirective': 'directives/mainPageDirective',
        'telValidationDirective': 'directives/telValidationDirective',
        'loginValidationDirective': 'directives/loginValidationDirective',
        'nameValidationDirective': 'directives/nameValidationDirective',
        'strongPassRequiredDirective': 'directives/strongPassRequiredDirective',
        'app': 'app'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularResource': {
            deps: ['angular']
        },
        'app': {
            deps: ['angular', 'usersController', 'authorizationFormComponent', 'formAddUserComponent', 'profileControlPanelComponent', 'userProfileComponent', 'mainPageDirective'],
        },
        'usersController': {
            deps: ['angular', 'usersService', 'authenticationService', 'tokenService', 'startFromFilter', 'reverseFilter', 'telValidationDirective', 'nameValidationDirective', 'loginValidationDirective', 'strongPassRequiredDirective']
        },
        'usersService': {
            deps: ['angular', 'remoteService', 'tokenService']
        },
        'remoteService':{
            deps: ['angularResource']
        },
        'tokenService':{
            deps: ['angular']
        },
        'authenticationService':{
            deps: ['remoteService']
        },
        'startFromFilter':{
            deps: ['angular']
        },
        'reverseFilter':{
            deps: ['angular']
        },
        'authorizationFormComponent':{
            deps: ['angular', 'usersController']
        },
        'formAddUserComponent':{
            deps: ['angular', 'usersController']
        },
        'profileControlPanelComponent':{
            deps: ['angular', 'usersController']
        },
        'userProfileComponent':{
            deps: ['angular', 'usersController']
        },
        'mainPageDirective':{
            deps: ['angular', 'usersController']
        },
        'telValidationDirective':{
            deps: ['angular']
        },
        'loginValidationDirective':{
            deps: ['angular']
        },
        'nameValidationDirective':{
            deps: ['angular']
        },
        'strongPassRequiredDirective':{
            deps: ['angular']
        }
    }
});

require(['app'], function() {
    angular.bootstrap(document, ['app']);
});