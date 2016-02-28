(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService','app','exception','logger','AccessToken'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService,app,exception,logger,AccessToken) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.ValidateRegistrationCode=ValidateRegistrationCode;
        service.GetExternalUserProfile= GetExternalUserProfile;

        return service;
        ///////////////////////////////////////////////////////////////////////

        function GetExternalUserProfile(){
            var url="https://www.googleapis.com/plus/v1/people/me";
            return $http.get(url).then(function(profile){
                SetCredentials(profile.data.emails[0].value,null);
                return profile;
            })
        }
        function ValidateRegistrationCode(email,code){
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/confirm',
                data:  JSON.stringify({ email: email, registrationConfirmationCode: code }),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });

        }

        function Login(username, password, callback) {

            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/login/login',
                data:  JSON.stringify({ email: username, password: password }),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });

        }

        function SetCredentials(username, sessionToken) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    sessionToken: sessionToken
                }
            };
            UserService.GetUserProfile()
            .then(function(response){
            	$rootScope.globals.metaqrcodeUser=response;
            },function (jqXHR, textStatus, errorThrown) {
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
            	} else {
                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
            	}
            }); 
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            AccessToken.destroy();
        }
        
        function checkBearer(xhr) {
        	if (AccessToken.get()!=null && AccessToken.get().access_token!=null) {
        		xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
        	}
        }
        
        function handleSuccess(response, textStatus, jqXHR) {
            if(response) {
                if (response.returnCode >= 0) {
                    return response;
                }
                else {

                    logger.error('Error code: ' + response.reason);
                    return exception.catcher(response.returnCode);
                }
            }
            return logger.error(response);
        }

        function handleError(jqXHR, textStatus, errorThrown) {
        	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                return exception.catcher("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
        	} else {
                return exception.catcher(textStatus + " : " + errorThrown.toLocaleString());
        	}
        }

    }
})();