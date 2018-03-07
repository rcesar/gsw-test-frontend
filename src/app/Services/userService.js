App.service('userService', function($http, $rootScope){
    this.token;
    this.user = {};

    this.clearData = function(){
        this.token = undefined;
        this.user = {};
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        $rootScope.go('single.login');
    }

    this.initService = function(){
        var token = localStorage.getItem('token');
        var user;
        var self = this;

        if(localStorage.getItem('user'))
           user = JSON.parse(localStorage.getItem('user'));
    
        if(token)
            this.setToken(token);

        if(user){
            this.updateUser(user);

            $http.get('http://localhost:3000/api/accounts/' + user._id).then(function(data){
                self.updateUser(data.data[0]);
            })
        }
    }

    

    this.setInfos = function(infos){
        var token = infos.token;
        var user = JSON.stringify(infos.user);

        localStorage.setItem('token', token);
        localStorage.setItem('user', user);

        this.setToken(token);
        this.updateUser(infos.user);
    }

    this.setToken = function(token){
        this.token = token;
    }

    this.updateUser = function(updateData){
        this.user = Object.assign(this.user, updateData);
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    this.initService();
})