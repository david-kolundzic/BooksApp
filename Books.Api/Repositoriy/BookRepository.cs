using Books.Api.Models;
using Dapper;
using Dapper.Contrib;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

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

        public async Task<IEnumerable<TrackChanges>> GetTracks()
        {
            var r = await this.db.QueryAsync<TrackChanges>("SELECT * FROM Track_Changes");
                return r.ToList();
        }

        public async Task<Book> Find(int id)
        {
            var resault = await this.db.QueryAsync<Book>("SELECT * FROM Book WHERE Id = @Id", new { Id = id });
            return resault.SingleOrDefault();
        }

        public async Task<IEnumerable<Book>> GetAll()
        {
            var sql = "SELECT * FROM Book";
            var resault = await this.db.QueryAsync<Book>(sql);
            return resault.ToList();
        }

        /// <summary>
        /// Return books with authors
        /// </summary>
        /// <returns></returns>
        public async Task<IList<Book>> GetAllBooksWithAuthors()
        {
            var sql = "SELECT B.Id, B.Title, B.PublishDate, B.ShortDescription, B.Image ,A.Id , A.Name,  A.Link " +
                "FROM Book AS B " +
                "INNER JOIN Book_Author as BA  ON B.Id = BA.BookId " +
                "INNER JOIN Author AS A ON BA.AuthorId = A.Id"; 

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
               "SELECT * FROM Book AS B  where B.Id = @Id; " +
               "SELECT * FROM Book_Author AS BA " +
               "INNER JOIN Author AS  A ON BA.AuthorId = A.Id " +
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

            using (var txScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var checkIfExistInParent = await this.db.QueryAsync("select * from Book_Author where  BookId = @Id", new { Id = id });

                if (checkIfExistInParent != null)
                {
                    foreach (var item in checkIfExistInParent)
                    {
                        await this.db.ExecuteAsync("DELETE FROM  Book_Author where  BookId = @Id", new { Id = id }).ConfigureAwait(false);

                    }
                }
                await this.db.ExecuteAsync("DELETE FROM Book WHERE Id = @Id", new { id });

                txScope.Complete();
            }

        }

        

        public async Task<Book> Update(Book book, string user = null)
        {
            
            using (var txScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {

                
                var sql = "";
                if (book.IsNew)
                {
                    //var param = new {}
                    sql = "INSERT INTO Book (Title,ShortDescription,PublishDate) values (@Title, @ShortDescription, @PublishDate)" +
                        "select cast(SCOPE_IDENTITY() AS int)";
                    var ident =   await this.db.QuerySingleAsync<int>(sql, book);
                    foreach (var author in book.Authors)
                    {
                        if (author != null)
                        {
                            await this.db.QueryAsync("INSERT INTO Book_Author (BookId,AuthorId) values (@BookId, @AuthorId)", new { BookId=ident, AuthorId = author.Id}).ConfigureAwait(false);
                        }

                    }
                }
                else
                {
                    var temp = await this.db.QueryFirstOrDefaultAsync<Book>("SELECT * FROM Book where Id = @Id", new { Id = book.Id });
                    if (temp != null)
                    {
                        var param = new { Title = temp.Title, Description = temp.ShortDescription, IdBook = book.Id, Changed = DateTime.Now, UserName = "Jhon (hard-code)" };

                        var query = "INSERT INTO Track_Changes (Title, Description, IdBook, Changed, UserName)  values ( @Title, @Description, @IdBook, @Changed, @UserName); " +
                            "SELECT CAST(SCOPE_IDENTITY() as int)";
                        await this.db.QueryAsync<int>(query, param);
                    }
                    book.PublishDate = DateTime.Now;
                    sql = "UPDATE Book SET Title = @Title, ShortDescription = @ShortDescription, PublishDate = @PublishDate , Image = @Image WHERE Id = @Id";
                    await this.db.ExecuteAsync(sql, book);

                }


                txScope.Complete();
            }
           
            return book;
        }

    }
}
