using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services.contracts
{
    public interface  IKitapService:IRepository<Kitap>
    {
          Task<List<Kitap>> GetAllKitap();
          Task<Kitap> GetKitap(int id);
    }
}