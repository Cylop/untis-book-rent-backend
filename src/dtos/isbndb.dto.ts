export class ISBNDBResponse {
  book?: ISBNDBBook;
  errorType?: string;
  errorMessage?: string;
  trace?: string[];
}

export class ISBNDBBook {
  isbn13: string;
  isbn: string;

  title: string;
  title_long: string;
  publisher: string;
  language: string;
  image: string;
  edition: string;
  dimensions: string;
  pages: number;
  date_published: string;
  authors: string[];
  binding: string;
}
