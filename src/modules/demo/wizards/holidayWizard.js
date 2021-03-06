

export default {
	title: 'Holiday',
	description: 'Register your holiday travel info',
	pages: [
		'holidaySchedulePage',
		'holidayLocationPage',
		'holidayTypePage',
		'holidayPlanePage',
		'holidayTrainPage',
		'holidayCarPage',
		'holidayFinalPage'
	],

	/*
	Validate data on changes
	*/
	onChange: function($wizard) {
		'ngInject';
		if ($wizard.data.from && $wizard.data.from === $wizard.data.to) {
			$wizard.setErrorMessage('Departure and destination cannot be the same');
		} else {
			$wizard.setErrorMessage();
		}
	},
	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		if ($wizard.getErrorMessage()) {
			return false;
		}
		if ($wizard.data.from &&
			$wizard.data.to &&
			$wizard.data.type &&
			$wizard.data.returnDate) {
			return true;
		}
		return false;
	},
	/*
	Gets the next page id
	*/
	getNextPage: function($wizard) {
		'ngInject';
		switch ($wizard.currentPage) {
			case 'holidayPage':
				return 'planePage';
			case 'planePage':
				if ($wizard.data.plan === 'car') {
					return 'carPage';
				} else {
					return 'trainPage';
				}
			default:
				return 'finalPage';
		}
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		// Returns a promise. It may be a complecated job and need more time to complete
		var $event = {
			values: [$wizard.data]
		};
		return $mbActions.exec('demo.travel.create', $event);
	},
}




