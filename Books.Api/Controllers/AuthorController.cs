using Books.Api.Models;
using Books.Api.Repositoriy;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Books.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;

        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        // GET: api/<AuthorController>
        [HttpGet("GetAll")]
        public async Task<IEnumerable<Author>> Get()
        {
            return await _authorRepository.GetAll();
        }

        // GET api/<AuthorController>/5
        [HttpGet("{id}")]
        public async Task<Author> Get(int id)
        {
            var res = await _authorRepository.Find(id);
            return res;
        }

        
        [HttpPost("Update")]
        public async Task<Author> Update(Author author)
        {
             
            var r = await _authorRepository.Update(author);
            return r;
        }

        

       [HttpPut("Create")]
       public async Task Create(Author author)
        {
            await _authorRepository.Add(author);
        }


        // DELETE api/<AuthorController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _authorRepository.Remove(id);
        }
    }
}
