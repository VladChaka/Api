define(function () {
    angular.module('usersApp').component('authorizationForm', {
        template: '<form class="users-login"\n' +
        '          id="auth">\n' +
        '        <p>Login</p>\n' +
        '        <input type="text"\n' +
        '               ng-model="uc.authenticationLogin"\n' +
        '               placeholder="Enter your login">\n' +
        '        <p>Password</p>\n' +
        '        <input type="password"\n' +
        '               ng-model="uc.authenticationPass"\n' +
        '               placeholder="Enter your pass">\n' +
        '        <button ng-click="uc.authenticationSubmit()">\n' +
        '            {{uc.btnText}}\n' +
        '        </button>\n' +
        '    </form>',
        controllerAs: 'uc',
        bindings: {
            btnText: '@',
            authenticationLogin: '=',
            authenticationPass: '=',
            authenticationSubmit: '&'
        }
    });
});
