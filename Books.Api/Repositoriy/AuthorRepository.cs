using Books.Api.Models;
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Books.Api.Repositoriy
{
    public class AuthorRepository : IAuthorRepository
    {
        private IDbConnection db;
        public AuthorRepository(IConfiguration configuration)
        {
            this.db = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<Author> Find(int id)
        {
            return await this.db.QueryFirstOrDefaultAsync<Author>("SELECT * FROM Author WHERE Id = @Id", new { Id = id });
           
        }

        public async Task<Author> Add(Author author)
        {
            try
            {
                var query = "INSERT INTO Author (Name, Link) VALUES (@Name, @Link); " +
                    " SELECT CAST(SCOPE_IDENTITY() as int) ";
                await this.db.QueryAsync<int>(query, author);
                //var id = await this.db.InsertAsync(author);
                //author.Id = (int)id;
            }
            catch (System.Exception ex)
            {
                var ext = ex.Message;
            }
            return author;
        }


        public async Task<IEnumerable<Author>> GetAll()
        {
            var sql = "SELECT * FROM Author";
            var resault = await this.db.QueryAsync<Author>(sql);
            return resault.ToList();
        }

        public async Task Remove(int id)
        {
            using (var txScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var checkIfExistInParent = await this.db.QueryAsync("select * from Book_Author where  AuthorId = @Id", new { Id = id });

                if (checkIfExistInParent != null)
                {
                    foreach (var item in checkIfExistInParent)
                    {
                        await this.db.ExecuteAsync("DELETE FROM  Book_Author where  AuthorId = @Id", new { Id = id }).ConfigureAwait(false);

                    }
                }
                await this.db.ExecuteAsync("DELETE FROM Author WHERE Id = @Id", new { id });

                txScope.Complete();
            }
                
           
        }

        public async Task<Author> Update(Author author)
        {
            
            var sql = "UPDATE Author SET Name = @Name, Link = @Link, WHERE Id = @Id";
            await this.db.ExecuteAsync(sql, author);
            return author;

            //await this.db.UpdateAsync(author);
            //return author;
        }
    }
}
