(function () {
    'use strict';

    angular.module('metaqrcodeApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'blocks.exception',
        'blocks.logger',
        'angularModalService',
        'file-model',
        'afOAuth2',
        'angular-jwt',
        'angular-loading-bar',
        'ng-code-mirror',
        'zeroclipboard',
        'ngTable',
        'angular-md5'
    ])
            .directive('googleSignInButton',function(){
                return {
                    scope:{
                        gClientId:'@',
                        clientId:'@'
                    },
//                    template: '<a href="#" ng-click="onSignInButtonClick()" id="googleoauth2-signin"><i class="fa fa-google"></i> Google sign in</a>',
                    template: '<a href="#" ng-click="onSignInButtonClick()" id="googleoauth2-signin"><img src="assets/images/GoogleIcon.png" alt="Google sign in" style="width:100px;margin-bottom:5px;"/></a>',
        		    transclude: true,
                    controller: ['$rootScope','$scope','$attrs','$window','$state','$location','UserService','dataservice','AccessToken','jwtHelper','logger',function($rootScope, $scope, $attrs, $window, $state, $location, UserService, dataservice, AccessToken, jwtHelper, logger){
                        gapi.load('auth2', function() {//load in the auth2 api's, without it gapi.auth2 will be undefined
                            gapi.auth2.init(
                                    {
                                        client_id: $attrs.gClientId
                                    }
                            );
                            var GoogleAuth  = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
                            $scope.onSignInButtonClick=function(){//add a function to the controller so ng-click can bind to it
                                GoogleAuth.signIn().then(function(response){//request to sign in
                                    // chiamare la login basata su google
                                    // passare : id token di google
                                    // passare il client-id applicativo
                                    var guser = GoogleAuth.currentUser.get();
                                    if (guser.isSignedIn()) {
	            	                	dataservice.googleLogin(guser.getAuthResponse().id_token,$attrs.gClientId,$attrs.clientId).then(function(response){
	            	                		$location.hash('');
            	                			AccessToken.setFromLogin(response.sessionToken);
        	                	            var tokenPayload = jwtHelper.decodeToken(guser.getAuthResponse().id_token);
            	            	            $rootScope.globals ={
            	            	                currentUser:{username:tokenPayload.sub},
            	            	                loginType: 'google'
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
            	            	            $window.sessionStorage.setItem('globals', $rootScope.globals);
            	            	            $state.reload();
	            	                	}, function (jqXHR, textStatus, errorThrown) {
	            	                    	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
	            	                    		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
	            	                    	} else {
	            	                            logger.error(textStatus + " : " + errorThrown.toLocaleString());
	            	                    	}
	            	                    });
                                    }
                                });
                            };
                        });
                    }]
                };
            })
            .directive('googleSignOutButton',function(){
                return {
                    scope:{
                    },
                    template: '<a href="#" ng-click="onSignOutButtonClick()" id="googleoauth2-signout"><i class="fa fa-google"></i> Google sign out</a>',
        		    transclude: true,
                    controller: ['$rootScope','$scope','$attrs','$window','AccessToken','AuthenticationService','logger',function($rootScope, $scope, $attrs, $window, AccessToken, AuthenticationService, logger){
                            var GoogleAuth  = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
                            $scope.onSignOutButtonClick=function(){//add a function to the controller so ng-click can bind to it
	                            GoogleAuth.signOut().then(function () {
	                            	AccessToken.destroy();
	                            	AuthenticationService.ClearCredentials();
	                            	$window.location.reload();
	                              });
                            };
                    }]
                };
            })
    .constant('app',{
        SERVER:'http://localhost:8080',
    	}).constant('toastr', toastr)
    	  .config(config)
    	  .run(run);

    config.$inject=['$logProvider', '$urlRouterProvider', '$locationProvider','toastr','cfpLoadingBarProvider','uiZeroclipConfigProvider',];
    /* @ngInject */
    function config($logProvider, $urlRouterProvider, $locationProvider,toastr,cfpLoadingBarProvider,uiZeroclipConfigProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        $urlRouterProvider
            .otherwise('/');

//        $locationProvider.html5Mode(true).hashPrefix('!');

        //Config toastr
        toastr.options.timeOut = 10000;
        toastr.options.positionClass = 'toast-bottom-right';

        //Config loading-bar
        cfpLoadingBarProvider.includeSpinner = false;
        uiZeroclipConfigProvider.setZcConf({
            swfPath: '../bower_components/zeroclipboard/dist/ZeroClipboard.swf'
        });



    }

    run.$inject = ['$rootScope', '$location', '$cookieStore','Endpoint','jwtHelper','AccessToken','logger','$window','UserService'];
    /* @ngInject */
    function run($rootScope, $location, $cookieStore,Endpoint,jwtHelper,AccessToken,logger,$window, UserService) {

    	try {
	    	
	        // keep user logged in after page refresh
	        $rootScope.globals = $window.sessionStorage.getItem('globals') || {};
	
	        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	            if (toState && toState.requireToken) {
	                if (!AccessToken.get()) {
	                    event.preventDefault();
	                    $window.sessionStorage.setItem('oauthRedirectRoute', $location.path());
	                    Endpoint.authorize();
	                }
	            }
	        });
	        $rootScope.$on("oauth2:authSuccess",function(){
	            $location.hash('');
	            var tokenPayload = jwtHelper.decodeToken(AccessToken.get().id_token);
	            $rootScope.globals ={
	                currentUser:{username:tokenPayload.sub},
	                loginType: 'bearer'
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
	            $window.sessionStorage.setItem('globals', $rootScope.globals);
	        });
	        $rootScope.$on("oauth2:authError",function(error){
	            logger.error("Token: ",error);
	        });
    	} catch (e) {
            logger.error("Unable to initialize page. Is this browser supporting html 5? You need Chrome, Firefox or IE 11 (or later) to have METAQRCODE working");
    	}

    }
})();