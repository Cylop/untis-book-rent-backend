import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { BookEntity } from '@/entities/books.entity';
import { Book } from '@/interfaces/books.interface';
import { CreateBookDto } from '@/dtos/books.dto';

@EntityRepository()
class BookService extends Repository<BookEntity> {
  public async findAllBook(): Promise<Book[]> {
    const books: Book[] = await BookEntity.find();
    return books;
  }

  public async findBookById(isbn: string): Promise<Book> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const findBook: Book = await BookEntity.findOne({ where: { isbn: isbn } });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: Book = await BookEntity.findOne({ where: { isbn: bookData.isbn } });
    if (findBook) throw new HttpException(409, `This book ${bookData.isbn} already exists`);

    const findUser: User = await UserEntity.findOne({ where: { id: bookData.createdBy } });
    if (!findUser) throw new HttpException(409, `User with id ${bookData.createdBy} doesn't exists`);

    const createBookData: Book = await BookEntity.create({ ...bookData, createdBy: findUser }).save();

    return createBookData;
  }

  public async updateBook(isbn: string, bookData: CreateBookDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: Book = await BookEntity.findOne({ where: { isbn } });
    if (!findBook) throw new HttpException(409, `Book ${isbn} doesn't exist`);

    const findUser: User = await UserEntity.findOne({ where: { id: bookData.createdBy } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await BookEntity.update(isbn, { ...bookData, createdBy: findUser });

    const updateBook: Book = await BookEntity.findOne({ where: { isbn } });
    return updateBook;
  }

  public async deleteBook(isbn: string): Promise<Book> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const findBook: Book = await BookEntity.findOne({ where: { isbn } });
    if (!findBook) throw new HttpException(409, `Book ${isbn} doesn't exist`);

    await BookEntity.delete({ isbn });
    return findBook;
  }
}

export default BookService;
