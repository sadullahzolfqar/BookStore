angular.module('kitap_app', [
    'ngRoute','smart-table','ngSanitize', 'ui.select'
])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'src/templates/home.html',
                controller: 'HomeCtrl',
                activetab: "home"
            }).when('/kitap', {
                templateUrl: 'src/templates/kitap.html',
                controller: 'KitapCtrl'
            }).when('/yazar', {
                templateUrl: 'src/templates/yazars.html',
                controller: 'YazarCtrl'
            }).when('/kategori', {
                templateUrl: 'src/templates/kategori.html',
                controller: 'KategoriCtrl'
            }).otherwise({
                redirectTo:'/home'
            })
    }
]);