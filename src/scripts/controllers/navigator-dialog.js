'use strict';
angular.module('mblowfish-core')

/**
 * @ngdoc controller
 * @name AmdNavigatorDialogCtrl
 * @description # AccountCtrl Controller of the mblowfish-core
 */
.controller('AmdNavigatorDialogCtrl', function($scope, $mdDialog, config) {
	$scope.config = config;
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(a) {
		$mdDialog.hide(a);
	};
});