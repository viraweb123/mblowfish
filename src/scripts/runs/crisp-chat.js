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

/*
 * Enable crisp chat
 */
.run(function($window, $rootScope, $location) {
	var crispLoaded = false;

	function loadCrisp(id){
		$window.$crisp=[];
		$window.CRISP_WEBSITE_ID = id;
		if(!crispLoaded){ // load crisp 
			var script=document.createElement('script');
			script.src='https://client.crisp.chat/l.js';
			script.async=1;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		crispLoaded = true;
	}

	/*
	 * Watch system configuration
	 */
	$rootScope.$watch('app.config.crisp.id', function(value){
		if (!value) {
			return;
		}
		loadCrisp(value);
	});
});