(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService','app','exception','logger'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService,app,exception,logger) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.ValidateRegistrationCode=ValidateRegistrationCode;

        return service;
        ///////////////////////////////////////////////////////////////////////

        function ValidateRegistrationCode(email,code){
            return $http.post(app.SERVER+':'+app.PORT+ '/api/rest/json/registration/confirm', { email: email, registrationConfirmationCode: code })
                .then(success)
                .catch(fail);
            function success(response) {
                if (response.data.returnCode < 0) {
                    logger.error('Failed validation with code: ' + response.data.returnCode);}
                return response;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for validation code')(e);
            }
        }

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
                          ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response ={data: { returnCode: 0, sessionToken: 'sessionToken' }};
                        } else {
                            response = {data:{ returnCode: -1, reason: 'Username or password is incorrect' }};
                        }
                        callback(response);
                    });
            }, 1000);

            /* Use this for real authentication
                          
             $http.post(app.SERVER+':'+app.PORT+ '/api/rest/json/login/login', { email: username, password: password })
                 .then(function (response) {
                     callback(response);
                 }).catch(function(e){
             return exception.catcher('XHR Failed for Login')(e);
             });
             ----------------------------------------------*/
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