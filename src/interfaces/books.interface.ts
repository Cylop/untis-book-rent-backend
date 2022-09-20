import { User } from './users.interface';

export interface Book {
  id: string;
  isbn10: string;
  isbn13: string;
  title: string;
  titleLong: string;
  imageUrl: string;
  publisher: string;
  publishingDate: Date;
  language: String;
  edition: String;
  dimensions: String;
  pages: number;
  authors: string[];
  createdBy: User;
  amount: number;
}
