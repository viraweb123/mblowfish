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
angular.module('mblowfish-core')

/**
 * @ngdoc service
 * @name $settings
 * @description System setting manager
 * 
 * Setting is user configurations
 */
.service('$settings', function($q, $navigator) {
	var _pages = [ ];

	/**
	 * List all pages
	 */
	function pages() {
		return $q.when({
			'items' : _pages
		});
	}
	
	/**
	 * Gets a config page
	 * 
	 * @name config
	 * @param {string} configId - Id of the config
	 * @return {promiss<config>} return config
	 */
	function getPage(pageId){
		var page = null;
		for(var i = 0; i < _pages.length; i++){
			if(_pages[i].id == pageId){
				return $q.when(_pages[i]);
			}
		}
		return $q.reject({
			// TODO: maso, 2018: add reason
		});
	}

	/**
	 * Open config/setting page
	 */
	function openPage(page){
		return $navigator.openPage('/configs/'+page.id);
	}

	/**
	 * Creates configuration/setting page.
	 */
	function createPage(page){
		_pages.push(page);
		return app;
	}
	
	var app = {
			pages : pages,
			getPage: getPage,
			openPage : openPage,
			newPage: createPage,
	};
	return app;
});