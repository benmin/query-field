var app = angular.module('App', ['ngSanitize', 'ngAnimate', 'ui.bootstrap']);

app.controller('AppController', function($scope) {
  
  var KEYS = {
    BACKSPACE: 8
  };
	
  var operatingSystems = ['Windows 98', 'Windows Vista', 'Windows 7', 'Windows 8', 'Windows 10'];
  
  $scope.selected;
  
  $scope.options = [];
  $scope.parameters = [];
  
  $scope.options.push({
    type: 'Name',
    value: ''
  },{
    type: 'Description',
    value: ''
  });
  
  for(var i = 0; i < operatingSystems.length; i++) {
    $scope.options.push({
      type: 'Operating System',
      value: operatingSystems[i]
    });
  }
  
  $scope.$watch(
    function(scope) {
      return scope.selected;
    },
    function(newValue, oldValue) {
      $scope.options[0].value = newValue;
      $scope.options[1].value = newValue;
    }
  );
  
  $scope.onSelect = function($item) {
    $scope.parameters.push({
      type: $item.type,
      value: $item.value,
      highlighted: false
    });
    
    // erase this AFTER pushing the parameter, so dynamic options work
    $scope.selected = '';
  };
  
  $scope.removeParameterOnBackspace = function(event, index) {
    if(event.keyCode === KEYS.BACKSPACE) {
      event.preventDefault();
      $scope.parameters.splice(index,1);
    }
  };
  
  $scope.removeParameter = function(index) {
    $scope.parameters.splice(index,1);
  }
  
  $scope.highlightNextParameter = function(event) {
    if(event.keyCode === KEYS.BACKSPACE) {
      var len = $scope.parameters.length;
      
      if(len > 0) {
        $scope.parameters[len - 1].highlighted = true;
        // TODO: remove focus from <input>
      }
    }
    
  };
  
});
