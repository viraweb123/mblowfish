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
import templateUrl from './dynamic-form.html';

export default {
	icon: 'list',
	title: 'Dynamic form builder',
	description: 'A dynamic form builder reads the json config and create a form dynamically',
	groups: ['UI'],
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function() {
		this.properties = [{
			name: 'x',
			title: 'Latitude',
			type: 'string',
			visible: true,
			editable: true,
			description: 'Description'
		}, {
			name: 'y',
			title: 'Longitude',
			type: 'string',
			visible: true,
			editable: true,
			description: 'Description'
		}, {
			name: 'z',
			title: 'Longitude',
			type: 'string',
			visible: true,
			editable: true,
			description: 'Description'
		}];


		this.properties2 = [{
			name: 'url',
			title: 'URL',
			type: 'string',
			visible: true,
			editable: true,
			description: 'URL of an image'
		}, {
			name: 'account_id',
			title: 'Account',
			type: 'long',
			visible: true,
			editable: true,
			description: 'Account to do something'
		}];
	}
}