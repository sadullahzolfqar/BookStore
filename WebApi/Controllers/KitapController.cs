using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services.contracts;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KitapController:ControllerBase
    {
         private readonly IKitapService _kitapService;

        public KitapController(IKitapService kitapService)
        {
            _kitapService=kitapService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kitap>>> GetAll()
        {
            return await _kitapService.GetAllKitap();
        }

        [HttpGet]
        [Route("GetCount")]
        public async Task<ActionResult<int>> GetCount(){
            return await _kitapService.Count();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kitap>> Get(int id)
        {
            var kitap = await _kitapService.GetKitap(id);
            if (kitap == null)
            {
                return NotFound();
            }
            return kitap;
        }


        [HttpPost]
        public async Task<ActionResult<Kitap>> Post(Kitap kitap)
        {
            kitap.dtCreate=DateTime.Now;
            kitap.dtLastUpdate=DateTime.Now;
            kitap.isDelet=false;
            await _kitapService.Add(kitap);

            return CreatedAtAction("Get", new { id = kitap.Id }, kitap);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Kitap kitap)
        {
            Kitap kitapUpdate = await _kitapService.Get(id);
            if (id != kitap.Id)
            {
                return BadRequest();
            }
            
            kitapUpdate.sKitapAdi=kitap.sKitapAdi;
            kitapUpdate.sISBN=kitap.sISBN;
            kitapUpdate.sAciklama=kitap.sAciklama;
            kitapUpdate.dtYayinTarihi=kitap.dtYayinTarihi;
            kitapUpdate.ldKitapFiyat=kitap.ldKitapFiyat;

            kitapUpdate.KategoriId=kitap.KategoriId;
            kitapUpdate.YazarId=kitap.YazarId;

            kitapUpdate.dtLastUpdate=DateTime.Now;

            await _kitapService.Update(kitapUpdate);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Kitap>> Delete(int id)
        {
            var kitap = await _kitapService.Delete(id);
            if (kitap == null)
            {
                return NotFound();
            }
            return kitap;
        }
    }

}