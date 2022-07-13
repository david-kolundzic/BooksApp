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
            return await _bookRepository.GetFullBook(id);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut]
        public void Put(Book book )
        {
            var added = _bookRepository.Add(book);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async void Remove(int id)
        {
            await _bookRepository.Remove(id);
        }
    }
}
