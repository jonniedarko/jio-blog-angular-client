angular.module('jio-auth.login', ['jio-auth.authFactory'])
	.controller('LoginController', LoginController);

LoginController.$inject = ['$window', '$location','UserAuthFactory', 'AuthenticationFactory'];
function LoginController($window,$location, UserAuthFactory, AuthenticationFactory) {
	var vm = this;

	vm.login = function () {

		var email = vm.email,
			password = vm.password;

		if (email !== undefined && password !== undefined) {
			UserAuthFactory.login(email, password).then(function () {
				$location.path('/blog');

			}, function (status) {
				alert('Oops something went wrong!');
			});
		} else {
			alert('Invalid credentials');
		}

	};

}
