/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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
// XXX: maso, 2020: update to fit language
//describe('Service $mbLocal  ', function () {
//    var $mbLocal;
//
//
//    // load the service's module
//    beforeEach(module('mblowfish-core'));
//
//    // instantiate service
//    beforeEach(inject(function (_$mbLocal_) {
//    	$mbLocal = _$mbLocal_;
//    }));
//
//    it('must implements WB $local API', function () {
//        expect(angular.isFunction($mbLocal.getDate)).toBe(true);
//        expect(angular.isFunction($mbLocal.formatDate)).toBe(true);
//        expect(angular.isFunction($mbLocal.getCurrency)).toBe(true);
//        expect(angular.isFunction($mbLocal.getLanguage)).toBe(true);
//    });
//
//    it('must get current date', function () {
//    	var date = $mbLocal.getDate();
//    	expect(date).not.toBe(null);
//    });
//
//    it('must formate date', function () {
//    	var notFormated = '2019-01-01 00:00:00';
//    	var formated = $mbLocal.formatDate(notFormated, 'YYYY');
//    	expect(formated).toBe('2019');
//    });
//    
//    it('must get current language', function () {
//    	var lang = 'fa';
//    	$mbLocal.setLanguage(lang);
//    	expect($mbLocal.getLanguage()).toBe(lang);
//    });
//    
//    it('must get current currency', function () {
//    	var currency = 'IR';
//    	$mbLocal.setCurrency(currency);
//    	expect($mbLocal.getCurrency()).toBe(currency);
//    });
//});