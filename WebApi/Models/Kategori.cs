using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    [Table("kategori")]
    public class Kategori
    {
        public int Id { get; set; }

        [StringLength(10, ErrorMessage = "Kategori Kodu En Fazla 10 Karakter Olabilir.")]
        public string sKodu { get; set; }

        [Required(ErrorMessage = "Kategori Adi Gerekli")]
        [StringLength(60, ErrorMessage = "Kategori Adi En Fazla 60 Karakter Olabilir.")]
        public string sAdi { get; set; }

        public DateTime dtCreate{get;set;}
        public DateTime dtLastUpdate{get;set;}

        public bool isDelet{get;set;}

    }
}