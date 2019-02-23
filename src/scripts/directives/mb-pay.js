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
'use strict';

angular.module('mblowfish-core')

	/**
	 *
	 */
	.directive('mbPay', function ($bank, $parse, $location, $navigator) {

	    function postLink(scope, elem, attrs) {

		this.loadGates = function () {
		    if (this.loadingGates) {
			return;
		    }
		    this.loadingGates = true;
		    var ctrl = this;
		    return $bank.getBackends()//
			    .then(function (gatesPag) {
				scope.gates = gatesPag.items;
				return gatesPag;
			    })//
			    .finally(function () {
				ctrl.loadingGates = false;
			    });
		};

		//function pay(backend, discountCode){
		this.pay = function (backend, discountCode) {
		    // create receipt and send to bank receipt page.
		    var data = {
			backend: backend.id,
			callback: attrs.mbCallbackUrl ? attrs.mbCallbackUrl : $location.absUrl()
		    };
		    if (typeof discountCode !== 'undefined' && discountCode !== null) {
			data.discount_code = discountCode;
		    }
		    $parse(attrs.mbPay)(scope.$parent, {
			$backend: backend,
			$discount: discountCode,
			$callback: data.callback,
			$data: data
		    })
			    .then(function (receipt) {
				$navigator.openPage('bank/receipts/' + receipt.id);
			    });
		};

//		function checkDiscount(code){
//			$discount.discount(code)//
//			.then(function(discount){
//				if(typeof discount.validation_code === 'undefined' || discount.validation_code === 0){
//					$scope.discount_message = 'discount is valid';
//				}else{
//					switch(discount.validation_code){
//					case 1:
//						$scope.discount_message = 'discount is used before';
//						break;
//					case 2: 
//						$scope.discount_message = 'discount is expired';
//						break;
//					case 3: 
//						// discount is not owned by user.
//						$scope.discount_message = 'discount is not valid';
//						break;
//					}
//				}
//			}, function(error){
//				$scope.error = error.data.message;
//				if(error.status === 404){				
//					$scope.discount_message = 'discount is not found';
//				}else{
//					$scope.discount_message = 'unknown error while get discount info';
//				}
//			});
//		}

		this.loadGates();

		scope.ctrl = this;
	    }


	    return {
		replace: true,
		restrict: 'E',
		templateUrl: 'views/directives/mb-pay.html',
		scope: {
		    mbCallbackUrl: '@?',
		    mbPay: '@',
		    mbDiscountEnable: '='
		},
		link: postLink

	    };
	});
