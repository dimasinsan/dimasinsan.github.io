(function() {
  var app = angular.module('myApp', ['ui.router']);
  
  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'login.html',
        controller : 'LoginController'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'home.html',
        controller : 'HomeController'
      })
	  .state('input', {
        url : '/input',
        templateUrl : 'input.html',
        controller : 'employeeController'
      })
	  
	  
	  
	  ;
  }]);

  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Technical Assessment Backoffice - Frontend";
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "username dan password yang anda masukan salah !";
      }   
    };
    
  });
    
	app.controller('employeeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Technical Assessment Backoffice - Frontend";
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('input');
      } else {
        $scope.error = "username dan password yang anda masukan salah !";
      }   
    };
    
  });
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Technical Assessment Backoffice - Frontend";
    
  });
  
  app.factory('LoginService', function() {
    var admin = '';
    var pass = '';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  }); app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Technical Assessment Backoffice - Frontend";
    
  });
  
  app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'password';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });
  
  
  
  
  app.controller('employeeController', function($scope) {
		$scope.listEmployee = [
			{id:'01', username:'Ponco', firstName:'Ponco', lastName:'Rustiawan', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'A', description:'Isian Deskripsi'},
			{id:'02', username:'Anto', firstName:'Anto', lastName:'Sulistiyanto', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'B', description:'Isian Deskripsi'},
			{id:'03', username:'Rudi', firstName:'Rudi', lastName:'Bono Wibowo', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'C', description:'Isian Deskripsi'},
			{id:'04', username:'Budi', firstName:'Budi', lastName:'Sudarsono', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'},
			{id:'05', username:'Irwan', firstName:'Irwan', lastName:'Sudarsono', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'},
			{id:'06', username:'Azis', firstName:'Azis', lastName:'Muslim', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'},
			{id:'07', username:'Malik', firstName:'Malik', lastName:'Malik', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'},
			{id:'08', username:'Rini', firstName:'Rini', lastName:'Purwanti', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'},
			{id:'09', username:'Dian', firstName:'Dian', lastName:'Rahmawati', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'},
			{id:'10', username:'Lukman', firstName:'Lukman', lastName:'Hakim', email:'dimasinsan193@gmail.com', birthDate:'04-08-1993', basicSalary:'5.000.000', group:'D', description:'Isian Deskripsi'}
		];

		$scope.add = function(){
			$scope.listEmployee.push({
				id:$scope.id, username:$scope.username, firstName:$scope.firstName, lastName:$scope.lastName, email:$scope.email, birthDate:$scope.birthDate, basicSalary:$scope.basicSalary, group:$scope.group, description:$scope.description
			});
			$scope.id='';
			$scope.username='';
			$scope.firstName='';
			$scope.lastName='';
			$scope.email='';
			$scope.birthDate='';
			$scope.basicSalary='';
			$scope.group='';
			$scope.description='';
			$state.transitionTo('home');
		};
		
		// Disable sundays
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0) );
		};

		$scope.edit = function(){
			var index = getSelectedIndex($scope.id);
			$scope.listEmployee[index].username = $scope.username;
			$scope.listEmployee[index].firstName = $scope.firstName;
			$scope.listEmployee[index].lastName = $scope.lastName;
			$scope.listEmployee[index].email = $scope.email;
			$scope.listEmployee[index].birthDate = $scope.birthDate;
			$scope.listEmployee[index].basicSalary = $scope.basicSalary;
			$scope.listEmployee[index].group = $scope.group;
			$scope.listEmployee[index].description = $scope.description;
		};

		$scope.selectEdit= function(id){
			var index = getSelectedIndex(id);
			var employee = $scope.listEmployee[index];
			$scope.id = employee.id;
			$scope.username = employee.username;
			$scope.firstName = employee.firstName;
			$scope.lastName = employee.lastName;
			$scope.email = employee.email;
			$scope.birthDate = employee.birthDate;
			$scope.basicSalary = employee.basicSalary;
			$scope.group = employee.group;
			$scope.description = employee.description;
		};
		
		
		$scope.selectDetails= function(id){
			var index = getSelectedIndex(id);
			var employee = $scope.listEmployee[index];
			$scope.id = employee.id;
			$scope.username = employee.username;
			$scope.firstName = employee.firstName;
			$scope.lastName = employee.lastName;
			$scope.email = employee.email;
			$scope.birthDate = employee.birthDate;
			$scope.basicSalary = employee.basicSalary;
			$scope.group = employee.group;
			$scope.description = employee.description;
		};

		$scope.del = function(id){
			var result = confirm('Apakah anda yakin ingin menghapus?');
			if(result===true){
			var index = getSelectedIndex(id);
			$scope.listEmployee.splice(index, 1);

			}
		};

		function getSelectedIndex(id) {
			for(var i=0; i<$scope.listEmployee.length; i++)
				if($scope.listEmployee[i].id==id)
					return i;
				return -1;
		}
	});
  
  
})();