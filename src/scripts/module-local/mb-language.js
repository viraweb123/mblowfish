/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */




/**
 * @ngdoc Controllers
 * @name MbThemesCtrl
 * @description Dashboard
 * 
 */
mblowfish.controller('MbLanguageCtrl', function($scope, $rootScope, $http, $language) {

	function init() {
		$http.get('resources/languages.json')//
			.then(function(res) {
				var data = res ? res.data : {};
				$scope.languages = data.languages;
				//			$rootScope.app.config.languages = $scope.languages;
			})
			//		$mbSettings.config('languages')//
			//		.then(function(langs){
			//			$scope.languages = langs;
			//			return langs;
			//		})//
			//		.then(function(){
			//			if(!$scope.languages){
			//				$http.get('resources/languages.json')//
			//				.then(function(res){
			//					var data = res ? res.data : {};
			//					$scope.languages = data.languages;
			//					$rootScope.app.config.languages = $scope.languages;
			//				});
			//			}
			//		})//
			.finally(function() {
				var langKey = $language.use();
				if ($scope.languages) {
					for (var i = 0; i < $scope.languages.length; i++) {
						if ($scope.languages[i].key === langKey) {
							setLanguage($scope.languages[i]);
							return;
						}
					}
				}
			});
	}

	function setLanguage(lang) {
		$scope.myLanguage = lang;
		// Load langauge
		$rootScope.app.config.languages = [];
		$rootScope.app.config.languages.push($scope.myLanguage);
		// Use langauge		
		$language.use($scope.myLanguage.key);
		// Set local
		$rootScope.app.config.local = $rootScope.app.config.local || {};
		if (!angular.isObject($rootScope.app.config.local)) {
			$rootScope.app.config.local = {};
		}
		$rootScope.app.config.local.language = $scope.myLanguage.key;
		// if($scope.myLanguage.dir){
		// 	$rootScope.app.config.local.dir = $scope.myLanguage.dir;
		// }
	}

	$scope.setLanguage = setLanguage;

	init();
});