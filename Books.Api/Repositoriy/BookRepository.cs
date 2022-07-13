using Books.Api.Models;
using Dapper;
using Dapper.Contrib;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Books.Api.Repositoriy
{
    public class BookRepository : IBookRepository
    {

        private IDbConnection db;

        public BookRepository(IConfiguration configuration)
        {
            this.db = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        public async Task<Book> Add(Book book)
        {
            try
            {
                var id = await this.db.InsertAsync(book);
                book.Id = (int)id;
            }
            catch (System.Exception ex)
            {
                var ext = ex.Message;
                
            }
            
            
            return book;
        }

        public async Task<Book> Find(int id)
        {
            return await this.db.GetAsync<Book>(id);
        }

        public async Task<IEnumerable<Book>> GetAll()
        {
            var sql = "SELECT * FROM Books";
            var resault = await this.db.QueryAsync<Book>(sql);
            return resault.ToList();
        }

        /// <summary>
        /// Return books with authors
        /// </summary>
        /// <returns></returns>
        public async Task<IList<Book>> GetAllBooksWithAuthors()
        {
            var sql = "SELECT B.Id, B.Title, B.PublishDate, B.ShortDescription, B.Active,A.Id , A.FirstName, A.LastName, A.About, A.Active " +
                "FROM Books AS B " +
                "INNER JOIN Book_Authors as BA  ON B.Id = BA.BookId " +
                "INNER JOIN Authors AS A ON BA.AuthorId = A.Id"; 

            var bookDict = new Dictionary<int, Book>(); 

            var books =await this.db.QueryAsync<Book ,Author , Book>(sql, (book, author) =>
            {
                if (!bookDict.TryGetValue(book.Id, out var currentBook))
                {
                    currentBook = book;
                    bookDict.Add(currentBook.Id, currentBook);
                }
                currentBook.Authors.Add(author);
                return currentBook;
            }, splitOn:"Id, Id");
            return books.Distinct().ToList();
        }
        /// <summary>
        /// Get book with all authors
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Book> GetFullBook(int id)
        {
            var sql =
               "SELECT * FROM Books AS B  where B.Id = @Id; " +
               "SELECT * FROM Book_Authors AS BA " +
               "INNER JOIN Authors AS  A ON BA.AuthorId = A.Id " +
               "WHERE BA.BookId = @Id;";

            using (var multipleResult = await this.db.QueryMultipleAsync(sql, new { Id = id }))
            {
                var book = (await multipleResult.ReadAsync<Book>()).SingleOrDefault();
                var authors = (await multipleResult.ReadAsync<Author>()).ToList();

                if (book != null && authors != null)
                {
                    book.Authors.AddRange(authors);
                }
            
                return book;

            }
        }

        public async Task Remove(int id)
        {
            // await this.db.DeleteAsync(new Book { Id = id });

            var prod = await Find(id);
            //if (prod != null) this.db.Update<Book>(new Book { })
            if (prod != null) this.db.Execute("UPDATE Books SET Active = 0 where  Id = @Id", new {Id = id});

        }

        

        public Task<Book> Update(Book book)
        {
            throw new System.NotImplementedException();
        }
    }
}
