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
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet("GetAll")]
        public async Task<IEnumerable<Book>> Get()
        {
            return await _bookRepository.GetAllBooksWithAuthors();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<Book> Get(int id)
        {
            return await _bookRepository.GetFullBook(1);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
