/*
 * angular-material-icons v0.7.1
 * (c) 2014 Klar Systems
 * License: MIT
 */

/**
 * @ngdoc Services
 * @name $mbIcon
 * @description Manage icons to use in the view
 * 
 *  All icons will be managed
 */
function mbIconProvider() {

	var provider, service;

	var shapes = {};
	var viewBoxes = {};
	var size = 24;

	service = {
		getShape: getShape,
		getShapes: getShapes,
		getViewBox: getViewBox,
		getViewBoxes: getViewBoxes,
		getSize: getSize,
		setShape: addShape,
		setShapes: addShapes,
		setViewBox: addViewBox,
		setViewBoxes: addViewBoxes,
		setSize: setSize,
		addShape: addShape,
		addShapes: addShapes,
		addViewBox: addViewBox,
		addViewBoxes: addViewBoxes
	};

	provider = {
		$get: $mbIconFactory,
		getShape: getShape,
		getShapes: getShapes,
		getViewBox: getViewBox,
		getViewBoxes: getViewBoxes,
		getSize: getSize,
		setShape: addShape,
		setShapes: addShapes,
		setViewBox: addViewBox,
		setViewBoxes: addViewBoxes,
		setSize: setSize,
		addShape: addShape,
		addShapes: addShapes,
		addViewBox: addViewBox,
		addViewBoxes: addViewBoxes
	};

	return provider;

	function addShape(name, shape) {
		shapes[name] = shape;

		return provider; // chainable function
	}

	function addShapes(newShapes) {
		shapes = angular.extend(shapes, newShapes);

		return provider; // chainable function
	}

	function addViewBox(name, viewBox) {
		viewBoxes[name] = viewBox;

		return provider; // chainable function
	}

	function addViewBoxes(newViewBoxes) {
		viewBoxes = angular.extend(viewBoxes, newViewBoxes);

		return provider; // chainable function
	}

	function getShape(name) {
		return shapes[name] || shapes['help'];
	}

	function getShapes() {
		return shapes;
	}

	function getViewBox(name) {
		return viewBoxes[name] || '0 0 24 24';
	}

	function getViewBoxes() {
		return viewBoxes;
	}

	function setSize(newSize) {
		size = newSize || 24;
	}

	function getSize() {
		return size;
	}

	/*
	@ngInject
	 */
	function $mbIconFactory() {
		return service;
	}
};

export default mbIconProvider;

