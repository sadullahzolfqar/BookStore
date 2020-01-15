angular.module('kitap_app')
.factory("YazarService", ["$http", function ($http) {

    var facktor = {};
    var urlAdress = 'http://localhost:5000/api/Yazar';

    facktor.GetAll = function () {
        return $http.get(urlAdress);
    }

    facktor.GetById = function (Id) {
        return $http.get(urlAdress +'/'+ Id);
    }


    facktor.Add = function (item){
        return $http.post(urlAdress, item);
    }

    facktor.Update = function (item)
    {
       return  $http({
            method: "put",
            url: urlAdress + '/' + item.id,
            data: item
        });
        
    }

    facktor.Delete=function(Id)
    {
        return $http({
            method: "Delete",
            url: urlAdress + '/' + Id
        });
    }
   
   
    //
    facktor.CheckTCKN=function(item)
    {
        let result=true;
        if(item.sTckn)
        {
            result=item.sTckn.toString().length==11 ? true : false;
        }
        else{
            result=true;
        }

        return result;
    }

    facktor.StrToDate=function(str){
        let splitstr=str.split('T');
        let _date=splitstr[0];
        let splatedate=_date.split('-');

        return new Date(splatedate[0], splatedate[1], splatedate[2]);
    }

    return facktor;

}])


.factory("KategoriService", ["$http", function ($http) {

    var facktor = {};
    var urlAdress = 'http://localhost:5000/api/kategori';

    facktor.GetAll = function () {
        return $http.get(urlAdress);
    }

    facktor.GetById = function (Id) {
        return $http.get(urlAdress +'/'+ Id);
    }


    facktor.Add = function (item){
        return $http.post(urlAdress, item);
    }

    facktor.Update = function (item)
    {
       return  $http({
            method: "put",
            url: urlAdress + '/' + item.id,
            data: item
        });
        
    }

    facktor.Delete=function(Id)
    {
        return $http({
            method: "Delete",
            url: urlAdress + '/' + Id
        });
    }
   
   
    //

    facktor.StrToDate=function(str){
        let splitstr=str.split('T');
        let _date=splitstr[0];
        let splatedate=_date.split('-');

        return new Date(splatedate[0], splatedate[1], splatedate[2]);
    }

    return facktor;

}])



.factory("KitapService", ["$http", function ($http) {

    var facktor = {};
    var urlAdress = 'http://localhost:5000/api/kitap';

    facktor.GetAll = function () {
        return $http.get(urlAdress);
    }

    facktor.GetById = function (Id) {
        return $http.get(urlAdress +'/'+ Id);
    }


    facktor.Add = function (item){
        return $http.post(urlAdress, item);
    }

    facktor.Update = function (item)
    {
       return  $http({
            method: "put",
            url: urlAdress + '/' + item.id,
            data: item
        });
        
    }

    facktor.Delete=function(Id)
    {
        return $http({
            method: "Delete",
            url: urlAdress + '/' + Id
        });
    }
   
   
    //

    facktor.StrToDate=function(str){
        let splitstr=str.split('T');
        let _date=splitstr[0];
        let splatedate=_date.split('-');

        return new Date(splatedate[0], splatedate[1], splatedate[2]);
    }

    return facktor;

}])



.factory("HomeService", ["$http", function ($http) {

    var facktor = {};
    var urlAdress = 'http://localhost:5000/api';

    facktor.GetKitapCount = function () 
    {
        return $http.get(urlAdress+'/kitap/GetCount');
    }

    facktor.GetYazarCount = function () 
    {
        return $http.get(urlAdress+'/Yazar/GetCount');
    }

    facktor.GetKategoriCount = function () 
    {
        return $http.get(urlAdress+'/kategori/GetCount');
    }

    return facktor;

}]);
