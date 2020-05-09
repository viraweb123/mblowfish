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


angular.module('mblowfish-core').config(function($mdThemingProvider) {

	// AMD default palette
	$mdThemingProvider.definePalette('amdPrimaryPalette', {
		'50': '#FFFFFF',
		'100': 'rgb(255, 198, 197)',
		'200': '#E75753',
		'300': '#E75753',
		'400': '#E75753',
		'500': '#E75753',
		'600': '#E75753',
		'700': '#E75753',
		'800': '#E75753',
		'900': '#E75753',
		'A100': '#E75753',
		'A200': '#E75753',
		'A400': '#E75753',
		'A700': '#E75753'
	});

	// Dark theme
	$mdThemingProvider
		.theme('dark')//
		.primaryPalette('grey', {
			'default': '900',
			'hue-1': '700',
			'hue-2': '600',
			'hue-3': '500'
		})//
		.accentPalette('grey', {
			'default': '700'
		})//
		.warnPalette('red')
		.backgroundPalette('grey')

		.dark();

	$mdThemingProvider.alwaysWatchTheme(true);
});
