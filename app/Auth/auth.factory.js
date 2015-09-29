'use strict';
var api = this.localStorage.authApi || 'http://localhost:3300/api/users/';
angular.module('jio-auth.authFactory', ['ngCookies'])
	.factory('AuthenticationFactory', AuthenticationFactory)
	.factory('UserAuthFactory', UserAuthFactory)
	.factory('TokenInterceptor', TokenInterceptor);

AuthenticationFactory.$inject = ['$window', '$rootScope'];
function AuthenticationFactory($window, $rootScope) {
	var loggedIn = false;
	var auth = {
		isLoggedIn: function() {
			return loggedIn;
		},
		setLoggedIn: function (val){
			loggedIn = val || false;
			$rootScope.$broadcast('isLogged:updated')
		},
		check: function () {
			if ($window.sessionStorage.token && $window.sessionStorage.user) {
				this.setLoggedIn(true);
			} else {
				this.setLoggedIn(false);
				delete this.user;
			}
		}
	};

	return auth;
}

UserAuthFactory.$inject = ['$http', '$q', '$window', '$location', 'AuthenticationFactory'];

function UserAuthFactory($http, $q, $window, $location, AuthenticationFactory) {

	return {
		login: function (email, password) {
			return $http.post(api + 'login', {
				email: email,
				password: password
			});
		},
		signUp: function (name, email, password) {
			var deferred = $q.defer();
			$http.post(api + 'signup', {
				name: name,
				email: email,
				password: password
			})
				.success(function (token) {
					deferred.resolve(token);


				})
				.error(function (err) {
					deferred.reject(err);
				});

			return deferred.promise;
		},
		logout: function() {
			console.log('logout --', AuthenticationFactory.isLogged)
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
		isLoggedIn: isLoggedIn,
		getUser: function getUser() {
			return $http.get(api + 'me');
		}
	}
}
TokenInterceptor.$inject = ['$q', '$window']
function TokenInterceptor($q, $window) {
	return {
		request: function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers['X-Access-Token'] = $window.sessionStorage.token;
				config.headers['X-Key'] = $window.sessionStorage.user;
				config.headers['Content-Type'] = "application/json";
			}
			return config || $q.when(config);
		},

		response: function(response) {
			return response || $q.when(response);
		}
	};
}

function isLoggedIn() {
	console.log('isLogged in');
	true;
}

