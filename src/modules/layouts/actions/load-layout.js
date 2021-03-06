
import Constants from '../Constants';

export default {
	group: 'Layout',
	title: 'Load',
	description: 'Loads a layout from the stored layouts',
	icon: 'launch',
	action: function($event, $mbLayout, $mbResource) {
		'ngInject';
		function loadLayout(layoutName) {
			$mbLayout.setLayout(layoutName);
		}

		var vals = $event.values;
		if (_.isUndefined(vals) || vals.length < 0) {
			$mbResource
				.get(Constants.MB_LAYOUTS_LAYOUTS_SP, {
					title: 'Select layout',
					$style: {
						multi: false
					},
					targetEvent: $event
				})
				.then(function(values) {
					loadLayout(values[0]);
				});
		} else {
			loadLayout(vals[0]);
		}
	}
}