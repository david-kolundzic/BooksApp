using Books.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Books.Api.Repositoriy
{
    public interface IBookRepository
    {
        Task<Book> Find(int id);
        
        Task<IEnumerable<Book>> GetAll();
        Task<Book> Add(Book book);
        Task<Book> Update(Book book);

        void Task<Remove>(int id);

        Task<Book> GetFullBook(int id);

        Task<IList<Book>> GetAllBooksWithAuthors();

    }
}
