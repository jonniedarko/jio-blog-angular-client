'use strict';
/*var api = 'http://localhost:3300/api/users/';*/
angular.module('jio-auth.authInterceptor', ['ngCookies', 'ngStorage'])
	.config(AuthInterceptorConfig)
	.factory('AuthInterceptor', AuthInterceptor);

AuthInterceptorConfig.$inject = ['$httpProvider'];
function AuthInterceptorConfig($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
};

AuthInterceptor.$inject = ['$window','$q'];
function AuthInterceptor($window, $q){
	/*return {
		'request': function (config) {
			console.log('AuthInterceptor request');
			config.headers = config.headers || {};
			if ($localStorage.token) {
				config.headers.Authorization = 'Bearer ' + $localStorage.token;
			}
			return config;
		},
		'responseError': function(response) {
			if(response.status === 401 || response.status === 403) {
				$location.path('/signin');
				return $q.all(response);
			}
			return $q.reject(response);
		}
	};*/
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
		}
	};
};