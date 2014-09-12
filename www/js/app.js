// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //$cordovaSplashScreen.hide();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('eventmenu.newtask', {
      url:"/newtask",
      views: {
	   'menuContent':{
			templateUrl: "templates/new-task.html",
                        controller: "AddTask"
 	 	}    
          }
     })
    .state('eventmenu.viewtask', {
	url:"/viewtask",
        views:{
           'menuContent': { 
            	templateUrl: "templates/view-task.html"  
           }
        }
     })
    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/home");
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
   
  $scope.tasks = [
                { title: "Meeting At 10pm", desc: "I have meeting on ABC place at 10pm with Mr.XYZ." },
                { title: "Go to Watch Movie", desc: "I have to schedule for movie 1t 9am." }
        ];
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
	
  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

})

.controller('ViewTask', function($scope){
      


})

.controller('AddTask', function($scope){
   $scope.showForm = true;
   $scope.taskinfo = {};
   $scope.submit = function(){
     if(!$scope.taskinfo.title) {
	alert('Info Required');
        return;
     }
     $scope.showForm = false;
     $scope.tasks.push($scope.taskinfo);

  };

})

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };
  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});
