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
'use strict';

describe('MbAccountCtrl ', function() {

	// load the controller's module
	beforeEach(module('mblowfish-core'));

	var LoginCtrl, scope;
	var app = {
			logout: function(){
				//Logout function
			},
			session : function() {
				return {
					then : function() {
						// TODO: call the fucntion
					}
				};
			}
	};
	var navigator = {
			go : function() {

			}
	};

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		LoginCtrl = $controller('MbAccountCtrl', {
			$scope : scope,
			$app : app,
			$navigator: navigator
		});
	}));

	it('should attach a function of login to the scope', function() {
		expect(angular.isFunction(scope.login)).toBe(true);
	});
	
	it('should attach a function of logout to the scope', function() {
		expect(angular.isFunction(scope.logout)).toBe(true);
	});
});