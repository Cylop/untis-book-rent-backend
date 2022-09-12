import { NextFunction, Request, Response } from 'express';
import BookService from '@services/books.service';
import { mapToDto, MultipleChildrenMapper } from '@/utils/mapToDto';
import { Book } from '@/interfaces/books.interface';
import { BookResultDto, CreateBookDto } from '@/dtos/books.dto';
import { CreateUserDto } from '@/dtos/users.dto';

class UsersController {
  public bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBooksData: Book[] = await this.bookService.findAllBook();
      try {
        const childMapper: MultipleChildrenMapper<BookResultDto> = [
          {
            field: 'createdBy',
            dto: CreateUserDto,
          },
        ];

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
      const userId = Number(req.params.id);
      const findOneBookData: Book = await this.bookService.findBookById(userId);
      const dto = mapToDto(findOneBookData, BookResultDto);

      res.status(200).json({ data: dto, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateBookDto = req.body;
      const createBookData: Book = await this.bookService.createBook(userData);
      const dto = mapToDto(createBookData, BookResultDto);

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
      const dto = mapToDto(updateBookData, BookResultDto);

      res.status(200).json({ data: dto, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.id);
      const deleteBookData: Book = await this.bookService.deleteBook(isbn);
      const dto = mapToDto(deleteBookData, BookResultDto);

      res.status(200).json({ data: dto, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
