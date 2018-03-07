App.controller('LoginController', function ($scope, $rootScope, $http, userService) {
    $scope.login = {
        user:'',
        password:''
    };

    $scope.send = function(){
        $http.post('http://localhost:3000/api/auth/login', $scope.login).then(function(data){
            userService.setInfos(data.data);
            $rootScope.go('app.home');
        }).catch(function(err){
            swal({
                title: 'Houve um Problema',
                text: err.data.message,
                type: 'error'
            })
        })
    }
});