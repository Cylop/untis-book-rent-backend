import BooksController from '@controllers/books.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBookDto, UpdateBookDto } from '@/dtos/books.dto';
import { ApiRouter } from '@/interfaces/routes.interface';
import paginationMiddleware from '@/middlewares/pagination.middleware';
import { PaginationQueryParams } from '@/dtos/general.dto';

class BooksRoute extends ApiRouter {
  public booksController = new BooksController();

  constructor() {
    super('/books');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', validationMiddleware(PaginationQueryParams, 'query', false), paginationMiddleware, this.booksController.getBooks);
    this.router.get('/:isbn', this.booksController.getBookById);
    this.router.post('/', validationMiddleware(CreateBookDto, 'body'), this.booksController.createBook);
    this.router.put('/:isbn', validationMiddleware(UpdateBookDto, 'body', true), this.booksController.updateBook);
    this.router.delete('/:isbn', this.booksController.deleteBook);
  }
}

export default BooksRoute;
