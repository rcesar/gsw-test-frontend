App.factory('tokenInjector', function ($injector) {
    var tokenInjector = {
        request: function (config) {
            var userService = $injector.get('userService');
            if (userService.token) {
                if (config.url.indexOf('localhost:3000/api') > -1) {
                    // config.params = config.params || {};
                    // var params = {token:LoginService.token, executeForDomain:'BASEHODLAB'};
                    // config.params = angular.extend(config.params, params) || params;

                    config.headers = config.headers || {};
                    config.headers['Authorization'] = userService.token;
                }
            }  
            return config;
        }
    };
    return tokenInjector;
});
 