'use strict';
/**
 * 
 */
var controller = angular.module('app.controllers', []);



var URL = 'http://immense-plateau-6817.herokuapp.com/';

//EQUIPMENT UPDATE
controller.controller('EquipmentUpdateCtrl', function($scope, $route, $routeParams, $http,sharedEquipmentProperties, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.equip = {};
	$scope.row = {};
	$scope.alerts = [];
	$scope.types =[];
	$scope.statuses =[];
	$scope.selectedType= '';
	$scope.selectedStatus= '';
	$scope.selectedModel = '';
	$scope.selectedLicence  ='';

	$http.get(URL+'equipment/type/list').
    			success(function(data, status, headers, config) {
     				$scope.types = data;
  		}). 
  			error(function(data, status, headers, config) {
   				            $scope.alerts.push({
                				type: 'danger',
                				msg: "Error while selecting models and types!"
        				});
		 });
	
		$http.get(URL+'equipment/status/list').
    			success(function(data, status, headers, config) {
     				$scope.statuses = data;
  		}). 
  			error(function(data, status, headers, config) {
   				            $scope.alerts.push({
                				type: 'danger',
                				msg: "Error while selecting statuses!"
        				});
		 });
	
	$scope.row= sharedEquipmentProperties.getEquipment();
  
	
		$http.get(URL+'equipment/'+$scope.row.equipment.id).
    			success(function(data, status, headers, config) {
				
  
     				$scope.equip = data;
			
					$scope.selectedModel = $scope.equip.equipmentModel ;
					$scope.selectedStatus =  $scope.equip.equipmentStatus;
					$scope.selectedType =  $scope.equip.equipmentType;
					$scope.acquiringDate =  $scope.equip.equipment.aquisitionDate;
					$scope.inventoryNumber =  $scope.equip.equipment.inventoryNumber;
					$scope.serialNumber =  $scope.equip.equipment.serialNumber;
					$scope.comment  =  $scope.equip.equipment.comment;
  		}). 
  			error(function(data, status, headers, config) {
   				            $scope.alerts.push({
                				type: 'danger',
                				msg: "Error while selecting equipment!"
        				});
		 });
	

    
    $scope.updateEquipment = function(equipment){
		
		$scope.equipment ={
			"id": $scope.equip.equipment.id,
			"inventoryNumber" : $scope.inventoryNumber,
			 "modelId" :		$scope.selectedModel.id,
			 "serialNumber" :	$scope.serialNumber,
			 "aquisitionDate" : $scope.acquiringDate,
			 "statusId" : $scope.selectedStatus.id,
			 "comment" :	$scope.comment,

		}
                  
		$http.post(URL+'equipment/update', $scope.equipment).
			success(function(data, status, headers, config) {
				
			$location.path('/equipments');

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Equipment update failed!"
        });
  });
        };
	
	//Date picker
	$scope.today = function() {
			$scope.dt = new Date();
  		};
  	$scope.today();

  	$scope.clear = function () {
    	$scope.dt = null;
  		};


  	$scope.toggleMin = function() {
    	$scope.minDate = $scope.minDate ? null : new Date();
  		};
  	$scope.toggleMin();

  	$scope.open = function($event) {
  		$event.preventDefault();
  		$event.stopPropagation();
   		$scope.opened = true;
  	};

  	$scope.openSecond = function($event) {
  		$event.preventDefault();
  		$event.stopPropagation();
   	$scope.openedSecond = true;
  };

  	$scope.dateOptions = {
		formatYear: 'yy',
    	startingDay: 1
  	};

		
  	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

