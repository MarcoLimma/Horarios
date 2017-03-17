'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'appDirectives', 'toastr']);

app.config(['$locationProvider', '$routeProvider',
    function ($location, $routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.index.html',
                controller: 'HomeCtrl'
            }).
            when('/trajetos', {
                templateUrl: 'partials/home.index.html',
                controller: 'HomeCtrl'
            }).
            when('/horarios', {
                templateUrl: 'partials/home.index.html',
                controller: 'HomeCtrl'
            }).
            when('/sobre', {
                templateUrl: 'partials/sobre.html',
                controller: 'HomeCtrl'
            }).
            when('/admin', {
                templateUrl: 'partials/admin.index.html',
                controller: 'AdminCtrl',
                access: { requiredAuthentication: true }
            }).
            when('/admin/register', {
                templateUrl: 'partials/admin.register.html',
                controller: 'AdminUserCtrl'
            }).
            when('/admin/login', {
                templateUrl: 'partials/admin.signin.html',
                controller: 'AdminUserCtrl'
            }).
            when('/admin/logout', {
                templateUrl: 'partials/admin.logout.html',
                controller: 'AdminUserCtrl',
                access: { requiredAuthentication: true }
            }).
            when('/admin/onibus', {
                templateUrl: 'partials/admin.onibus.list.html',
                controller: 'OnibusCtrl',
                access: { requiredAuthentication: true }
            }).
            when('/admin/onibus/create', {
                templateUrl: 'partials/admin.onibus.create.html',
                controller: 'OnibusCtrl',
                access: { requiredAuthentication: true }
            }).
            when('/admin/onibus/edit/:id', {
                templateUrl: 'partials/admin.onibus.edit.html',
                controller: 'OnibusEditCtrl',
                access: { requiredAuthentication: true }
            }).
            when('/admin/trajeto', {
                templateUrl: 'partials/admin.index.html',
                controller: 'AdminCtrl',
                access: { requiredAuthentication: true }
            }).
            when('/admin/ponto', {
                templateUrl: 'partials/admin.index.html',
                controller: 'AdminCtrl',
                access: { requiredAuthentication: true }
            }).
            otherwise({
                redirectTo: '/'
            });

        $location.hashPrefix('');
    }]);


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function ($rootScope, $location, $window, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
            && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {

            $location.path("/admin/login");
        }

        $rootScope.isAuthenticated = $window.sessionStorage.token == undefined ? false : true;
    });

    $rootScope.isActivePage = function (viewLocation) {
        return viewLocation === $location.path();
    };

});

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });
});

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1500,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: true,
        tapToDismiss: false,
        timeOut: 2000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
});

