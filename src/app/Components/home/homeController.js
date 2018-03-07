App.controller('HomeController', function ($scope, $rootScope, $http, userService, $uibModal) {
    $rootScope.user = userService.user;
    $rootScope.user.initial = $rootScope.user.name.substr(0,1).toUpperCase();
    $scope.withdraws = [];

    $scope.getLastTransactions = function () {
        $http.get('http://localhost:3000/api/withdraw').then(function (data) {
            $scope.withdraws = data.data;
            // $scope.$apply();
        }).catch(function (err) {
            console.error(err);
        })
    };

    $scope.getLastTransactions();

    $scope.openWithdraw = function(){
    
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'withdraw.html',
            size: 'md',
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function(){
                    $uibModalInstance.close($scope.value);
                }
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function (value) {
            if(value){
                $http.post('http://localhost:3000/api/withdraw', {value:value}).then(function(data){
                    var update = { balance: data.data.newBalance};
                    userService.updateUser(update);
                    $scope.getLastTransactions();
                    
                    var text = "Aqui estão suas notas: <br/> <br/>";

                    for(i in data.data.notes){
                        value = data.data.notes[i]
                        if(value > 0){
                            text += "<b>" + value + "</b> Notas de <b>R$" + i + ",00 </b></br>";

                        }
                    }

                    text += "<br/> Obrigado!";

                    console.log(text);

                    swal({
                        title: 'Saque efetuado com sucesso',
                        html:text,
                        type: 'success'
                    })
                }).catch(function(err){
                    console.error(err);
                    swal({
                        title:'Houve um Problema',
                        text:err.data.message,
                        type:'error'
                    })
                })
            }
        });
    }

    $scope.openDeposit = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deposit.html',
            size: 'md',
            controller: function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    $uibModalInstance.close($scope.value);
                }
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function (value) {
            console.log(value)
        });
    }
});