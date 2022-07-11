namespace Books.Api.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        // Author description source...
        public string Link { get; set; }
        public string Title { get; set; }
        public string About{ get; set; }
        public int  Active { get; set; }

    }
}
