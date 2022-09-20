import { RentStatus } from '@/dtos/bookrents.dto';
import { Book } from './books.interface';
import { SchoolClass } from './schoolclass.interface';
import { User } from './users.interface';

export interface BookRent {
  id: string;
  book: Book;
  classNum: SchoolClass;
  status: RentStatus;
  amount: number;
  rentedBy: User;
}
