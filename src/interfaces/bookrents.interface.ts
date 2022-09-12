import { RentStatus } from '@/dtos/bookrents.dto';
import { SchoolClass } from './schoolclass.interface';
import { User } from './users.interface';

export interface BookRent {
  isbn: string;
  classNum: SchoolClass;
  status: RentStatus;
  amount: number;
  rentedBy: User;
}
