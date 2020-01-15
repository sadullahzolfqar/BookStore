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
    public class KategoriController:ControllerBase
    {
        private readonly IKategoriService _kategoriService;

        public KategoriController(IKategoriService kategoriService)
        {
            _kategoriService=kategoriService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kategori>>> GetAll()
        {
            return await _kategoriService.GetAll();
        }

        [HttpGet]
        [Route("GetCount")]
        public async Task<ActionResult<int>> GetCount(){
            return await _kategoriService.Count();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kategori>> Get(int id)
        {
            var kategori = await _kategoriService.Get(id);
            if (kategori == null)
            {
                return NotFound();
            }
            return kategori;
        }


        [HttpPost]
        public async Task<ActionResult<Kategori>> Post(Kategori kategori)
        {
            kategori.dtCreate=DateTime.Now;
            kategori.dtLastUpdate=DateTime.Now;
            kategori.isDelet=false;
            await _kategoriService.Add(kategori);

            return CreatedAtAction("Get", new { id = kategori.Id }, kategori);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Kategori kategori)
        {
            Kategori kategoriUpdate = await _kategoriService.Get(id);
            if (id != kategori.Id)
            {
                return BadRequest();
            }
            
            kategoriUpdate.sAdi=kategori.sAdi;
            kategoriUpdate.sKodu=kategori.sKodu;
            kategoriUpdate.dtLastUpdate=DateTime.Now;

            await _kategoriService.Update(kategoriUpdate);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Kategori>> Delete(int id)
        {
            var kategori = await _kategoriService.Delete(id);
            if (kategori == null)
            {
                return NotFound();
            }
            return kategori;
        }
    }   
    
}