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

/**
@ngdoc Services
@name $mbJobs
@description manage jobs of widgets

Deprecated : use $window
 */
function mbJobs() {

	//---------------------------------------
	// services
	//---------------------------------------
	var provider;
	var service;
	var injector;

	//---------------------------------------
	// variables
	//---------------------------------------
	var jobs = {};

	//---------------------------------------
	// functions
	//---------------------------------------
	function addJob(job) {
		var Job = injector.get('MbJob');
		if (!(job instanceof Job)) {
			job = new Job(job);
			job.schedule();
		} else {
			jobs[job.id] = job;
		}
		return this;
	}

	function removeJob(job) {
		delete jobs[job.id];
	}

	function getJobs() {
		return jobs;
	}
	//---------------------------------------
	// End
	//---------------------------------------
	service = {
		addJob: addJob,
		getJobs: getJobs,
		removeJob: removeJob,
	};
	provider = {
		/* @ngInject */
		$get: function($injector) {
			//>> init services
			injector = $injector;

			//>> return service
			return service;
		}
	};
	return provider;
}

export default mbJobs;


