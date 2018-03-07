var App = angular.module('GSW-ATM', ['ui.router', 'ui.bootstrap']);

App.run(function ($transitions, $rootScope, userService, $state) {
    $rootScope.go = function (route, params) {
        $state.go(route, params, {
            cache: false
        });
    };

    $rootScope.logout = function(){
        userService.clearData();
    }

    $transitions.onBefore({}, function (transition) {
        // check if the state should be protected
        if (transition.to().views.app){
            if (transition.to().url == undefined || transition.to().views.app.private == false) { return };
            if (transition.to().views.app.private == true) {
                if (!userService.token) {
                    return transition.router.stateService.target('single.login');
                } else {
                    console.log(userService);
                }
            }
        }
        
    });
})

App.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('tokenInjector');
    console.log('config');
    $urlRouterProvider.otherwise("/app/home");
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            cache: true,
            templateUrl: './app/Components/commom/main.html'
        })

        .state('single', {
            url: '/single',
            cache: false,
            abstract: true,
            templateUrl: './app/Components/commom/single.html'
        })

        .state('single.login', {
            url: '/login',
            cache: false,
            views: {
                'single': {
                    templateUrl: './app/Components/login/login.html',
                    controller: 'LoginController',
                    private:false
                }
            }
        })

        .state('single.sign', {
            url: '/sign',
            cache: false,
            views: {
                'single': {
                    templateUrl: './app/Components/sign/sign.html',
                    controller: 'SignController',
                    private: false
                }
            }
        })
        
        .state('app.home', {
            url: '/home',
            cache: false,
            views: {
                'app': {
                    templateUrl: './app/Components/home/home.html',
                    controller: 'HomeController',
                    private: true
                }
            }
        })
})