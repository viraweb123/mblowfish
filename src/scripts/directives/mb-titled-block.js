/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
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
@ngdoc Directives
@name mb-titled-block
@descritpion Title block


 */
mblowfish.directive('mbTitledBlock', function($mbActions) {

	function postLink(scope) {
		scope.$evalAction = function(item) {
			if (item.expression) {
				return scope.$parent.$eval(item.expression);
			}
			if (item.actionId) {
				return $mbActions.exec(item.actionId);
			}
			if (angular.isFunction(item.action)) {
				item.action();
			}
		}
	}
	return {
		replace: false,
		restrict: 'E',
		transclude: true,
		scope: {
			mbTitle: '@?',
			mbIcon: '@?',
			mbProgress: '<?',
			mbMoreActions: '='
		},
		link: postLink,
		templateUrl: 'views/directives/mb-titled-block.html'
	};
});
