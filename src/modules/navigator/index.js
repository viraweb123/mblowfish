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
import mblowfish from '../../mblowfish';

import actionCmdAction from './actions/command-line-display';
import toggleSideNavePageList from './actions/navigator-toggle';
import MbNavigatorCtrl from './controllers/MbNavigatorCtrl';
import navigatorSidenav from './sidenavs/navigator';
import navigatorView from './views/navigator';

export const Constants = {
	MB_NAVIGATOR_SIDENAV_TOGGLE_ACTION: 'mb.navigator.sidenav.tiggle',
	MB_NAVIGATOR_CMDLINE_TOGGLE_ACTION: 'mb.navigator.cmdline.tiggle'
};

mblowfish
	.constant(Constants)
	.controller('MbNavigatorCtrl', MbNavigatorCtrl)
	.action(Constants.MB_NAVIGATOR_CMDLINE_TOGGLE_ACTION, actionCmdAction)
	.action(Constants.MB_NAVIGATOR_SIDENAV_TOGGLE_ACTION, toggleSideNavePageList)
	
	.sidenav('/app/navigator', navigatorSidenav)
	.view('/mb/ui/views/navigator/', navigatorView)
	
	//<< end
	;