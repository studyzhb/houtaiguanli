var app = angular.module('starter', ['ionic','ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) { 
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// $stateProvider 只负责路由切换
.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
  


 //Modify the tabs of android display position! start
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  //Modify the tabs of android display position! end







  $stateProvider
  // tabs 选项卡
    .state('tabs',{
      url:'/tab',
      templateUrl:'templates/main.html'
    })
    .state('tabs.home',{
      url:'/home',
      views:{
        'home-home':{
          templateUrl:'templates/home.html'
        }
        
      }
      
    })
    .state('tabs.contacts',{
      url:'/contacts',
      views:{
        'home-contacts':{
          templateUrl:'templates/contacts.html'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/home');
}])
