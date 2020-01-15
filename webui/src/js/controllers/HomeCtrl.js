angular.module('kitap_app')
.controller('HomeCtrl', [
    '$scope','HomeService',
    function($scope,HomeService,$timout) {


        HomeService.GetKitapCount().then(function(response){
            
            $scope.KitapCount= response.data;
        },function(){
            alert("Error");
        });


        HomeService.GetYazarCount().then(function(response){
            
            $scope.YazarCount= response.data;
        },function(){
            alert("Error");
        });

        HomeService.GetKategoriCount().then(function(response){
            
            $scope.KategoriCount= response.data;
        },function(){
            alert("Error");
        });;


    }
]);