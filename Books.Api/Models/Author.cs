using Dapper.Contrib.Extensions;

namespace Books.Api.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
       

        [Computed]
        public bool IsNew => this.Id == default(int);
    }
}
