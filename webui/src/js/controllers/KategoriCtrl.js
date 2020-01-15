angular.module('kitap_app')
.controller('KategoriCtrl', [
    '$scope','KategoriService',
    function($scope,KategoriService,$timout) {

   
        $scope.itemsByPage=7;
        $scope.ListOfItems=null;
        let selectedItemId=null;

        
        function GetAll()
        {
            KategoriService.GetAll().then(function (response) {

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
                sKodu:$scope.sKodu,
            };
            KategoriService.Add(item)
                            .then(function(response){
                                debugger
                                $scope.ListOfItems.unshift(response.data);
                                clearform();
                                alert("Kategori Eklendi");
                            },function(error){
                                alert("error+"+error)
                            });
        }

        $scope.GetItemForUpdate=function(ItemId)
        {
            
            KategoriService.GetById(ItemId)
                            .then(function(response){
                                
                                let GetItem=response.data;
                                selectedItemId=GetItem.id;
                                $scope.UsAdi=GetItem.sAdi;
                                $scope.UsKodu=GetItem.sKodu;

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
                sKodu:$scope.UsKodu
            };

            KategoriService.Update(item)
                            .then(function(response){
                                
                                let updateindex=$scope.ListOfItems.findIndex(x=>x.id==item.id);
                                if (updateindex > -1) {
                                    $scope.ListOfItems[updateindex].sAdi=item.sAdi;
                                    $scope.ListOfItems[updateindex].sKodu=item.sKodu;
                                    
                                    clearform();
                                    $("#UpdateModal").modal('toggle');
                                    alert("Kategori Güncellendi.");
                                }    
                                
                            },function(error){
                                
                                alert("error+"+error)
                            });

        }

        $scope.DeleteItem=function(ItemId)
        {
            let res=confirm("Kategori Kaldirilsin mi?");

            if(res){
                KategoriService.Delete(ItemId)
                                .then(function(response)
                                {
                                    debugger
                                    let deletindex=$scope.ListOfItems.findIndex(x=>x.id==ItemId);
                                    if (deletindex > -1) {
                                        $scope.ListOfItems.splice(deletindex, 1);
                                        alert("Kategori Kaldirildi.");
                                    }
                                },function(error){
                                    
                                    debugger
                                    if(error.xhrStatus=="complete"){
                                        alert("Kategori Kullanılmaktadır.");
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
            $scope.sKodu='';

            $scope.UsAdi='';
            $scope.UsKodu='';
        }


    }
]);