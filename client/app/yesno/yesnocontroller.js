var app = angular.module('metaqrcodeApp');

app.controller('YesNoController', ['$scope', 'close', 'title', 'body', '$element', function($scope, close, title, body, $element) {
	$scope.title = title;
	$scope.body = body;

  $scope.close = function(result) {
      //  Manually hide the modal.
      $element.modal('hide');

 	  close(result, 500); // close, but give 500ms for bootstrap to animate
  };

}]);