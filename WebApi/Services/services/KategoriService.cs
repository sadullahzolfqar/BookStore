
using WebApi.Context;
using WebApi.Models;
using WebApi.Services.contracts;

namespace WebApi.Services.services
{
    public class KategoriService:CoreRepository<Kategori>,IKategoriService
    {
        public KategoriService(KitapContext dbContext):base(dbContext)
        {

        }
    }
}