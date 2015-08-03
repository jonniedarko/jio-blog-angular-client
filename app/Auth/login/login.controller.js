angular.module('jio-auth.login', ['jio-auth.authFactory'])
	.controller('LoginController', LoginController);

LoginController.$inject = ['$window', '$location','UserAuthFactory', 'AuthenticationFactory'];
function LoginController($window,$location, UserAuthFactory, AuthenticationFactory) {
	var vm = this;

	vm.login = function () {

		var email = vm.email,
			password = vm.password;

		if (email !== undefined && password !== undefined) {
			UserAuthFactory.login(email, password).success(function (data) {

				AuthenticationFactory.setLoggedIn(true);
				AuthenticationFactory.user = data.user;
				//AuthenticationFactory.userRole = data.user.role;

				$window.sessionStorage.token = data.token;
				$window.sessionStorage.user = data.user; // to fetch the user details on refresh
				//$window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

				$location.path('/blog');

			}).error(function (status) {
				alert('Oops something went wrong!');
			});
		} else {
			alert('Invalid credentials');
		}

	};

}