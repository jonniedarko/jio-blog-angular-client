/**
 * Created by i311181 on 20 Jul 2015.
 */
angular.module('blog.read.list', ['blgCRUD'])
	.filter('unsafe', HtmlFilter)
	.controller('BlogListController', BlogListController);


HtmlFilter.$inject = ['$sce']
function HtmlFilter($sce) {
	return $sce.trustAsHtml;
};
BlogListController.$inject = ['$location', 'BlgCrudFactory'/*'$scope'*/];
function BlogListController($location, BlgCrudFactory) {
	var vm = this;

	vm.user = {
		name: 'John'
	};
	vm.pageNumber =  $location.search().p || 0;
	console.log('vm.pageNumber', vm.pageNumber);

	vm.posts = [];//post, post]
	BlgCrudFactory.getList({page: vm.pageNumber}, function(posts){
		vm.posts = posts;
	});

	vm.previousPage = parseInt(vm.pageNumber, 10) - 1;
	vm.nextPage = parseInt(vm.pageNumber, 10) + 1;


}