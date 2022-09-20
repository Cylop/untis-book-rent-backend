import { ISBNDB_KEY, ISBNDB_URL } from '@/config';
import { ISBNDBResponse } from '@/dtos/isbndb.dto';
import { IsbnDBException } from '@/exceptions/IsbnDBException';
import { Book } from '@/interfaces/books.interface';
import axios from 'axios';
import moment from 'moment';

import { nanoid } from 'nanoid';
class ISBNDBService {
  private instance = axios.create({
    baseURL: ISBNDB_URL,
    timeout: 1000,
    headers: { Authorization: ISBNDB_KEY },
  });

  fetchExtraBookData = async (isbn: string): Promise<Book> => {
    const isbnDbResponse = await this.instance.get<ISBNDBResponse>(`/book/${isbn}`);
    if (isbnDbResponse.status !== 200) throw new IsbnDBException(isbnDbResponse.status, isbnDbResponse.statusText);
    const bookResponse = isbnDbResponse.data.book;
    const book: Book = {
      id: nanoid(),
      title: bookResponse.title,
      titleLong: bookResponse.title_long,
      authors: bookResponse.authors,
      createdBy: null,
      dimensions: bookResponse.dimensions,
      edition: bookResponse.edition,
      imageUrl: bookResponse.image,
      isbn10: bookResponse.isbn,
      isbn13: bookResponse.isbn13,
      language: bookResponse.language,
      pages: bookResponse.pages,
      publisher: bookResponse.publisher,
      publishingDate: moment(bookResponse.date_published, 'YYYY').toDate(),
    };

    return book;
  };
}

export default ISBNDBService;