//EQUIPMENT ADD
controller.controller('EquipmentAddCtrl', function($scope, $route, $routeParams, $http,  $location) {
	

    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.protected= 'true';
	$scope.alerts = [];
	$scope.types =[];
	$scope.selectedType= '';
	$scope.selectedModel= '';




	$http.get(URL+'equipment/type/list').
    			success(function(data, status, headers, config) {
     				$scope.types = data;
  		}). 
  			error(function(data, status, headers, config) {
   				            $scope.alerts.push({
                				type: 'danger',
                				msg: "Error while selecting models and types!"
        				});
		 });
	
	        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
	
	$scope.today = function() {
			$scope.dt = new Date();
  		};
  	$scope.today();

  	$scope.clear = function () {
    	$scope.dt = null;
  		};


  	$scope.toggleMin = function() {
    	$scope.minDate = $scope.minDate ? null : new Date();
  		};
  	$scope.toggleMin();

  	$scope.open = function($event) {
  		$event.preventDefault();
  		$event.stopPropagation();
   		$scope.opened = true;
  	};

  	$scope.openSecond = function($event) {
  		$event.preventDefault();
  		$event.stopPropagation();
   	$scope.openedSecond = true;
  };

  	$scope.dateOptions = {
		formatYear: 'yy',
    	startingDay: 1
  	};

	$scope.addEquipment = function(){
		
		 $scope.equipment ={
			 
			 "inventoryNumber" : $scope.inventoryNumber,
			 "modelId" :		$scope.selectedModel.id,
			 "serialNumber" :	$scope.serialNumber,
			 "aquisitionDate" : $scope.acquiringDate,
			 "statusId" : 1,
			 "comment" :	$scope.comment,

			 
		 };
                  
		$http.post(URL+'equipment/create', $scope.equipment).
				success(function(data, status, headers, config) {
             
							
				$location.path('/equipments');

			}).
  		error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Equipment add failed!"
        });
  	})
		
		
	};
	
  	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

	
});

//EQUIPMENT LIST
controller.controller('EquipmentListCtrl', function($scope, $route, $routeParams, $http, sharedEquipmentProperties, $location, $timeout) {
	
	
    $scope.equipments= [];
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.alerts = [];
	$scope.filtered = [];

 $http.get(URL+'equipment/list').
    success(function(data, status, headers, config) {
     $scope.equipments = data;
  }).
  error(function(data, status, headers, config) {
     $scope.alerts.push({
                type: 'danger',
                msg: "Unsuccessful equipment select!"
		 });
  });
	

	$scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.equipments.length;  
	
	
	$scope.numPages = Math.ceil($scope.equipments.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 

	
	$scope.updateEquipment= function(row){
		
		
		sharedEquipmentProperties.setEquipment(row);
		$location.path('/equipment/update');
	};

	        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
	
});




//LoCATION LIST
controller.controller('LocationListCtrl', function($scope, $route, $routeParams, $http,$location,$timeout, sharedLocationProperties) {
	
	
    $scope.locations= [];
	$scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.alerts = [];
	$scope.filtered = [];
	$scope.locations = [];
	
    
 $http.get(URL+'location/list').
    success(function(data, status, headers, config) {
     $scope.locations = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Unsuccessful locations select!"
		 });
  });
	
	
	
	$scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.locations.length;  
	
	$scope.numPages = Math.ceil($scope.locations.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 
	
	$scope.updateLocation = function(row){
		
		sharedLocationProperties.setLocation(row);
		$location.path('/location/update');
	}
	
	$scope.addLocation = function(){
		
		
		$location.path('/location');
	}
	

});

