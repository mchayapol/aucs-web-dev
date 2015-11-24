var app = angular.module("app", []);

app.controller("CustomersController", function ($scope, $http) {
    $scope.BusinessName = '';
    $scope.Name = '';
    $scope.Phone = '';
    $scope.customers = [];
    // Only work with some protocols but not local access.
    $http.get("http://washever.azurewebsites.net/api/Customers")
        .then(function (response) {
            $scope.customers = response.data;
            console.log(response.data);
        });



    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editCustomer = function (id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.BusinessName = '';
            $scope.Name = '';
            $scope.Phone = '';
        } else {
            $scope.edit = false;
            $scope.businessName = $scope.customer[id - 1].businessName;
            $scope.Name = $scope.users[id - 1].Name;
            $scope.Phone = $scope.users[id - 1].Phone;
        }
    };

    $scope.$watch('BusinessName', function () { $scope.test(); });
    $scope.$watch('Name', function () { $scope.test(); });
    $scope.$watch('Phone', function () { $scope.test(); });
    $scope.test = function () {
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.BusinessName.length || !$scope.Name.length || !$scope.Phone.length)) {
            $scope.incomplete = true;
        }
    };
    $scope.addNew = function () {
        if (!$scope.incomplete)
            // POST it to the server
            $scope.customers.push({
                id: $scope.customers.length,
                BusinessName: $scope.BusinessName,
                Name: $scope.Name,
                Phone: $scope.Phone
            });
    };

});
