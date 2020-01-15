using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    [Table("yazar")]
    public class Yazar
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Yazar Adi Gerekli")]
        [StringLength(60, ErrorMessage = "Yazar Adi En Fazla 60 Karakter Olabilir.")]
        public string sAdi { get; set; }

        [Required(ErrorMessage = "Yazar Adi Gerekli")]
        [StringLength(60, ErrorMessage = "Yazar Adi En Fazla 60 Karakter Olabilir.")]
        public string sSoyadi { get; set; }

        [StringLength(11, ErrorMessage = "Yazar Adi En Fazla 60 Karakter Olabilir.")]
        public string sTckn{get;set;}

        //[StringLength(max, ErrorMessage = "Yazar Adi En Fazla 60 Karakter Olabilir.")]
        public string sYazarHakkinda { get; set; }

        public DateTime dtDogumTarih { get; set; }


        public DateTime dtCreate{get;set;}
        public DateTime dtLastUpdate{get;set;}

        public bool isDelet{get;set;}
    }
}