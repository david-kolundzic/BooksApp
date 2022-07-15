using System;

namespace Books.Api.Models
{
    public class TrackChanges
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime Changed { get; set; }
        public int IdBook { get; set; }
        public string UserName { get; set; }
    }
}
