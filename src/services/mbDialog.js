/**
@ngdoc Services
@name $mbDialog
@description Manage dialogs

 */
function mbDialog() {

	//--------------------------------------------------------
	// Services
	//--------------------------------------------------------
	var provider;
	//	var service;


	//--------------------------------------------------------
	// varialbes
	//--------------------------------------------------------


	//--------------------------------------------------------
	// Functions
	//--------------------------------------------------------


	//--------------------------------------------------------
	// End
	//--------------------------------------------------------
	provider = {
		$get: function($mdDialog) {
			'ngInject';
			return $mdDialog;
		}
	}
	return provider;
}

export default mbDialog;


