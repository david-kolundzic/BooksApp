CREATE TABLE [dbo].[Track_Changes]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Title] VARCHAR(MAX) NULL, 
    [Description] VARCHAR(MAX) NULL, 
    [IdBook] INT NULL, 
    [UserName] VARCHAR(50) NULL, 
    [Changed] DATETIME NULL
)
