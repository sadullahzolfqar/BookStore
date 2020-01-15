
using WebApi.Models;
using Microsoft.EntityFrameworkCore;
 
namespace WebApi.Context
{
    public class KitapContext: DbContext
    {
        public KitapContext(DbContextOptions options)
            :base(options)
        {
        }
 
        public DbSet<Kitap> Kitaps { get; set; }
        public DbSet<Kategori> Kategories { get; set; }
        public DbSet<Yazar> Yazars { get; set; }
    }
}