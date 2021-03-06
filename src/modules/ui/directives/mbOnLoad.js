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
 * @ngdoc Directives
 * @name mb-on-load
 * @description Call an action on load
 * 
 * This directive is used to run an action on load of an element. For exmaple
 * use to show alert on load of image:
 * 
 * ```
 * <img
 * 	mb-on-load="toast('image is loaded')"
 * 	href="image/path">
 * ```

@ngInject
 */
export default  function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('load', function(event, data) {
				// call the function that was passed
				if (attrs.mbOnLoad) {
					scope.$eval(attrs.mbOnLoad, {
						$event: event,
						$element: element,
						$data: data
					});
				}
			});
		}
	};
}
