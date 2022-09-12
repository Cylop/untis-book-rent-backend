import { Router } from 'express';
import BooksController from '@controllers/books.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBookDto } from '@/dtos/books.dto';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.booksController.getBooks);
    this.router.get(`${this.path}/:isbn`, this.booksController.getBookById);
    this.router.post(`${this.path}`, validationMiddleware(CreateBookDto, 'body'), this.booksController.createBook);
    this.router.put(`${this.path}/:isbn`, validationMiddleware(CreateBookDto, 'body', true), this.booksController.updateBook);
    this.router.delete(`${this.path}/:isbn`, this.booksController.deleteBook);
  }
}

export default BooksRoute;