//LOCATION ADD
controller.controller('LocationAddCtrl', function($scope, $route, $routeParams, $http) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
  
    
    $scope.addLocation = function(newLocation){
                  
		$http.post(URL+'location/create', $scope.newLocation).
			success(function(data, status, headers, config) {
             
			
				$scope.newLocation.location = null;
        		$scope.newLocation.address = null;
		
	
				$scope.alerts.push({
					type: 'success',
            		msg: " New location added!"	
				});
			
			

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Location add failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

//LOCATION UPDATE
controller.controller('LocationUpdateCtrl', function($scope, $route, $routeParams, $http,sharedLocationProperties, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
  
	
	$scope.location = sharedLocationProperties.getLocation();
    
    $scope.updateLocation = function(location){
                  
		$http.post(URL+'location/update', $scope.location).
			success(function(data, status, headers, config) {
				
			$location.path('/locations');

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Location update failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

//DEBENTURE
controller.controller('DebentureAddCtrl', function($scope, $route, $routeParams, $http, $location, $timeout) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
	$scope.locations= [];
	$scope.persons= [];
	$scope.equipments = [];
	$scope.checked = [];
	$scope.filtered = [];
	
	
	 $http.get(URL+'person/list').
    success(function(data, status, headers, config) {
     $scope.persons = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Person select failed!"
		 });
  });
	
  

	 $http.get(URL+'location/list').
    success(function(data, status, headers, config) {
     $scope.locations = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Location select failed!"
		 });
  });
	
	
	 $http.get(URL+'equipment/debenture/list').
    success(function(data, status, headers, config) {
     $scope.equipments = data;
  }).
  error(function(data, status, headers, config) {
     $scope.alerts.push({
                type: 'danger',
                msg: "Equipment select failed!"
		 });
  });
	


	$scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.equipments.length; 
	
	
		
	$scope.numPages = Math.ceil($scope.equipments.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 

 
	

  $scope.selection=[];
	
	
    $scope.selectDebenture = function(equipments){
		
		$scope.selection=[];
		
		$scope.equipments.forEach(function(row) {
				if(row.selected){
					
					$scope.selection.push(row);
				};
			});
		
		
		};
	
	
	$scope.addDebenture = function(selection){
		
		$scope.debentures=[];
		$scope.debenture= {};
		
		$scope.selection.forEach(function(row) {
				
					
					$scope.debenture={
						

						 "idPerson" :	$scope.selectedPerson.id,
						 "idLocation" :	$scope.selectedLocation.id,
						 "idEquipment" : row.equipment.id
			
										};
					
							$scope.debentures.push($scope.debenture);
						
			});
		
		
       
				$http.post(URL+'debenture/create', $scope.debentures).
				success(function(data, status, headers, config) {
					
						
						$scope.equipments = [];
						$scope.filtered = [];
						$scope.selection=[];
						$scope.selectedPerson='';
						$scope.selectedLocation='';
					
						
				$http.get(URL+'equipment/debenture/list').
					success(function(data, status, headers, config) {
					 $scope.equipments = data;
				  }).
				  error(function(data, status, headers, config) {
					 $scope.alerts.push({
								type: 'danger',
								msg: "Euqipment select failed!"
						 });
				  });
             	
				$scope.alerts.push({
					type: 'success',
            		msg: " Added new debenture!"	
				});

			}).
  		error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Debenture failed!"
        });
  	})
		
	};



        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

//DEBENTURE LIST
controller.controller('DebentureListCtrl', function($scope, $route, $routeParams, $http, $location, $timeout) {
	
	
    $scope.equipments= [];
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.alerts = [];
	$scope.debentures = [];
	$scope.filtered = [];
	$scope.selectedPerson = {};
	

 $http.get(URL+'debenture/list').
    success(function(data, status, headers, config) {
     $scope.debentures = data;
  }).
  error(function(data, status, headers, config) {
     $scope.alerts.push({
                type: 'danger',
                msg: "Debenture select failed!"
		 });
  });
	

	$scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.debentures.length;  
	
	
	$scope.numPages = Math.ceil($scope.debentures.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 

 
	

	        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
	
});



//DISCHARGE
controller.controller('DischargeCtrl', function($scope, $route, $routeParams, $http, $location, $timeout) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
	$scope.locations= [];
	$scope.persons= [];
	$scope.equipments = [];
	$scope.filtered = [];
	
	 $http.get(URL+'person/list').
    success(function(data, status, headers, config) {
     $scope.persons = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Person select failed!"
		 });
  });
	
  

	

	$scope.searchEquipment = function(){
		
		
$http.get(URL+'debenture/list/'+$scope.selectedPerson.id).
    success(function(data, status, headers, config) {
     $scope.equipments = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Discharged equipment select failed!"
		 });
  });
		
	}

	$scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.equipments.length; 
	
	
		
	$scope.numPages = Math.ceil($scope.equipments.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 

 
	  $scope.selection=[];
	
	
	$scope.change = function(selectedPerson){
		
		
		if(selectedPerson == null){
			$scope.selection=[];
			$scope.debentures=[];
			$scope.equipments =[];
		}else if(selectedPerson.id <0){
			$scope.selection=[];
			$scope.debentures=[];
			$scope.equipments =[];
		}
	}
	
	
    $scope.selectDebenture = function(equipments){
		
		$scope.selection=[];
		$scope.displayPerson =$scope.selectedPerson;
		
		$scope.equipments.forEach(function(row) {
				if(row.selected){
					
					$scope.selection.push(row);
				};
			});
		
		
		};
	
		$scope.dischargeDebenture = function(selection){
		
		$scope.debentures=[];
		$scope.debenture= {};
		
		$scope.selection.forEach(function(row) {
				
					
					$scope.debenture={
						
						 "id" : row.debenture.id,
						 "idPerson" :	$scope.selectedPerson.id,
						 "idLocation" :	row.location.id,
						 "idEquipment" : row.equipment.id
			
										};
					
							$scope.debentures.push($scope.debenture);
						
			});
		
		
				$http.post(URL+'debenture/update', $scope.debentures).
				success(function(data, status, headers, config) {
             
							

						$scope.equipments = [];
						$scope.filtered = [];
						$scope.selection=[];
						$scope.selectedPerson='';
						$scope.selectedLocation='';
             	
				$scope.alerts.push({
					type: 'success',
            		msg: " Equipment discharge success!"	
				});

			}).
  		error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Equipment discharge failed!"
             });
  	})
		
	};
		

        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});




