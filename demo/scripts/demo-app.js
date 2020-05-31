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

/*
 * Application configuration
 */
angular.module('app', ['mblowfish-core']).config(function(
	$mbApplicationProvider, $mbLayoutProvider, $mbToolbarProvider, $mbActionsProvider,
	$mbSidenavProvider, $mbSettingsProvider,
	// TODO: replace with $mbTranslateProvider
	$translateProvider,
	$mbStorageProvider, $locationProvider) {
	//
	// Application manager
	//
	// Application ID is used to seperate applications from each other. for
	// example you may have studo and dashboard application.
	//
	$mbApplicationProvider
		.setKey('demo')
		.setPreloadingEnabled(true)
		// Add a custom preloading container
		//		.setPreloadingComponent({
		//			template: '<h1 style="width: 100%; height: 100%; margin: 0px; padding: 150px; background: red;">Loading</h1>',
		//			controller: 'MbApplicationPreloadingContainerCtrl',
		//			controllerAs: 'ctrl',
		//		})
		// Add a customer action 
		//		.addAction('init', {
		//			title: 'Unlimited test wait',
		//			/*@ngInject*/
		//			action: function($q) {
		//				var deferred = $q.defer();
		//				return deferred.promise;
		//			}
		//		})
		.setTenantRequired(false)
		.setAccountDetailRequired(true)
		.setSettingsRequired(true)
		.setLogingRequired(false);

	$mbSettingsProvider
		.setAutosaveEnabled(false)
		.setTemplateUrl('resources/settings-template.json');

	//
	// Storage prefix
	//
	//  All data will be stored in local storage with key. This will be
	// added to all keys. So you can run several application which is 
	// designed based on MB
	$mbStorageProvider.setKeyPrefix('demo.');

	//
	// HTML5 Addess style
	//
	// Enables HTML5 addresss style. SO the #! sign will be removed from
	// the path.
	$locationProvider.html5Mode(true);

	//
	//  $mbLayout: manages layouts of the system. It is used as a basic layout
	// system to manage views, editors and etc. You are free to add layouts dynamically
	// at runtime.
	//
	// $mbLayoutProvider.setMode('auto');
	$mbLayoutProvider.setDefault('Demo Layout');
	$mbLayoutProvider.addLayout('Demo Layout', {
		settings: {
			hasHeaders: true,
			constrainDragToContainer: true,
			reorderEnabled: true,
			selectionEnabled: true,
			popoutWholeStack: false,
			blockedPopoutsThrowError: true,
			closePopoutsOnUnload: true,
			showPopoutIcon: false,
			showMaximiseIcon: true,
			showCloseIcon: true
		},
		dimensions: {
			borderWidth: 5,
			minItemHeight: 16,
			minItemWidth: 50,
			headerHeight: 20,
			dragProxyWidth: 300,
			dragProxyHeight: 200
		},
		content: [{
			id: 'main',
			type: 'row',
			isClosable: false,
			componentState: {},
			content: [{
				id: 'configs',
				type: 'stack',
				isClosable: false,
				width: 25,
				content: [{
					id: 'demo-pages',
					type: 'component',
					componentName: 'component',
					componentState: {
						url: '/demo',
						isView: true,
					}
				}]
			}, {
				type: 'column',
				isClosable: false,
				content: [{
					id: 'editors',
					type: 'stack',
					title: 'Editors',
					isClosable: false,
					componentState: {}
				}, {
					id: 'logs',
					type: 'stack',
					isClosable: false,
					height: 30,
				}]
			}]
		}]
	});


	//
	//  $mbTranslateProvider: 
	//
	$translateProvider.translations('fa', {
		'Dashboard': 'داشبور',
		'Applications': 'نرم‌افزارها',
		'Account': 'حساب کاربری',
		'Profile': 'پروفایل‌ها',
		'User management': 'مدیریت کاربران',
		'User': 'کاربر',
		'Users': 'کاربران',
		'Groups': 'گروه‌ها',
		'Roles': 'نقش‌ها',
		'Problems': 'مشکلات',
		'Zones': 'منطقه‌ها',
		'Networks': 'شبکه‌ها',
		'Devices': 'دستگاه‌ها',
		'Model': 'مدل',
		'Color': 'رنگ',
		'Workshops': 'کارگاه‌ها',
		'Requests': 'تقاضاها',
		'Actions': 'اکشن‌ها',
		'Tenant': 'ملک',
		'Input value': 'مقدار ورودی',

		'ID': 'شناسه',
		'Login': 'لاگین',
		'EMail': 'پست الکترونیکی',
		'Edit': 'ویرایش',
		'Save': 'ذخیره',
		'Cancel': 'انصراف',
		'Restore': 'بازیابی',
		'Password': 'گذرواژه',
		'Confirm': 'تایید',

		'Summary': 'خلاصه',
		'Phone': 'شماره تماس',
		'Mobile': 'شماره همراه',
		'LinkedId': 'لینکدین',
		'Telegram': 'تلگرام',
		'Whatsapp': 'واتساپ',
		'Contacts': 'تماس‌ها',
		'User avatar': 'اواتار کاربری',
		'User id': 'شناسه کاربری',
		'Socials': 'شبکه‌های اجتمائی',

		'spas': 'نرم‌افزارها',

		'CMS': 'سیستم مدیریت محتوی',
		'Contents': 'محتوی‌ها',

		'Bank gates': 'درگاه‌های بانکی',

		'Settings': 'تنظیمات',
		'Setting': 'تنظیم',

		'Theme': 'نمایه',
		'Themes': 'نمایه‌ها',
		'default': 'پیش فرض',
		'gray': 'خاکستری',
		'red': 'قرمز',
		'dark': 'تیره',

		'Local': 'منطقه',
		'Language': 'زبان',
		'Direction': 'جهت',
		'Right to left': 'راست به چپ',
		'Left to right': 'چپ به راست',

		'Search': 'جستجو',

		'Persian': 'فارسی',
		'English': 'انگلیسی',
		'Enable navbar': 'فعال کردن نوار ابزار',

		'Messages': 'پیام‌ها',
		'message': 'پیام',
		'set zone': 'تعیین منطقه',
		'set fixer': 'تعیین تعمیرکار',
		'remote consultant': 'مشاوره تلفنی',
		'incomplete info': 'اطلاعات ناقص',
		'schadule': 'تعیین زمان و مکان',
		'fixed': 'تعمیر شد',
		'impossilbe to fix': 'تعمییر ممکن نیست',
		'set workshop': 'تعیین کارگاه',
		'accept': 'دریافت گوشی',
		'start to fix': 'آغاز تعمیر',
		'need more time': 'نیاز به زمان بیشتر',
		'give back': 'ارسال به مشتری',
		'close': 'بستن',
		'reopen': 'باز کردن',
		'archive': 'بایگانی',
		'report': 'گزارش',

		'app.update.message': 'نسخه جدید نصب شده است، دوباره لود کنید.',

		'next': 'بعدی'
	});
	$translateProvider.preferredLanguage('fa');


	//
	//  By initializing the main toolbar you can add list of action or component
	// into the toolbar.
	//
	$mbToolbarProvider.init([{
		url: '/app/demo',
		items: ['demo.alert']
	}, {
		url: '/app/io',
		items: ['demo.alert', 'demo.alert']
	}]);


	//
	// $mbAction: manages all actions
	//
	$mbActionsProvider.init({
		items: {
			'demo.alert': {
				icon: 'face',
				title: 'Add local module',
				description: 'Adds new module into the application.',
				/* @ngInject */
				action: function($window) {
					$window.alert('Alert action is called!?');
				}
			}
		}
	});

	$mbSidenavProvider.addSidenav('/app/navigator', {
		title: 'Navigator',
		description: 'Navigate all path and routs of the pandel',
		controller: 'MbNavigatorContainerCtrl',
		controllerAs: 'ctrl',
		templateUrl: 'views/mb-navigator.html',
		//		locked: '$mdMedia("min-width: 333px");',
		position: 'start'
	});
});
