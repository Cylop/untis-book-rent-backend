import { User } from './users.interface';

export interface Book {
  isbn: string;
  title: string;
  description: string;
  imageUrl: string;
  publisher: string;
  createdBy: User;
}
