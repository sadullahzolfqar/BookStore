angular.module('kitap_app')
.controller('YazarCtrl', [
    '$scope','YazarService',
    function($scope,YazarService,$timout) {

   
        $scope.itemsByPage=7;
        $scope.ListOfItems=null;
        let selectedItemId=null;

        function GetAll()
        {
            YazarService.GetAll().then(function (response) {

                $scope.ListOfItems = response.data;
               // alert("Successfully");
            }, function () {
                alert("Failed");
            });
        }

        GetAll();

        $scope.AddItem=function(){

            
            let item={
                sAdi:$scope.sAdi,
                sSoyadi:$scope.sSoyadi,
                sTckn:$scope.sTckn,
                sYazarHakkinda:$scope.sYazarHakkinda,
                dtDogumTarih:$scope.dtDogumTarih

            };

            if(YazarService.CheckTCKN(item))
            {
                YazarService.Add(item)
                            .then(function(response){
                                debugger
                                $scope.ListOfItems.unshift(response.data);
                                clearform();
                                alert("Yazar Eklendi");
                            },function(error){
                                alert("error+"+error)
                            });

            }
            else{
                alert("TCKN 11 Hanelı olmalı.");
            }
        }

        $scope.GetItemForUpdate=function(ItemId)
        {
            
            YazarService.GetById(ItemId)
                            .then(function(response){
                                debugger
                                let GetItem=response.data;
                                selectedItemId=GetItem.id;
                                $scope.UsAdi=GetItem.sAdi;
                                $scope.UsSoyadi=GetItem.sSoyadi;
                                $scope.UsTckn=GetItem.sTckn!=null? Number(GetItem.sTckn):null;
                                $scope.UsYazarHakkinda=GetItem.sYazarHakkinda;
                                $scope.UdtDogumTarih=YazarService.StrToDate(GetItem.dtDogumTarih);

                                $("#UpdateModal").modal();
                            },function(error){
                                alert("error: "+error);
                            });
        }

        $scope.UpdateItem=function()
        {
            let item={
                id:selectedItemId,
                sAdi:$scope.UsAdi,
                sSoyadi:$scope.UsSoyadi,
                sTckn:$scope.UsTckn,
                sYazarHakkinda:$scope.UsYazarHakkinda,
                dtDogumTarih:$scope.UdtDogumTarih
            };

            if(YazarService.CheckTCKN(item))
            {
                YazarService.Update(item)
                            .then(function(response){
                                debugger
                                let updateindex=$scope.ListOfItems.findIndex(x=>x.id==item.id);
                                if (updateindex > -1) {
                                    $scope.ListOfItems[updateindex].sAdi=item.sAdi;
                                    $scope.ListOfItems[updateindex].sSoyadi=item.sSoyadi;
                                    $scope.ListOfItems[updateindex].sTckn=item.sTckn;
                                    $scope.ListOfItems[updateindex].sYazarHakkinda=item.sYazarHakkinda;
                                    $scope.ListOfItems[updateindex].dtDogumTarih=item.dtDogumTarih;
                                    
                                    clearform();
                                    alert("Yazar Güncellendi.");
                                }    
                                
                            },function(error){
                                debugger
                                alert("error+"+error)
                            });

            }
            else{
                alert("TCKN 11 Hanelı olmalı.");
            }
        }

        $scope.DeleteItem=function(ItemId)
        {
            let res=confirm("Yazar Kaldirilsin mi?");

            if(res){
                YazarService.Delete(ItemId)
                                .then(function(response)
                                {
                                    debugger
                                    let deletindex=$scope.ListOfItems.findIndex(x=>x.id==ItemId);
                                    if (deletindex > -1) {
                                        $scope.ListOfItems.splice(deletindex, 1);
                                        alert("Yazar Kaldirildi.");
                                    }
                                },function(error){
                                    
                                    if(error.xhrStatus=="complete"){
                                        alert("Yazar Kullanılmaktadır.");
                                    }
                                    else{
                                        alert("Hata:"+error.xhrStatus); 
                                    }
                                    
                                });
            }
            else{

            }
        }

        function clearform()
        {
            $scope.sAdi='';
            $scope.sSoyadi='';
            $scope.sTckn='';
            $scope.sYazarHakkinda='';
            $scope.dtDogumTarih=null;

            $scope.UsAdi='';
            $scope.UsSoyadi='';
            $scope.UsTckn='';
            $scope.UsYazarHakkinda='';
            $scope.UdtDogumTarih=null;
        }

    }
]);