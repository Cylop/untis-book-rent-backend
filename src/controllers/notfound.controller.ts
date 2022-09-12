import { NextFunction, Request, Response } from 'express';
import BookService from '@services/books.service';
import { HttpException } from '@/exceptions/HttpException';

class NotFoundController {
  public bookService = new BookService();

  public sendNotFound = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next(new HttpException(404, "Seems like your'e lost. This route doesn't exist"));
  };
}

export default NotFoundController;
