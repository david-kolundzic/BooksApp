CREATE TABLE [dbo].[Book]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Title] VARCHAR(100) NULL, 
    [ShortDescription] VARCHAR(MAX) NULL, 
    [PublishDate] DATETIME NULL, 
    [Authors] VARCHAR(MAX) NULL,
    [Image] VARCHAR(MAX) NULL
)
