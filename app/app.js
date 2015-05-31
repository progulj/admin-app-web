'use strict';

var app = angular.module('app', ['app.controllers','ngRoute','ui.bootstrap', 'smart-table', 'mgcrea.ngStrap']);


app.config(function($routeProvider) {
    $routeProvider.when('/locations', {
            templateUrl: 'app/partials/location-list.html',
            controller: 'LocationListCtrl'
        });
    $routeProvider.when('/location', {      
            templateUrl: 'app/partials/location-add.html',
            controller: 'LocationAddCtrl'
        });
    $routeProvider.when('/equipments', {
            templateUrl: 'app/partials/equipment-list.html',
            controller: 'EquipmentListCtrl'
        });
    $routeProvider.when('/equipment/add', {      
            templateUrl: 'app/partials/equipment-insert.html',
            controller: 'EquipmentAddCtrl'
        });		
	$routeProvider.when('/equipment/update', {      
            templateUrl: 'app/partials/equipment-update.html',
            controller: 'EquipmentUpdateCtrl'
       });

	$routeProvider.when('/location/update', {      
            templateUrl: 'app/partials/location-update.html',
            controller: 'LocationUpdateCtrl'
       });
	
		$routeProvider.when('/debenture', {      
            templateUrl: 'app/partials/debenture.html',
            controller: 'DebentureAddCtrl'
       });
	
		$routeProvider.when('/debentures', {      
            templateUrl: 'app/partials/debenture-list.html',
            controller: 'DebentureListCtrl'
       });
	
		$routeProvider.when('/discharge', {      
            templateUrl: 'app/partials/discharge.html',
            controller: 'DischargeCtrl'
       });
	
		$routeProvider.when('/persons', {      
            templateUrl: 'app/partials/person-list.html',
            controller: 'PersonListCtrl'
       });
	
		$routeProvider.when('/person/update', {      
            templateUrl: 'app/partials/person-update.html',
            controller: 'PersonUpdateCtrl'
       });
		$routeProvider.when('/person', {      
            templateUrl: 'app/partials/person-add.html',
            controller: 'PersonAddCtrl'
       });
		$routeProvider.when('/models', {      
            templateUrl: 'app/partials/model-list.html',
            controller: 'ModelListCtrl'
       });
	
		$routeProvider.when('/model/update', {      
            templateUrl: 'app/partials/model-update.html',
            controller: 'ModelUpdateCtrl'
       });
		$routeProvider.when('/model', {      
            templateUrl: 'app/partials/model-add.html',
            controller: 'ModelAddCtrl'
       });
	
		$routeProvider.when('/types', {      
            templateUrl: 'app/partials/type-list.html',
            controller: 'TypeListCtrl'
       });
	
		$routeProvider.when('/type/update', {      
            templateUrl: 'app/partials/type-update.html',
            controller: 'TypeUpdateCtrl'
       });
		$routeProvider.when('/type', {      
            templateUrl: 'app/partials/type-add.html',
            controller: 'TypeAddCtrl'
       });

    $routeProvider.otherwise({ redirectTo: '/' });
    
});




app.config( [
          '$compileProvider',
          function( $compileProvider )
          {   
              $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
              
          }
      ]);



app.directive('capitalize', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.unshift(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };

});


app.filter('startFrom', function () {
            return function (input, start) {

                if (input === undefined || input === null || input.length === 0
                 || start === undefined || start === null || start.length === 0 || start === NaN) return [];
                start = +start; //parse to int

                try {
                    var result = input.slice(start);
                    return result;

                } catch (e) {

                //    alert(input);
                }        
            };
        })
app.service('sharedLocationProperties', function() {
    var location = {};
 
	
	 var  setLocation = function(value) {
       location = value;
  	}

 	 var getLocation = function(){
      return location;
  }
    
    return {
        getLocation: getLocation,
        setLocation: setLocation 
    }
});

app.service('sharedTypeProperties', function() {
    var type = {};
 
	
	 var  setType = function(value) {
       type = value;
  	}

 	 var getType = function(){
      return type;
  }
    
    return {
        getType: getType,
        setType: setType 
    }
});



app.service('sharedEquipmentProperties', function() {
    var equipment = {};
 
	
	 var  setEquipment = function(value) {
       equipment = value;
  	}

 	 var getEquipment = function(){
      return equipment;
  }
    
    return {
        getEquipment: getEquipment,
        setEquipment: setEquipment 
    }
});



app.service('sharedPersonProperties', function() {
    var person = {};
 
	
	 var  setPerson = function(value) {
       person = value;
  	}

 	 var getPerson = function(){
      return person;
  }
    
    return {
        getPerson: getPerson,
        setPerson: setPerson 
    }
});



app.service('sharedModelProperties', function() {
    var model = {};
 
	
	 var  setModel = function(value) {
       model = value;
  	}

 	 var getModel = function(){
      return model;
  }
    
    return {
        getModel: getModel,
        setModel : setModel 
    }
});

