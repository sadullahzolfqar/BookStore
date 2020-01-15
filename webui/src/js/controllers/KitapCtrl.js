angular.module('kitap_app')
.controller('KitapCtrl', [
    '$scope','YazarService','KategoriService','KitapService',
    function($scope,YazarService,KategoriService,KitapService,$timout) {

        $scope.Kategoriler = null;
        GetAllKategori();
        function GetAllKategori()
         {
              KategoriService.GetAll().then(function (response) {
  
                  $scope.Kategoriler = response.data;
                 // alert("Successfully");
              }, function () {
                  alert("Failed");
              });
          }
        
          $scope.Yazarlar = null;
          GetAllYazar();
          function GetAllYazar()
          {
                YazarService.GetAll().then(function (response) {
    
                    $scope.Yazarlar = response.data;
                   // alert("Successfully");
                }, function () {
                    alert("Failed");
                });
          }

   
        $scope.itemsByPage=7;
        $scope.ListOfItems=null;
        let selectedItemId=null;
        
        $scope.kategori = {};
        $scope.yazar = {};

        function GetAll()
        {
            KitapService.GetAll().then(function (response) {

                $scope.ListOfItems = response.data;
               // alert("Successfully");
            }, function () {
                alert("Failed");
            });
        }

        GetAll();


        $scope.AddItem=function(){

            
            let item={
                sKitapAdi:$scope.sKitapAdi,
                sISBN:$scope.sISBN,
                sAciklama:$scope.sAciklama,
                ldKitapFiyat:$scope.ldKitapFiyat,
                dtYayinTarihi:$scope.dtYayinTarihi,
                kategoriId:$scope.kategori.selected.id,
                yazarId:$scope.yazar.selected.id,

            };
            debugger
            if(item.sISBN.length<=13)
            {
                KitapService.Add(item)
                            .then(function(response){
                                debugger
                                response.data.kategori=$scope.kategori.selected;
                                response.data.yazar=$scope.yazar.selected;

                                $scope.ListOfItems.unshift(response.data);
                                clearform();
                                alert("Kitap Eklendi");
                            },function(error){
                                debugger
                                alert("error+"+error)
                            });

            }
            else{
                alert("ISBN 13 Hanelı olmalı.");
            }
        }
        
        $scope.Ukategori = {};
        $scope.Uyazar = {};

        $scope.GetItemForUpdate=function(ItemId)
        {
            
            KitapService.GetById(ItemId)
                            .then(function(response){
                                debugger
                                let GetItem=response.data;
                                selectedItemId=GetItem.id;
                                $scope.UsKitapAdi=GetItem.sKitapAdi;
                                $scope.UsISBN=GetItem.sISBN;
                                $scope.UsAciklama=GetItem.sAciklama;
                                $scope.UdtYayinTarihi=YazarService.StrToDate(GetItem.dtYayinTarihi);
                                $scope.UldKitapFiyat=GetItem.ldKitapFiyat;
                                $scope.Ukategori.selected=GetItem.kategori;
                                $scope.Uyazar.selected=GetItem.yazar;

                                $("#UpdateModal").modal();
                            },function(error){
                                alert("error: "+error);
                            });
        }

        $scope.UpdateItem=function()
        {
            
            let item={
                id:selectedItemId,
                sKitapAdi:$scope.UsKitapAdi,
                sISBN:$scope.UsISBN,
                sAciklama:$scope.UsAciklama,
                ldKitapFiyat:$scope.UldKitapFiyat,
                dtYayinTarihi:$scope.UdtYayinTarihi,
                kategoriId:$scope.Ukategori.selected.id,
                kategori:$scope.Ukategori.selected,
                yazarId:$scope.Uyazar.selected.id,
                yazar:$scope.Uyazar.selected
            };

            if(item.sISBN.length<=13)
            {
                KitapService.Update(item)
                            .then(function(response){
                                debugger
                                let updateindex=$scope.ListOfItems.findIndex(x=>x.id==item.id);
                                if (updateindex > -1) {
                                    $scope.ListOfItems[updateindex].sKitapAdi=item.sKitapAdi;
                                    $scope.ListOfItems[updateindex].sISBN=item.sISBN;
                                    $scope.ListOfItems[updateindex].sAciklama=item.sAciklama;
                                    $scope.ListOfItems[updateindex].ldKitapFiyat=item.ldKitapFiyat;
                                    $scope.ListOfItems[updateindex].dtYayinTarihi=item.dtYayinTarihi;
                                    $scope.ListOfItems[updateindex].kategoriId=item.kategoriId;
                                    $scope.ListOfItems[updateindex].kategori=item.kategori;
                                    $scope.ListOfItems[updateindex].yazarId=item.yazarId;
                                    $scope.ListOfItems[updateindex].yazar=item.yazar;
                                    
                                    clearform();
                                    alert("Kitap Güncellendi.");
                                }    
                                
                            },function(error){
                                debugger
                                alert("error+"+error)
                            });

            }
            else{
                alert("ISBN 13 Hanelı olmalı.");
            }
        }


        $scope.DeleteItem=function(ItemId)
        {
            let res=confirm("Kitap Kaldirilsin mi?");

            if(res){
                KitapService.Delete(ItemId)
                                .then(function(response)
                                {
                                    debugger
                                    let deletindex=$scope.ListOfItems.findIndex(x=>x.id==ItemId);
                                    if (deletindex > -1) {
                                        $scope.ListOfItems.splice(deletindex, 1);
                                        alert("Kitap Kaldirildi.");
                                    }
                                },function(error){
                                   alert("Hata:"+error); 
                                });
            }
            else{

            }
        }

        function clearform()
        {
            $scope.sKitapAdi='';
            $scope.sISBN='';
            $scope.ldKitapFiyat='';
            $scope.sAciklama='';
            $scope.dtYayinTarihi=null;
            $scope.kategori={};
            $scope.yazar={};

            $scope.UsKitapAdi='';
            $scope.UsISBN='';
            $scope.UldKitapFiyat='';
            $scope.UsAciklama='';
            $scope.UdtYayinTarihi=null;
            $scope.Ukategori={};
            $scope.Uyazar={};
        }

    }
]);