(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService','app'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService,app) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
                          
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { returnCode: 0, sessionToken: 'sessionToken' };
                        } else {
                            response = { returnCode: -1, reason: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }, 1000);
             ----------------------------------------------*/
            /* Use this for real authentication
                          ----------------------------------------------*/
            $http.post(app.SERVER+':'+app.PORT+ '/api/rest/json/login/login', { email: username, password: password })
                .success(function (response) {
                    callback(response);
                });

        }

        function SetCredentials(username, sessionToken) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    sessionToken: sessionToken
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        }
    }
})();