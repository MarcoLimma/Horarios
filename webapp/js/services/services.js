'use strict';

var appServices = angular.module('appServices', []);

appServices.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false,
        isAdmin: false,
        currentUserId: 0
    }

    return auth;
});

appServices.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function (rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function (rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $location.path("/admin/login");
            }

            return $q.reject(rejection);
        }
    };
});

appServices.factory('UserService', function ($http) {
    return {

        read: function (id) {
            return $http.get('/user/' + id);
        },

        list: function () {
            return $http.get('/user/list');
        },

        signIn: function (username, password) {
            return $http.post('/user/signin', { username: username, password: password });
        },

        logOut: function () {
            return $http.get('/user/logout');
        },

        register: function (username, password, passwordConfirmation) {
            return $http.post('/user/register', { username: username, password: password, passwordConfirmation: passwordConfirmation });
        }
    }
});

appServices.factory('OnibusService', function ($http) {
    return {

        list: function () {
            return $http.get('/onibus/');
        },

        read: function (id) {
            return $http.get('/onibus/' + id);
        },

        create: function (onibus) {
            return $http.post('/onibus/create', { onibus });
        },

        update: function (onibus) {
            return $http.put('/onibus/', { onibus: onibus });
        },

        delete: function (id) {
            return $http.delete('/onibus/' + id);
        }
    }
});

appServices.factory('TrajetosService', function ($http) {
    return {

        get: function (url) {
            return $http.get('/trajetos/externalRequest/' + url);
        }
    }
});

appServices.factory('PontoService', function ($http) {
    return {

        list: function () {
            return $http.get('/ponto/');
        },

        read: function (id) {
            return $http.get('/ponto/' + id);
        },

        save: function (pontosAdicionados, pontosRemovidos) {
            return $http.post('/ponto/save', { pontosAdicionados: pontosAdicionados,  pontosRemovidos: pontosRemovidos });
        },

        update: function (onibus) {
            return $http.put('/ponto/', { onibus: onibus });
        },

        delete: function (id) {
            return $http.delete('/ponto/' + id);
        }
    }
});
