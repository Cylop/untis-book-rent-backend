import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { BookEntity } from '@/entities/books.entity';
import { Book } from '@/interfaces/books.interface';
import { CreateBookDto, UpdateBookDto } from '@/dtos/books.dto';

import ISBN from 'isbn3';
import ISBNDBService from './isbndb.service';
import { Paginated, PaginationRequest } from '@/dtos/response.dto';

@EntityRepository()
class BookService extends Repository<BookEntity> {
  private isbnDbSerice = new ISBNDBService();

  public async findAllBook(paginationReq: PaginationRequest): Promise<Paginated<Book[]>> {
    const [data, count] = await BookEntity.findAndCount({ take: paginationReq.pageSize, skip: paginationReq.skip });
    return new Paginated(data, { page: paginationReq.page, pageSize: paginationReq.pageSize, count });
  }

  public async findBookById(isbn: string): Promise<Book> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const parsedIsbn = ISBN.parse(isbn);
    if (!parsedIsbn.isValid && !(parsedIsbn.isIsbn10 || parsedIsbn.isIsbn13)) throw new HttpException(409, 'Provided Isbn is not valid');

    let isbnQuery: any;
    if (parsedIsbn.isIsbn10) isbnQuery = { isbn10: isbn };
    if (parsedIsbn.isIsbn13) isbnQuery = { isbn13: isbn };

    const findBook: Book = await BookEntity.findOne({ where: isbnQuery });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const parsedIsbn = ISBN.parse(bookData.isbn);
    if (!parsedIsbn.isValid && !(parsedIsbn.isIsbn10 || parsedIsbn.isIsbn13)) throw new HttpException(409, 'Provided Isbn is not valid');

    let isbnQuery: any;
    if (parsedIsbn.isIsbn10) isbnQuery = { isbn10: bookData.isbn };
    if (parsedIsbn.isIsbn13) isbnQuery = { isbn13: bookData.isbn };

    const findBook: Book = await BookEntity.findOne({ where: isbnQuery });
    if (findBook) throw new HttpException(409, `This book ${bookData.isbn} already exists`);

    const findUser: User = await UserEntity.findOne({ where: { id: bookData.createdBy } });
    if (!findUser) throw new HttpException(409, `User with id ${bookData.createdBy} doesn't exists`);

    let fetchedBookData: Book;
    try {
      fetchedBookData = await this.isbnDbSerice.fetchExtraBookData(bookData.isbn);
    } catch (error) {
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Unknown error');
    }

    const createBookData: Book = await BookEntity.create({ ...fetchedBookData, createdBy: findUser }).save();

    return createBookData;
  }

  public async updateBook(isbn: string, bookData: UpdateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const parsedIsbn = ISBN.parse(isbn);
    if (!parsedIsbn.isValid && !(parsedIsbn.isIsbn10 || parsedIsbn.isIsbn13)) throw new HttpException(409, 'Provided Isbn is not valid');

    let isbnQuery: any;
    if (parsedIsbn.isIsbn10) isbnQuery = { isbn10: isbn };
    if (parsedIsbn.isIsbn13) isbnQuery = { isbn13: isbn };

    const findBook: Book = await BookEntity.findOne({ where: isbnQuery });
    if (!findBook) throw new HttpException(409, `Book ${isbn} doesn't exist`);

    await BookEntity.update(isbn, { ...bookData });

    const updateBook: Book = await BookEntity.findOne({ where: isbnQuery });
    return updateBook;
  }

  public async deleteBook(isbn: string): Promise<Book> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const parsedIsbn = ISBN.parse(isbn);
    if (!parsedIsbn.isValid && !(parsedIsbn.isIsbn10 || parsedIsbn.isIsbn13)) throw new HttpException(409, 'Provided Isbn is not valid');

    const findBook: Book = await BookEntity.findOne({ where: { isbn } });
    if (!findBook) throw new HttpException(409, `Book ${isbn} doesn't exist`);

    await BookEntity.delete(parsedIsbn.isIsbn10 ? { isbn10: isbn } : parsedIsbn.isIsbn13 ? { isbn13: isbn } : null);
    return findBook;
  }
}

export default BookService;
