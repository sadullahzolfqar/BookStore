
using WebApi.Context;
using WebApi.Models;
using WebApi.Services.contracts;

namespace WebApi.Services.services
{
    public class YazarService:CoreRepository<Yazar>,IYazarService
    {
        public YazarService(KitapContext dbContext):base(dbContext)
        {

        }

        // public ServiceResult AddYazar(Yazar yazar)
        // {
        //     ServiceResult result= new ServiceResult();

        //     if(await Any(x=>x.sTckn!=null && x.sTckn!=yazar.sTckn))
        //     {

        //         var resultdata= await Add(yazar);
                
        //         result.data=await Add(yazar);
        //         result.message="Yazar Eklendi.";
        //         result.result=true;
        //     }
        //     else
        //     {
        //         result.message="TCKN No Daha Onceden Kayitli. Bir Daha Deneyin.";
        //         result.result=false;
        //     }

        //     return  result;
        // }
    }
}