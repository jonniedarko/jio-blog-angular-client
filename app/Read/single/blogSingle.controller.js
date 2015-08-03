angular.module('blog.read.single', ['blgCRUD'])
	//.filter('unsafe', HtmlFilter)
	.controller('BlogViewController', BlogViewController);


/*HtmlFilter.$inject = ['$sce']
function HtmlFilter($sce) {
	return $sce.trustAsHtml;
};*/
BlogViewController.$inject = ['BlgCrudFactory', '$routeParams'/*'$scope'*/];
function BlogViewController(BlgCrudFactory, $routeParams) {
	var vm = this;

	vm.user = {
		name: 'John'
	};

	BlgCrudFactory.get({id:$routeParams.title}, function (post){
		vm.post = post;
	});



}