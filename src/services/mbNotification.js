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

import alertTemplateUrl from './mbNotification-alert.html';
import confirmTemplateUrl from './mbNotification-confirm.html';
import promptTemplateUrl from './mbNotification-prompt.html';
/**
 * @ngdoc Services
 * @name $mbNotification
 * @description A default system navigator
 * 
 * 
 * 

@ngInject
 */
function mbNotification($mbDialog, $mdToast, $rootElement) {

	/**
	 * The alert() method displays an alert box with a specified message and an
	 * OK button.
	 * 
	 * An alert box is often used if you want to make sure information comes
	 * through to the user.
	 * 
	 * Note: The alert box takes the focus away from the current window, and
	 * forces the browser to read the message. Do not overuse this method, as it
	 * prevents the user from accessing other parts of the page until the box is
	 * closed.
	 * 
	 * @param String
	 *                message Optional. Specifies the text to display in the
	 *                alert box, or an object converted into a string and
	 *                displayed
	 */
	function alert(message, $event) {
		return $mbDialog
			.show({
				controller: 'MbNavigatorDialogCtrl',
				controllerAs: 'ctrl',
				parent: angular.element($rootElement),
				clickOutsideToClose: false,
				fullscreen: true,
				multiple: true,
				templateUrl: alertTemplateUrl,
				targetEvent: $event,
				locals: {
					config: {
						message: message
					}
				}
			})
			.then(function() {
				return true;
			}, function() {
				return true;
			});
	}

	/**
	 * The confirm() method displays a dialog box with a specified message,
	 * along with an OK and a Cancel button.
	 * 
	 * A confirm box is often used if you want the user to verify or accept
	 * something.
	 * 
	 * Note: The confirm box takes the focus away from the current window, and
	 * forces the browser to read the message. Do not overuse this method, as it
	 * prevents the user from accessing other parts of the page until the box is
	 * closed.
	 * 
	 * The confirm() method returns true if the user clicked "OK", and false
	 * otherwise.
	 * 
	 * @param String
	 *                message Optional. Specifies the text to display in the
	 *                confirm box
	 */
	function confirm(message, $event) {
		return $mbDialog
			.show({
				controller: 'MbNavigatorDialogCtrl',
				controllerAs: 'ctrl',
				parent: angular.element($rootElement),
				clickOutsideToClose: false,
				fullscreen: true,
				multiple: true,
				templateUrl: confirmTemplateUrl,
				targetEvent: $event,
				locals: {
					config: {
						message: message
					}
				}
			});
	}

	/**
	 * The prompt() method displays a dialog box that prompts the visitor for
	 * input.
	 * 
	 * A prompt box is often used if you want the user to input a value before
	 * entering a page.
	 * 
	 * Note: When a prompt box pops up, the user will have to click either "OK"
	 * or "Cancel" to proceed after entering an input value. Do not overuse this
	 * method, as it prevent the user from accessing other parts of the page
	 * until the box is closed.
	 * 
	 * The prompt() method returns the input value if the user clicks "OK". If
	 * the user clicks "cancel" the method returns null.
	 * 
	 * @param String
	 *                text Required. The text to display in the dialog box
	 * @param String
	 *                defaultText Optional. The default input text
	 */
	function prompt(text, defaultText, $event) {
		return $mbDialog
			.show({
				controller: 'MbNavigatorDialogCtrl',
				controllerAs: 'ctrl',
				parent: angular.element($rootElement),
				clickOutsideToClose: false,
				fullscreen: true,
				multiple: true,
				templateUrl: promptTemplateUrl,
				targetEvent: $event,
				locals: {
					config: {
						message: text,
						model: defaultText
					}
				}
			});
	}

	/**
	 * TODO: maso, 2017: document
	 * @param text
	 * @returns
	 */
	function toast(text, $event) {
		return $mdToast.show(
			$mdToast
				.simple()
				.textContent(text)
				.hideDelay(3000)
		);
	}


	return {
		toast: toast,
		alert: alert,
		prompt: prompt,
		confirm: confirm
	};
}

export default mbNotification;
