
export default function($sce) {
	'ngInject';
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}
