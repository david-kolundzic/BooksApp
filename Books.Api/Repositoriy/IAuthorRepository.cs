using Books.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Books.Api.Repositoriy
{
    public interface IAuthorRepository
    {
        Task<Author> Find(int id);
        Task<Author> Add(Author author);
      
        Task<IEnumerable<Author>> GetAll();
        Task Remove(int id);
        Task<Author> Update(Author author);
    }
}
