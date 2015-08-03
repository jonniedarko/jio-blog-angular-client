angular.module('jio-auth.signUp', ['jio-auth.authFactory'])
	.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserAuthFactory'];
function SignUpController (UserAuthFactory){
	var vm = this;

	vm.signUp = signUp;

	function signUp(){
		console.log('signup', vm.name, vm.email, vm.password);
		UserAuthFactory.signUp(vm.name, vm.email, vm.password)
			.then(function (token){
				console.log('success -- token:', token);
			}, function (err){
				console.error(err);
			})
	}
}