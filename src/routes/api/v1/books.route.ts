import BooksController from '@controllers/books.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBookDto } from '@/dtos/books.dto';
import { ApiRouter } from '@/interfaces/routes.interface';

class BooksRoute extends ApiRouter {
  public booksController = new BooksController();

  constructor() {
    super('/books');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.booksController.getBooks);
    this.router.get('/:isbn', this.booksController.getBookById);
    this.router.post('/', validationMiddleware(CreateBookDto, 'body'), this.booksController.createBook);
    this.router.put('/:isbn', validationMiddleware(CreateBookDto, 'body', true), this.booksController.updateBook);
    this.router.delete('/:isbn', this.booksController.deleteBook);
  }
}

export default BooksRoute;
