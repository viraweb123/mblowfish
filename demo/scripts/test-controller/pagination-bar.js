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

mblowfish.controller('TestPaginationBarCtrl', function($scope, QueryParameter) {
	// 
	var QueryParameter = new QueryParameter();
	QueryParameter.setOrder('id', 'a');
	var requests = null;
	var ctrl = {
		state: 'relax',
		items: []
	};

	/**
	 * جستجوی درخواست‌ها
	 * 
	 * @param QueryParameter
	 * @returns
	 */
	function find(query) {
		QueryParameter.setQuery(query);
		reload();
	}

	/**
	 * لود کردن داده‌های صفحه بعد
	 * 
	 * @returns
	 */
	function nextPage() {
		if (ctrl.status === 'working') {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			QueryParameter.setPage(requests.next());
		}
		// start state (device list)
		ctrl.status = 'working';
		var items = {
			'items': [
				{
					'id': 2,
					'name': 'hadi',
					'description': 'hadi@mansour.com'
				},
				{
					'id': 1,
					'name': 'admin',
					'description': 'admin@dpq.co.ir'
				}
			],
			'counts': 2,
			'current_page': 1,
			'items_per_page': 50,
			'page_number': 1
		};
		requests = items;
		ctrl.items = ctrl.items.concat(requests.items);
		ctrl.status = 'relax';
	}

	function reload() {
		requests = null;
		ctrl.items = [];
		nextPage();

		toast('page is reloaded');
	}

	function add() {
		// do nothing
	}

	$scope.items = [];
	$scope.ctrl = ctrl;
	// Pagination toolbar
	$scope.QueryParameter = QueryParameter;
	$scope.search = find;
	$scope.nextPage = nextPage;
	$scope.reload = reload;

	$scope.sortKeys = [
		'id',
		'name',
		'description'
	];
	$scope.moreActions = [{
		title: 'New item',
		icon: 'add',
		action: add
	}];
	$scope.moreActions2 = [{
		title: 'Menu item 1',
		icon: 'add',
		action: add
	},
	{
		title: 'Menu item 2',
		icon: 'remove',
		action: add
	},
	{
		title: 'Menu item 3',
		icon: 'help',
		action: add
	}];

});
