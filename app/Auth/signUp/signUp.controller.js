angular.module('jio-auth.signUp', ['jio-auth.authFactory'])
	.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', '$window','$location','UserAuthFactory'];
function SignUpController ($scope, $window, $location, UserAuthFactory){
	var vm = this;

	vm.signUp = signUp;

	function signUp(){
		console.log('signup', vm.name, vm.email, vm.password);
		UserAuthFactory.signUp(vm.name, vm.email, vm.password)
			.then(function (){
				$location.path('/blog');
			}, function (err){
				console.error(err);
			})
	}
}
