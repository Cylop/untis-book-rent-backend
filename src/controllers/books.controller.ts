import { NextFunction, Request, Response } from 'express';
import BookService from '@services/books.service';
import { mapToDto, MultipleChildrenMapper } from '@/utils/mapToDto';
import { Book } from '@/interfaces/books.interface';
import { BookResultDto, CreateBookDto } from '@/dtos/books.dto';
import { UserResultDto } from '@/dtos/users.dto';

const childMapper: MultipleChildrenMapper<BookResultDto> = [
  {
    field: 'createdBy',
    dto: UserResultDto,
  },
];

class UsersController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBooksData: Book[] = await this.bookService.findAllBook();
      try {
        const dto = mapToDto<Book, BookResultDto>(findAllBooksData, BookResultDto, childMapper);
        res.status(200).json({ data: dto, message: 'findAll' });
      } catch (error) {
        res.status(200).json({ data: [], message: 'findAll' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.isbn);
      const findOneBookData: Book = await this.bookService.findBookById(isbn);
      const dto = mapToDto<Book, BookResultDto>(findOneBookData, BookResultDto, childMapper);

      res.status(200).json({ data: dto, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookData: CreateBookDto = req.body;
      const createBookData: Book = await this.bookService.createBook(bookData);
      const dto = mapToDto<Book, BookResultDto>(createBookData, BookResultDto, childMapper);

      res.status(201).json({ data: dto, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.isbn);
      const userData: CreateBookDto = req.body;
      const updateBookData: Book = await this.bookService.updateBook(isbn, userData);
      const dto = mapToDto<Book, BookResultDto>(updateBookData, BookResultDto, childMapper);

      res.status(200).json({ data: dto, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.isbn);
      const deleteBookData: Book = await this.bookService.deleteBook(isbn);
      const dto = mapToDto<Book, BookResultDto>(deleteBookData, BookResultDto, childMapper);

      res.status(200).json({ data: dto, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
