'use strict';
/*var api = 'http://localhost:3300/api/users/';*/
angular.module('jio-auth.authInterceptor', ['ngCookies', 'ngStorage'])
	.config(AuthInterceptorConfig)
	.factory('AuthInterceptor', AuthInterceptor);

AuthInterceptorConfig.$inject = ['$httpProvider'];
function AuthInterceptorConfig($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
};

AuthInterceptor.$inject = ['$location','$window','$q', '$rootScope'];
function AuthInterceptor($location, $window, $q, $rootScope){
	return {
		request: function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.authorization = $window.sessionStorage.token;
				config.headers['X-Key'] = $window.sessionStorage.user;
				config.headers['Content-Type'] = "application/json";
			}
			return config || $q.when(config);
		},

		response: function(response) {
			return response || $q.when(response);
		},
		responseError: function (response) {
			if (response.status === 401) {
				$rootScope.$broadcast('unauthorized');
				/*$location.path('/login')*/
			}
			return response;
		}
	};
};
