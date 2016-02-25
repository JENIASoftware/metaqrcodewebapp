	(function () {
	'use strict';
	
	angular.module('metaqrcodeApp')
		.directive('starRating', starRating);
		
	function starRating() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star">'
					 + '<i class="fa fa-lg fa-star-o"></i>'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 1; i <= scope.max; i++) {
						scope.stars.push({
							filled : i <= scope.ratingValue
						});
					}
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
//						if (newVal) {
							updateStars();
//						}
					}
				);
			}
		};
	}
})();