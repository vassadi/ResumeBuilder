// Define a new module for our app
var app = angular.module("resumeBuilder", []),
tempVar = '';

app.directive("mouseclick",function(){
    return function(scope,element,attrs){
        element.bind("mousedown",function(){
              scope.showProficiency(attrs);
        });
        element.bind("mouseup",function(){
              scope.showSkill(attrs);
        });
    };
});

app.factory('profileService', function ($http) {
        return {
            // 1st function
            getProfileDetails: function () {
                return $http.get('./data/details.json').then(function (response) {
                    return response.data;
                });
            }
        };
    });

app.filter('randomize', function() {
  return function(input) {
    if (input!== null && input!== undefined && input > 1) {
      return Math.floor((Math.random()*input)+1);
    }
  };
});

/**
 * initLoadController This controller loads the profile data and populates in the page
 * @param  {[type]} $scope         Scope
 * @param  {[type]} profileService Factory service to read the data.
 * @return {[type]}
 */
 app.controller('initLoadController', ['$scope', 'profileService', function($scope, profileService) {
   console.log('Loading configuration....');
   $scope.configs = loadInitConfigs();
   var profileData = profileService.getProfileDetails();
   profileData.then(function (result) {
     $scope.skills = result.skills;
     $scope.events = result.timeline;
     $scope.projects = result.projects;
   });

   $scope.showProficiency = function (element) {
     tempVar = element.$$element[0].textContent;
     element.$$element[0].textContent = element.ariaLabel;
     element.$$element[0].style.fontSize = '28px';
   };

   $scope.showSkill = function (element) {
     element.$$element[0].style.fontSize = '16px';
     element.$$element[0].textContent = tempVar;
   };
 }]);

function loadInitConfigs() {
  var obj = {
    'bgColors': [
      'blueviolet', 'darkmagenta',
      '-webkit-radial-gradient(10% 24%, circle, #67caff, #004469 70%)',
      '-webkit-linear-gradient(314deg, #0000FF 35%, #000000 100%)',
       'chocolate',
      '-webkit-linear-gradient(314deg, #F7D40F 1%, #D10000 100%)',
      '-webkit-linear-gradient(315deg, #00BF00 0%, #000000 100%)',
      'crimson',
      '-webkit-linear-gradient(315deg, darkcyan 0%, #000000 100%)',
      '-webkit-linear-gradient(315deg, #FF3729 0%, #000000 100%)']
  };
  return obj;
}
