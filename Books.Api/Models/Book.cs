using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;

namespace Books.Api.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime PublishDate { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public int Active { get; set; }

        /// <summary>
        /// Check if new book or is existing 
        /// </summary>
        [Computed]
        public bool IsNew => this.Id == default(int);


        [Write(false)]
        public List<Author> Authors { get; } = new List<Author>();
    }
}
