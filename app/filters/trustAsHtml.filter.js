'use strict';

angular.module('jio-filters', ['blgCRUD'])
	.filter('unsafe', HtmlFilter);

HtmlFilter.$inject = ['$sce'];
function HtmlFilter($sce) {
	return $sce.trustAsHtml;
}