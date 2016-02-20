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
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function ExistUser(email) {
            return $http.post(app.SERVER+ '/api/rest/json/registration/exists',{ email:email})
                .then(handleSuccess, handleError);
        }
        function ValidateRegistrationCode(email,code) {
            var request={email:email,registrationConfirmationCode:code};
            return $http.post(app.SERVER+ '/api/rest/json/registration/confirm', request)
                .then(handleSuccess, handleError('Error validating code'));
        }
        function Create(user) {
            return $http.post(app.SERVER+ '/api/rest/json/registration/prepare', user)
                .then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/update',
                data: user,
                dataType: "json",
      		    contentType: "application/json; charset=utf-8",
      		    cache: false,
                contentType: false,
                processData: false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
            }).then(handleSuccess, handleError);
        }

        function Delete(email) {
            var request={
                email:email
            };
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/remove',
                data: request,
                dataType: "json",
      		  	contentType: "application/json; charset=utf-8",                
      		  	cache: false,
                contentType: false,
                processData: false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
            }).then(handleSuccess, handleError('Error deleting user'));
        }
        
        function GetUserProfile() {
            return $.ajax({
                type: "POST",
                url: app.SERVER+ '/api/rest/json/registration/read',
                dataType: "json",
                data:{},
      		  	contentType: "application/json; charset=utf-8",
      		  	cache: false,
                contentType: false,
                processData: false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get().access_token)
                }
            }).then(handleSuccess, handleError);
        }
        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

        function handleSuccess(response) {
            if(response.data.returnCode && response.data.returnCode<0) {
                return handleError(response);
            }
            return response;
        }

        function handleError(error) {
            return exception.catcher('XHR Failed')(error);
        }
        /*
         function Create(user) {
         var deferred = $q.defer();

         // simulate api call with $timeout
         $timeout(function () {
         GetByUsername(user.username)
         .then(function (duplicateUser) {
         if (duplicateUser !== null) {
         deferred.resolve({data:{ returnCode: -1, reason: 'Username "' + user.username + '" is already taken' }});
         } else {
         var users = getUsers();

         // assign id
         var lastUser = users[users.length - 1] || { id: 0 };
         user.id = lastUser.id + 1;

         //Genero il nuovo codice per la validazione
         user.registrationCode=user.id;
         users.push(user);
         setUsers(users);

         deferred.resolve({data:{ returnCode: 0 }});
         }
         });
         }, 1000);

         return deferred.promise;
         }*/

    }
})();
