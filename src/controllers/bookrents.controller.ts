import { NextFunction, Request, Response } from 'express';
import { mapToDto, MultipleChildrenMapper } from '@/utils/mapToDto';
import { UserResultDto } from '@/dtos/users.dto';
import { ResponseContainerDto } from '@/dtos/response.dto';
import { BookRentResultDto, CreateBookRentDto, DeleteBookRentDto, UpdateBookRentDto } from '@/dtos/bookrents.dto';
import { SchoolClassResultDto } from '@/dtos/schoolclass.dto';
import BookRentService from '@/services/bookrents.service';
import { BookRent } from '@/interfaces/bookrents.interface';

const childMapper: MultipleChildrenMapper<BookRentResultDto> = [
  {
    field: 'rentedBy',
    dto: UserResultDto,
  },
  {
    field: 'classNum',
    dto: SchoolClassResultDto,
  },
];

class BookRentsController {
  public bookRentService = new BookRentService();

  public getBookRents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBookRentssData: BookRent[] = await this.bookRentService.findAllBookRents();
      try {
        const dto = mapToDto<BookRent, BookRentResultDto>(findAllBookRentssData, BookRentResultDto, childMapper);
        res.status(200).json(new ResponseContainerDto(req, dto, 'findAll'));
      } catch (error) {
        res.status(200).json(new ResponseContainerDto(req, [], 'findAll'));
      }
    } catch (error) {
      next(error);
    }
  };

  public getBookRentByClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { classNum } = req.params;
      const findAllBookData: BookRent[] = await this.bookRentService.findBookRentByClass(Number(classNum));
      try {
        const dto = mapToDto<BookRent, BookRentResultDto>(findAllBookData, BookRentResultDto, childMapper);
        res.status(200).json(new ResponseContainerDto(req, dto, 'findMany'));
      } catch (error) {
        res.status(200).json(new ResponseContainerDto(req, [], 'findMany'));
      }
    } catch (error) {
      next(error);
    }
  };

  public getBookRentByIsbnAndClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { isbn, classNum } = req.params;
      const findBookData: BookRent = await this.bookRentService.findBookRentById(isbn, Number(classNum));
      try {
        const dto = mapToDto<BookRent, BookRentResultDto>(findBookData, BookRentResultDto, childMapper);
        res.status(200).json(new ResponseContainerDto(req, dto, 'findMany'));
      } catch (error) {
        res.status(200).json(new ResponseContainerDto(req, [], 'findMany'));
      }
    } catch (error) {
      next(error);
    }
  };

  public createBookRent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookRentData: CreateBookRentDto = req.body;
      const createBookRentData: BookRent = await this.bookRentService.createBookRent(bookRentData);
      const dto = mapToDto<BookRent, BookRentResultDto>(createBookRentData, BookRentResultDto, childMapper);

      res.status(201).json(new ResponseContainerDto(req, dto, 'created'));
    } catch (error) {
      next(error);
    }
  };

  public updateBookRent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { isbn, classNum } = req.params;
      const bookRentData: UpdateBookRentDto = req.body;
      const updateBookRentData: BookRent = await this.bookRentService.updateBookRent(isbn, Number(classNum), bookRentData);
      const dto = mapToDto<BookRent, BookRentResultDto>(updateBookRentData, BookRentResultDto, childMapper);

      res.status(200).json(new ResponseContainerDto(req, dto, 'updated'));
    } catch (error) {
      next(error);
    }
  };

  public deleteBookRent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { classNum, isbn }: DeleteBookRentDto = req.body;
      const deleteBookRentData: BookRent = await this.bookRentService.deleteBookRent(isbn, classNum);
      const dto = mapToDto<BookRent, BookRentResultDto>(deleteBookRentData, BookRentResultDto, childMapper);

      res.status(200).json(new ResponseContainerDto(req, dto, 'deleted'));
    } catch (error) {
      next(error);
    }
  };
}

export default BookRentsController;
