
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models;
using WebApi.Services.contracts;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services.services
{
    public class KitapService:CoreRepository<Kitap>,IKitapService
    {
        public KitapService(KitapContext dbContext):base(dbContext)
        {

        }

        public async Task<List<Kitap>> GetAllKitap()
        {
            return await context.Kitaps.Include(x=>x.Kategori).Include(x=>x.Yazar).ToListAsync();
        }

        public async Task<Kitap> GetKitap(int id){
            return await context.Kitaps.Include(x=>x.Kategori).Include(x=>x.Yazar).FirstOrDefaultAsync(x=>x.Id==id);
        }
    }
}