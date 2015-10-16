'use strict';
var api = this.localStorage.authApi || 'http://localhost:3300/api/users/';
angular.module('jio-auth.authFactory', ['ngCookies'])
	.factory('AuthenticationFactory', AuthenticationFactory)
	.factory('UserAuthFactory', UserAuthFactory)
	.factory('TokenInterceptor', TokenInterceptor);

AuthenticationFactory.$inject = ['$q','$window', '$rootScope', '$http'];
function AuthenticationFactory($q, $window, $rootScope, $http) {
	var loggedIn = false;
	var auth = {
		isLoggedIn: function () {
			return loggedIn;
		},
		setLoggedIn: function (val, sessionData) {
			loggedIn = val || false;
			if(sessionData){
				$window.sessionStorage.token = sessionData.token;
				$window.sessionStorage.user = sessionData.user;
			}
			$rootScope.$broadcast('isLogged:updated')
		},
		check: function () {
			var deferred = $q.defer();
			var self = this;

			if ($window.sessionStorage.token && $window.sessionStorage.user) {
				$http.get(api + 'verify')
					.success(function (data) {
						self.setLoggedIn(data.isLoggedIn);
						deferred.resolve(data.isLoggedIn);
					})
					.error(function (err) {
						deferred.reject(err);
					});
			} else {

				this.setLoggedIn(false);
				delete this.user;
				deferred.resolve(false);
			}
			return deferred.promise;
		}
	};

	return auth;
}

UserAuthFactory.$inject = ['$http', '$q', '$window', '$location', 'AuthenticationFactory'];

function UserAuthFactory($http, $q, $window, $location, AuthenticationFactory) {

	return {
		login: function (email, password) {
				var deferred = $q.defer();
			 $http.post(api + 'login', {
				email: email,
				password: password
			}).then(function (res) {
				if(!res.data.user || !res.data.token){
					deferred.reject();
				}else{
					AuthenticationFactory.setLoggedIn(true, res.data);
					deferred.resolve(res);
				}
			}, function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		signUp: function (name, email, password) {
			var deferred = $q.defer();
			$http.post(api + 'signup', {
				name: name,
				email: email,
				password: password
			})
				.then(function (res) {
					AuthenticationFactory.setLoggedIn(true, res.data);
					deferred.resolve();
				}, function (err) {
					deferred.reject(err);
				});

			return deferred.promise;
		},
		logout: function () {
			if (AuthenticationFactory.isLoggedIn()) {
				AuthenticationFactory.setLoggedIn();// = false;
				delete AuthenticationFactory.user;
				delete AuthenticationFactory.userRole;
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.user;
				delete $window.sessionStorage.userRole;
				$location.path("/login");
			}
		},
		getUser: function getUser(id) {
			var userID = id || 'me';
			var deferred = $q.defer();

			if (AuthenticationFactory.isLoggedIn()) {
				$http.get(api + userID).success(deferred.resolve, deferred.reject);
			} else {
				deferred.reject(null);
			}
			return deferred.promise;
		}
	}
}
TokenInterceptor.$inject = ['$q', '$window']
function TokenInterceptor($q, $window) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers['X-Access-Token'] = $window.sessionStorage.token;
				config.headers['X-Key'] = $window.sessionStorage.user;
				config.headers['Content-Type'] = "application/json";
			}
			return config || $q.when(config);
		},

		response: function (response) {
			return response || $q.when(response);
		}
	};
}
