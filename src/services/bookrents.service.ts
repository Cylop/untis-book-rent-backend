import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { BookRent } from '@/interfaces/bookrents.interface';
import { BookRentEntity } from '@/entities/bookrents.entity';
import { CreateBookRentDto, UpdateBookRentDto } from '@/dtos/bookrents.dto';
import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { SchoolClassEntity } from '@/entities/schoolclasses.entity';

@EntityRepository()
class BookRentService extends Repository<BookRentEntity> {
  public async findAllBookRents(): Promise<BookRent[]> {
    const books: BookRent[] = await BookRentEntity.find();
    return books;
  }

  public async findBookRentById(isbn: string, classNum: number): Promise<BookRent> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { isbn, classNum } });
    if (!findBookRent) throw new HttpException(409, "Book rent doesn't exist");

    return findBookRent;
  }

  public async createBookRent(bookRentData: CreateBookRentDto): Promise<BookRent> {
    if (isEmpty(bookRentData)) throw new HttpException(400, 'bookRentData is empty');

    const { isbn, classNum } = bookRentData;
    const findBook: BookRent = await BookRentEntity.findOne({ where: { isbn, classNum } });
    if (findBook)
      throw new HttpException(
        409,
        `This book ${bookRentData.isbn} is already rented for class ${bookRentData.classNum} and a new one can't be created. Update existing one to proceed`,
      );

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id: bookRentData.classNum } });
    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    const findUser: User = await UserEntity.findOne({ where: { id: bookRentData.rentedBy } });
    if (!findUser) throw new HttpException(409, `User with id ${bookRentData.rentedBy} doesn't exists`);

    const createBookData: BookRent = await BookRentEntity.create({ ...bookRentData, rentedBy: findUser, classNum: findClass }).save();
    return createBookData;
  }

  public async updateBookRent(isbn: string, classNum: number, bookRentData: UpdateBookRentDto): Promise<BookRent> {
    if (isEmpty(bookRentData)) throw new HttpException(400, 'bookRentData is empty');

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { isbn } });
    if (!findBookRent) throw new HttpException(409, `Book rent for book ${isbn} doesn't exist`);

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id: classNum } });
    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    await BookRentEntity.update(isbn, { ...bookRentData, rentedBy: findBookRent.rentedBy, classNum: findClass });

    const updateBookRent: BookRent = await BookRentEntity.findOne({ where: { isbn } });
    return updateBookRent;
  }

  public async deleteBookRent(isbn: string, classNum: number): Promise<BookRent> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { isbn, classNum } });
    if (!findBookRent) throw new HttpException(409, `Book rent for book ${isbn} doesn't exist`);

    await BookRentEntity.delete({ isbn });
    return findBookRent;
  }
}

export default BookRentService;
