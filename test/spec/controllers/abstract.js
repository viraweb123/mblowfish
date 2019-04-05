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
	var $controller;
	var locals ={
			$scope : null,
			$app : {
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
			},
			// used in dialogs
			config: {},
	};

	// load the controller's module
	beforeEach(module('mblowfish-core'));
	
	// Initialize the controller and a mock scope
	beforeEach(inject(function(_$controller_, $rootScope) {
		$controller = _$controller_;
		locals.$scope = $rootScope.$new();
	}));

	it('should possible to create instance of all controllers', function() {
		var controllers = [
			// basics
			'MbAbstractCtrl',
			
			// features
//			'AmdDashboardCtrl',
//			'MbHelpCtrl',
//			'MbInitialCtrl',
			'MessagesCtrl',
			'AmdNavigatorDialogCtrl',
			'AmdNavigatorCtrl',
			'MbOptionsCtrl',
			'MbPreferenceCtrl',
			'MbPreferencesCtrl',
			
			//seen
			'AmWbSeenAbstractCollectionCtrl',
			'AmWbSeenCmsContentsCtrl',
			'MbAccountCtrl',
			'MbGroupsCtrl',
//			'MbProfileCtrl',
			'MbProfilesCtrl',
			'MbRolesCtrl',
			'MbThemesCtrl',
			'MbToolbarDashboardCtrl'
		];
		angular.forEach(controllers, function(ctrlName){
			var ctrl = $controller(ctrlName, locals);
			expect(ctrl).not.toBe(null);
		});
	});

});
