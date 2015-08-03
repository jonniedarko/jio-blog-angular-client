angular.module('blg-composer', ['blgCRUD'])
	.controller('ComposerController', ComposerController)
	.controller('PostEditController', PostEditController);

ComposerController.$inject = ['$location', 'BlgCrudFactory'];
function ComposerController($location, BlgCrudFactory){
	var vm = this;
	vm.save = function(){
		console.group('New Post');
		console.log(vm.post.title);
		console.log(vm.post.content);
		console.groupEnd();
		BlgCrudFactory.create({author:'John M', content:vm.post.content, title:vm.post.title}, function (){
			$location.url('/blog');
		})
	}

}

PostEditController.$inject = ['$location','BlgCrudFactory', 'post'];
function PostEditController($location, BlgCrudFactory, post){

	var vm = this;
	// this prevents the reference from orignalPost and update post being the same
	var json = JSON.stringify(post);
	var originalPost = JSON.parse(json);

	vm.post = post;

	vm.save = function(){

		var updatedPost = {};
		updatedPost._id = originalPost._id;
		if(vm.post.content != originalPost.content){
			updatedPost.content = vm.post.content;
		}
		if(vm.post.title != originalPost.title){
			updatedPost.title = vm.post.title;
		}

		BlgCrudFactory.update( {id:originalPost._id, post:updatedPost}, function (){
			$location.url('/blog');

		})
	}
}