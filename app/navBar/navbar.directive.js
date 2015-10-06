'use strict';

angular.module('jio-navbar', ['jio-auth'])
	.controller('NavBarCtrl', NavBarCtrl)
	.directive('jioNavbar', NavBar);


function NavBar() {
	return {
		restrict: 'EA', //E = element, A = attribute, C = class, M = comment
		replace: true,
		scope: {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			title: '@'
		},
		templateUrl: 'app/navBar/navbar.view.html',
		controllerAs: 'navbar',
		controller: NavBarCtrl, //Embed a custom controller in the directive
		link: function (scope, element, attrs) {

		} //DOM manipulation
	}
}
NavBarCtrl.$inject = ['AuthenticationFactory', 'UserAuthFactory', '$scope'];
function NavBarCtrl(AuthenticationFactory, UserAuthFactory, $scope) {
	var vm = this;
	vm.isLoggedIn = AuthenticationFactory.isLoggedIn();
	$scope.$on('isLogged:updated', function () {
		console.log('test')
		vm.isLoggedIn = AuthenticationFactory.isLoggedIn();

	});
	vm.logout = function () {
		UserAuthFactory.logout();
	};
	UserAuthFactory.getUser()
		.then(function(data){
			vm.user = data;
		})
		.catch(function(){
			vm.user = null;
		});

}

