/**

Text model with array validation and transformation. Sets the size validation error if not a valid number.
/**

@ngInject
 */
export default  function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attrs, ctrl) {
			if (!ctrl) {
				return;
			}
			var intMax = -1;
			attrs.$observe('mbMinLength', function(value) {
				var intVal = parseInt(value, 10);
				intMax = isNaN(intVal) ? -1 : intVal;
				ctrl.$validate();
			});
			ctrl.$validators.minlength = function(modelValue) {
				if (!modelValue) {
					return false;
				}
				return modelValue.length >= intMax;
			};
		}
	}
}
