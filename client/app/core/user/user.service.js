(function () {
    'use strict';

    angular
        .module('metaqrcodeApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q','exception','$http','app','$rootScope','AccessToken'];
    function UserService($timeout, $filter, $q,exception,$http,app,$rootScope,AccessToken) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.ValidateRegistrationCode=ValidateRegistrationCode;
        service.ExistUser=ExistUser;
        service.GetUserProfile=GetUserProfile;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUser());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUser(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUser(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function ExistUser(email) {
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/exists',
                data: JSON.stringify({ email:email}),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function ValidateRegistrationCode(email,code) {
            var request={email:email,registrationConfirmationCode:code};
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/confirm',
                data: JSON.stringify(request),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }

        function Create(user) {
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/prepare',
                data: JSON.stringify(user),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }

        function Update(user) {
        	var userUpdated = new Object();
        	userUpdated.email = user.email;
        	userUpdated.nickName = user.nickName;
        	userUpdated.firstName = user.firstName;
        	userUpdated.lastName = user.lastName;
        	userUpdated.address = user.address;
        	userUpdated.city = user.city;
        	userUpdated.zipCode = user.zipCode;
        	userUpdated.preferredLanguage = user.preferredLanguage;
        	return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/update',
                data:  JSON.stringify(userUpdated),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }

        function Delete(email) {
            var request={
                email:email
            };
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/remove',
                data:  JSON.stringify(request),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        
        function GetUserProfile() {
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/read',
                data: JSON.stringify(new Object),
                cache: false,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
                async: false,
                beforeSend:checkBearer,
                error: handleError,
                success: handleSuccess
            });
        }
        // private functions

        function getUser() {
            if(!localStorage.user){
                localStorage.user = JSON.stringify([]);
            }
            return JSON.parse(localStorage.user);
        }

        function setUser(user) {
            localStorage.user = JSON.stringify(user);
            $rootScope.globals.metaqrcodeUser=user;
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
            return exception.catcher(response);
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
