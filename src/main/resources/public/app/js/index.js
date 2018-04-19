(function() {
  'use strict';

  function WebAppConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/signin', {
      templateUrl : 'app/signing/signin.html',
      controller : 'LoginController as $ctrl'
    }).when('/signout', {
      templateUrl : 'app/signing/signout.html',
      controller : 'LogoutController as $ctrl'
    }).when('/users', {
      templateUrl : 'app/user/user-list.html',
      controller : 'UserListController as $ctrl'
    }).when('/', {
      templateUrl : 'main.html'
    }).otherwise('/');
  }

  angular.module('WebApp', [ 'ngRoute', 'ngResource', 'ng' ])

  .config([ '$locationProvider', '$routeProvider', WebAppConfig ])

  .run(function($http, $rootScope) {
    self.user = {};
    $http.get('webservices/users/me').then(function(response) {
      self.user.name = response.data.name;
      self.user.info = response.data;
      self.user.menu = [];
      for (var index = 0; index < self.user.info.authorities.length; index++) {
        if (self.user.info.authorities[index].authority == 'ADMIN') {
          self.user.menu.push({
            'title' : 'Users',
            'url' : '#!/users'
          });
        }
      }
      self.user.menu.push({
        'title' : 'Signout',
        'url' : '#!/signout'
      });
      $rootScope.user = self.user;
    }, function(response) {
      $rootScope.user = {
        'menu' : [ {
          'title' : 'Signin',
          'url' : '#!/signin'
        } ]
      };
    });

  });

}());

(function() {
  'use strict';

  function LoginController($http, $location, $rootScope) {
    var self = this;
    self.user = {};

    self.login = function(formInvalid) {
      self.user.error = null;
      if (formInvalid) {
        return;
      }
      $http.post('login',
          'username=' + self.user.name + '&password=' + self.user.password + '&remember-me=' + self.user.rememberme, {
            headers : {
              "Content-Type" : "application/x-www-form-urlencoded"
            }
          }).then(self.loginSuccess, self.loginFailure);
    }

    self.loginSuccess = function(response) {
      self.user.info = response.data;
      self.user.menu = [];
      for (var index = 0; index < self.user.info.authorities.length; index++) {
        if (self.user.info.authorities[index].authority == 'ADMIN') {
          self.user.menu.push({
            'title' : 'Users',
            'url' : '#!/users'
          });
        }
      }
      self.user.menu.push({
        'title' : 'Signout',
        'url' : '#!/signout'
      });
      $rootScope.user = self.user;
      $location.path('/');
    }

    self.loginFailure = function(response) {
      self.user.error = response.data.message;
      alert(response.data.message);
    }
  }

  angular.module('WebApp').controller('LoginController', [ '$http', '$location', '$rootScope', LoginController ]);

}());

(function() {
  'use strict';

  function LogoutController($http, $location, $rootScope) {
    var self = this;

    self.init = function() {
      if ($rootScope.user.name) {
        $http.post('logout').then(self.logoutSuccess, self.logoutFailure);
      }
    }

    self.logoutSuccess = function(response) {
      $rootScope.user = {
        'menu' : [ {
          'title' : 'Signin',
          'url' : '#!/signin'
        } ]
      };
    }
    self.logoutFailure = function(response) {
      self.user.error = response.data.message;
      alert(response.data.message);
    }

    self.init();
  }

  angular.module('WebApp').controller('LogoutController', [ '$http', '$location', '$rootScope', LogoutController ]);

}());

(function() {
  'use strict';

  function UserService($resource) {
    return $resource('webservices/users/:id');
  }

  angular.module('WebApp').factory('UserService', [ '$resource', UserService ]);

}());

(function() {
  'use strict';

  function UserListController($http, $location, userService) {
    var self = this;

    self.init = function() {
      var users = userService.get(function() {
        self.items = users.data;
      }, function(response) {
        alert('Error: ' + response.data.message);
      });
    }

    self.refresh = function() {
      self.init();
    }

    self.remove = function() {
      self.init();
    }

    self.removeAll = function() {
      self.init();
    }

    self.init();
  }

  angular.module('WebApp')
      .controller('UserListController', [ '$http', '$location', 'UserService', UserListController ]);

}());