//TYPE LIST
controller.controller('TypeListCtrl', function($scope, $route, $routeParams, $http,$location, $timeout, sharedTypeProperties) {
	
	
    $scope.types= [];
	$scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.alerts = [];
	$scope.filtered = [];
	$scope.types = [];
    
 $http.get(URL+'equipment/type/list/all').
    success(function(data, status, headers, config) {
     $scope.types = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Types select failed!"
		 });
  });
	
	
	
	$scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.types.length;  
	
	$scope.numPages = Math.ceil($scope.types.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 
	
	$scope.updateType = function(row){
		
		sharedTypeProperties.setType(row);
		$location.path('/type/update');
	}
	
	$scope.addType = function(){
		
		
		$location.path('/type');
	}
	

});

//TYPE UPDATE
controller.controller('TypeUpdateCtrl', function($scope, $route, $routeParams, $http,sharedTypeProperties, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
  
	
	$scope.type = sharedTypeProperties.getType();
    
    $scope.updateType= function(type){
                  
		$http.post(URL+'equipment/type/update', $scope.type).
			success(function(data, status, headers, config) {
				
			$location.path('/types');

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Type update failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

//Type ADD
controller.controller('TypeAddCtrl', function($scope, $route, $routeParams, $http, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
  
    
    $scope.addType = function(newType){
                  
		$http.post(URL+'equipment/type/create', $scope.newType).
			success(function(data, status, headers, config) {
             
			
				$location.path('/types');
			
			

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " TYpe add failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});



//PERSON LIST
controller.controller('PersonListCtrl', function($scope, $route, $routeParams, $http,$location, $timeout, sharedPersonProperties) {
	
	
  
	$scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.alerts = [];
	$scope.filtered = [];
	$scope.persons = [];
    
 $http.get(URL+'person/list').
    success(function(data, status, headers, config) {
     $scope.persons = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Person select failed!"
		 });
  });
	
	
	
	$scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.persons.length;  
	
	$scope.numPages = Math.ceil($scope.persons.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 
	
	$scope.updatePerson = function(row){
		
		sharedPersonProperties.setPerson(row);
		$location.path('/person/update');
	}
	
	$scope.addPerson = function(){
		
		
		$location.path('/person');
	}
	

});

//PERSON UPDATE
controller.controller('PersonUpdateCtrl', function($scope, $route, $routeParams, $http,sharedPersonProperties, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
  
	
	$scope.person = sharedPersonProperties.getPerson();
	
    
    $scope.updatePerson= function(person){
                  
		$http.post(URL+'person/update', $scope.person).
			success(function(data, status, headers, config) {
				
			$location.path('/persons');

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " Person update failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

//PERSON ADD
controller.controller('PersonAddCtrl', function($scope, $route, $routeParams, $http, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
	
  
    
    $scope.addPerson = function(newPerson){
                  
		$http.post(URL+'person/create', $scope.newPerson).
			success(function(data, status, headers, config) {
             
			
				
		      $location.path('/persons');

			
			

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " New person add failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});


//Model LIST
controller.controller('ModelListCtrl', function($scope, $route, $routeParams, $http,$location,$timeout, sharedModelProperties) {
	
	
  
	$scope.$route = $route;
    $scope.$routeParams = $routeParams;
	$scope.alerts = [];
	$scope.filtered = [];
	$scope.models = [];
    
 $http.get(URL+'equipment/model/list').
    success(function(data, status, headers, config) {
     $scope.models = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Model select failed!"
		 });
  });
	
	
	
	$scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;
    $scope.totalItems = $scope.models.length;  
	
	$scope.numPages = Math.ceil($scope.models.length/$scope.itemsPerPage);
	
    
    $scope.filter = function() {
       $timeout(function() { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
        }, 10);
    };
	
	
	$scope.$watch('filtered.length', function(){              
                $scope.totalItems = $scope.filtered.length;
             }); 
	
	$scope.updateModel = function(row){
		
		sharedModelProperties.setModel(row);
		$location.path('/model/update');
	}
	
	$scope.addModel = function(){
		
		
		$location.path('/model');
	}
    

	

});

//MODEL ADD
controller.controller('ModelAddCtrl', function($scope, $route, $routeParams, $http, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
	$scope.types = [];
    
 $http.get(URL+'equipment/type/list/all').
    success(function(data, status, headers, config) {
     $scope.types = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Type select failed!"
		 });
  });
	
  
    
    $scope.addModel = function(newModel){
		
		$scope.model = {
						 "model" : $scope.newModel.model ,
						 "typeId" :  $scope.selectedType.id 
					
					}
                  
		$http.post(URL+'equipment/model/create', $scope.model).
			success(function(data, status, headers, config) {
             
			
				$location.path('/models');

			
			

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " New model add failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});




//MODEL UPDATE
controller.controller('ModelUpdateCtrl', function($scope, $route, $routeParams, $http,sharedModelProperties, $location) {
	
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.alerts = [];
  
	
	 $http.get(URL+'equipment/type/list/all').
    success(function(data, status, headers, config) {
     $scope.types = data;
  }). 
  error(function(data, status, headers, config) {
         $scope.alerts.push({
                type: 'danger',
                msg: "Type select failed!"
		 });
  });
	
	

	$scope.model = sharedModelProperties.getModel();
	
	$scope.selectedType = $scope.model.type;
    
    $scope.updateModel= function(model){
		
		$scope.model={
				"id" : $scope.model.id,
				"model" : $scope.model.model,
				"typeId" : $scope.selectedType.id
		}
                  
		$http.post(URL+'equipment/model/update', $scope.model).
			success(function(data, status, headers, config) {
				
			$location.path('/models');

  }).
  error(function(data, status, headers, config) {
   
                    
         $scope.alerts.push({
            type: 'danger',
            msg: " New model update failed!"
        });
  });
        };
  
        // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});
