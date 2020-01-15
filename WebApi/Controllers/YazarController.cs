using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services.contracts;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ApiCorsPolicy")]
    public class YazarController:ControllerBase
    {
         private readonly IYazarService _yazarService;

        public YazarController(IYazarService yazarService)
        {
            _yazarService=yazarService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Yazar>>> GetAll()
        {
            return await _yazarService.GetAll();
        }

        [HttpGet]
        [Route("GetCount")]
        public async Task<ActionResult<int>> GetCount(){
            return await _yazarService.Count();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Yazar>> Get(int id)
        {
            var yazar = await _yazarService.Get(id);
            if (yazar == null)
            {
                return NotFound();
            }
            return yazar;
        }


        [HttpPost]
        public async Task<ActionResult<Yazar>> Post(Yazar yazar)
        {
            yazar.dtCreate=DateTime.Now;
            yazar.dtLastUpdate=DateTime.Now;
            yazar.isDelet=false;
            await _yazarService.Add(yazar);

            return CreatedAtAction("Get", new { id = yazar.Id }, yazar);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Yazar yazar)
        {
            Yazar yazarUpdate = await _yazarService.Get(id);
            if (id != yazar.Id)
            {
                return BadRequest();
            }
            
            yazarUpdate.sAdi=yazar.sAdi;
            yazarUpdate.sSoyadi=yazar.sSoyadi;
            yazarUpdate.sTckn=yazar.sTckn;
            yazarUpdate.dtDogumTarih=yazar.dtDogumTarih;
            yazarUpdate.sYazarHakkinda=yazar.sYazarHakkinda;
            yazarUpdate.dtLastUpdate=DateTime.Now;

            await _yazarService.Update(yazarUpdate);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Yazar>> Delete(int id)
        {
            var yazar = await _yazarService.Delete(id);
            if (yazar == null)
            {
                return NotFound();
            }
            return yazar;
        }
    }


}