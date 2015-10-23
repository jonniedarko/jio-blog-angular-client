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

			}, function (error) {
				if(error){
					vm.error = error;
				}
			});
		} else {
			vm.error = {
				email:{
					message : '*Email is required'
				},
				password:{
					message : '*Password is required'
				}
			}
		}

	};

}
