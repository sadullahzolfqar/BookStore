using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    [Table("kitap")]
    public class Kitap
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Kitap Adi Gerekli")]
        [StringLength(120, ErrorMessage = "Kitap Adi En Fazla 120 Karakter Olabilir.")]
        public string sKitapAdi { get; set; }

        [Required(ErrorMessage = "ISBN Gerekli")]
        [StringLength(13, ErrorMessage = "ISBN En Fazla 13 Karakter Olabilir.")]
        public string sISBN { get; set; }

        [Required(ErrorMessage = "Aciklama Gerekli")]
        [StringLength(200, ErrorMessage = "Aciklama En Fazla 200 Karakter Olabilir.")]
        public string sAciklama { get; set; }

        public DateTime dtYayinTarihi{get;set;}
        public decimal ldKitapFiyat{get;set;}

        [ForeignKey(nameof(Kategori))]
        public int? KategoriId { get; set; }
        public Kategori Kategori { get; set; }

        [ForeignKey(nameof(Yazar))]
        public int? YazarId { get; set; }
        public Yazar Yazar { get; set; }

        public DateTime dtCreate{get;set;}
        public DateTime dtLastUpdate{get;set;}

        public bool isDelet{get;set;}
    }
}