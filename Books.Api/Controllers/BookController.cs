using Books.Api.Models;
using Books.Api.Repositoriy;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Books.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepo;

        public BookController(IBookRepository bookRepository)
        {
            _bookRepo = bookRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet("GetAll")]
        public async Task<IEnumerable<Book>> Get()
        {
            var books= await _bookRepo.GetAllBooksWithAuthors();
            var trackingChanges = await _bookRepo.GetTracks();



            foreach (var book in books)
            {
               book.BooksHistory.AddRange( trackingChanges.Where(t => t.IdBook == book.Id ).OrderByDescending(c=>c.Changed));
            }

            return books;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<Book> Get(int id)
        {
            return await _bookRepo.GetFullBook(id);
        }

        // POST api/<ValuesController>
        [HttpPost("Update")]
        public async Task<Book> Update(Book book)
        {
            
            await _bookRepo.Update(book, "jon2");

            return book;
        }

        // PUT api/<ValuesController>/5
        [HttpPut]
        public void Put(Book book )
        {
            var added = _bookRepo.Add(book);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async void Remove(int id)
        {
            await _bookRepo.Remove(id);
        }
    }
}
