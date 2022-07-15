import { Author } from './author';
import { BooksHistory } from './booksHistory';

export interface Book {
  id: number;
  title: string;
  publishDate: string;
  shortDescription: string;
  image:string;
  authors: Author[];
  bookHistory: BooksHistory[];
}

