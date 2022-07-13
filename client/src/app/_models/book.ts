import { Author } from './author';

export interface Book {
  id: number;
  title: string;
  publishDate: string;
  shortDescription: string;
  description: string;
  active: number;
  isNew: boolean;
  authors: Author[];
}

