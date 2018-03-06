var myApp = angular.module('nodeTodo', []);
myApp.controller('mainController', function($scope, $http){
    $scope.formData = [];
    $scope.ing = [];
    $scope.exc = [];
    $scope.ingRecipeData = {};
    $scope.ingWithExcRecipeData = {};
    $scope.text1 = 'Boneless';
    $scope.text2 = 'Peeler';
    $scope.text3 = 'Macaroni';
    $scope.text4 = 'Pitted';

    $scope.calling = function(){
        $scope.formData.push($scope.text1);
        $scope.formData.push($scope.text2);
        console.log($scope.formData);
        $http.get('/searchByIngredients/'+ $scope.formData).success(function(data){
            $scope.formData = [];
            $scope.ingRecipeData = data;
            console.log("return data",$scope.ingRecipeData);

        })
    };
    $scope.exclusion = function(){
        $scope.ing.push($scope.text1, $scope.text2);
        $scope.exc.push($scope.text3, $scope.text4);
        $http.get('/searchWithExclusion/'+ $scope.ing+'/'+$scope.exc).success(function(data){
            $scope.ing = [];
            $scope.exc = [];
            $scope.ingWithExcRecipeData = data;
            console.log("return data",$scope.ingWithExcRecipeData);

        })
    }
});
