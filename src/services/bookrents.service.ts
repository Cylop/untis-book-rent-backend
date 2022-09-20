import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { BookRent } from '@/interfaces/bookrents.interface';
import { BookRentEntity } from '@/entities/bookrents.entity';
import { CreateBookRentDto, RentStatus, UpdateBookRentDto } from '@/dtos/bookrents.dto';
import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { SchoolClassEntity } from '@/entities/schoolclasses.entity';
import { nanoid } from 'nanoid';
import { BookEntity } from '@/entities/books.entity';
import { Book } from '@/interfaces/books.interface';

@EntityRepository()
class BookRentService extends Repository<BookRentEntity> {
  public async findAllBookRents(): Promise<BookRent[]> {
    const books: BookRent[] = await BookRentEntity.find();
    return books;
  }

  public async findBookRentById(bookId: string, classNum: number): Promise<BookRent> {
    if (isEmpty(bookId)) throw new HttpException(400, 'BookId is empty');

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { book: bookId, classNum } });
    if (!findBookRent) throw new HttpException(409, "Book rent doesn't exist");

    return findBookRent;
  }

  public async findBookRentByClass(classNum: number): Promise<BookRent[]> {
    if (isEmpty(classNum)) throw new HttpException(400, 'ClassId is empty');

    const findBookRent: BookRent[] = await BookRentEntity.find({ where: { classNum } });
    return findBookRent;
  }

  public async createBookRent(bookRentData: CreateBookRentDto): Promise<BookRent> {
    if (isEmpty(bookRentData)) throw new HttpException(400, 'bookRentData is empty');

    const { bookId, classNum, amount: wantingToRentAmount } = bookRentData;

    const findBook: Book = await BookEntity.findOne({ where: { id: bookId } });
    if (!findBook) throw new HttpException(409, `Book with id ${bookRentData.bookId} doesn't exist`);

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { book: bookId, classNum } });
    if (findBookRent)
      throw new HttpException(
        409,
        `This book ${bookRentData.bookId} is already rented for class ${bookRentData.classNum} and a new one can't be created. Update existing one to proceed`,
      );

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id: bookRentData.classNum } });
    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    const findUser: User = await UserEntity.findOne({ where: { id: bookRentData.rentedBy } });
    if (!findUser) throw new HttpException(409, `User with id ${bookRentData.rentedBy} doesn't exists`);

    const { amount: ownedBooksAmount } = findBook;

    const { rentedAmount } = await BookRentEntity.createQueryBuilder()
      .where({ book: bookId, status: RentStatus.rented })
      .select('SUM(amount)', 'rentedAmount')
      .getRawOne();
    const availableBooks = Math.abs(ownedBooksAmount) - Math.abs(rentedAmount);

    if (availableBooks <= 0) {
      throw new HttpException(409, `All books with id ${bookId} are currently rented out`);
    }

    if (availableBooks - Math.abs(wantingToRentAmount) <= 0) {
      throw new HttpException(409, `Not enough books with id ${bookId} are available for rent. ${availableBooks} are available`);
    }

    const createBookData: BookRent = await BookRentEntity.create({
      id: nanoid(),
      ...bookRentData,
      book: findBook,
      rentedBy: findUser,
      classNum: findClass,
      status: RentStatus.rented,
    }).save();
    return createBookData;
  }

  public async updateBookRent(bookId: string, classNum: number, bookRentData: UpdateBookRentDto): Promise<BookRent> {
    if (isEmpty(bookRentData)) throw new HttpException(400, 'bookRentData is empty');
    if (isEmpty(bookId) || isEmpty(classNum)) throw new HttpException(400, 'BookId and ClassNum must be present');

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { book: bookId } });
    if (!findBookRent) throw new HttpException(409, `Book rent for book ${bookId} doesn't exist`);

    if (findBookRent.status != RentStatus.rented) throw new HttpException(400, `Book rent is already ${findBookRent.status}. Can't update`);

    if (bookRentData?.amount) {
      const {
        book: { amount: ownedBooksAmount },
        amount: alreadyRentedAmount,
      } = findBookRent;

      const { rentedAmount: overallRentedAmount } = await BookRentEntity.createQueryBuilder()
        .where({ book: bookId, status: RentStatus.rented })
        .select('SUM(amount)', 'rentedAmount')
        .getRawOne();

      const rentedAmountWithoutCurrentRent = Math.abs(overallRentedAmount) - Math.abs(alreadyRentedAmount);
      const availableBooks = Math.abs(ownedBooksAmount) - Math.abs(rentedAmountWithoutCurrentRent);

      if (availableBooks <= 0) {
        throw new HttpException(409, `Can't update amount because no more books with id ${bookId} are available`);
      }

      const { amount: wantingToRentAmount } = bookRentData;
      if (availableBooks - Math.abs(wantingToRentAmount) <= 0) {
        throw new HttpException(
          409,
          `Not enough books with id ${bookId} are available for rent. ${availableBooks - alreadyRentedAmount} are available.`,
        );
      }
    }

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id: classNum } });
    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    await BookRentEntity.update(findBookRent.id, { ...bookRentData, rentedBy: findBookRent.rentedBy, classNum: findClass });

    const updateBookRent: BookRent = await BookRentEntity.findOne({ where: { book: bookId } });
    return updateBookRent;
  }

  public async deleteBookRent(bookId: string, classNum: number): Promise<BookRent> {
    if (isEmpty(bookId)) throw new HttpException(400, 'BookId is empty');
    if (isEmpty(classNum)) throw new HttpException(400, 'ClassNum is empty');

    const findBookRent: BookRent = await BookRentEntity.findOne({ where: { book: bookId, classNum } });
    if (!findBookRent) throw new HttpException(409, `Book rent for book ${bookId} doesn't exist`);

    await BookRentEntity.delete({ id: findBookRent.id });
    return findBookRent;
  }
}

export default BookRentService;
