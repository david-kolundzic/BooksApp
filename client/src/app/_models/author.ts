
export interface IAuthor {
  id?: number;
  firstName?: string;
  lastName?: string;
  link?: string;
  title?: string;
  about?: string;
  active?: number;

  /**
   *
   */
  
    
  }

  export class Author implements IAuthor{

     id: number | undefined;
     firstName: string | undefined;
     lastName?: string | undefined;
     link?: string | undefined;
     title?: string | undefined;
     about?: string | undefined;
     active?: number | undefined;
    }

  
  
