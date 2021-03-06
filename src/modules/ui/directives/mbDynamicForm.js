/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import templateUrl from './mbDynamicForm.html';
/**
 * @ngdoc Directives
 * @name mbDynamicForm
 * @description Get a list of properties and fill them
 * 
 * Each property will be managed by an indevisual property editor.

@ngInject
 */
export default  function($mbResource) {
	'ngInject';
	/**
	 * Adding preloader.
	 * 
	 * @param scope
	 * @param element
	 * @param attr
	 * @param ctrls
	 * @returns
	 */
	function postLink(scope, element, attrs, ctrls) {
		// Load ngModel
		var ngModelCtrl = ctrls[0];
		scope.values = {};
		ngModelCtrl.$render = function() {
			scope.values = ngModelCtrl.$viewValue || {};
		};

		scope.modelChanged = function(key, value) {
			scope.values[key] = value;
			ngModelCtrl.$setViewValue(scope.values);
		};

		scope.hasResource = function(prop) {
			return $mbResource.hasPageFor(prop.name);
		};

		scope.setValueFor = function(prop, $event) {
			return $mbResource
				.get(prop.name, {
					data: prop.defaultValue,
					targetEvent:$event
				})
				.then(function(value) {
					scope.modelChanged(prop.name, value);
				});
		};

		/**
		Maps property to a element type.
		 */
		scope.getTypeOf = function(prop) {
			var type = 'input';
			if (prop.type === 'String' && prop.name === 'description') {
				type = 'textarea';
			} else if (prop.type === 'Datetime') {
				type = 'datetime';
			}
			return type;
		};
	}

	return {
		restrict: 'E',
		require: ['ngModel'],
		templateUrl: templateUrl,
		scope: {
			mbParameters: '='
		},
		link: postLink
	};
}

