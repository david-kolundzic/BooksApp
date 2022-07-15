CREATE TABLE [dbo].[Book_Author]
(
	[Id]	INT NOT NULL IDENTITY,
	[BookId] INT NOT NULL , 
    [AuthorId] INT NOT NULL, 
    CONSTRAINT [PK_Book_Author] PRIMARY KEY ([Id]), 
    CONSTRAINT [FK_BookAuthor_Book] FOREIGN KEY ([BookId]) REFERENCES [Book]([Id]), 
    CONSTRAINT [FK_BookAuthor_Author] FOREIGN KEY ([AuthorId]) REFERENCES [Author]([Id]) 
)
