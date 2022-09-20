import validationMiddleware from '@middlewares/validation.middleware';
import { ApiRouter } from '@/interfaces/routes.interface';
import BookRentsController from '@/controllers/bookrents.controller';
import { CreateBookRentDto, UpdateBookRentDto } from '@/dtos/bookrents.dto';

class BookRentsRoute extends ApiRouter {
  public bookRentsController = new BookRentsController();

  constructor() {
    super('/book-rents');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.bookRentsController.getBookRents);
    this.router.get('/:classNum', this.bookRentsController.getBookRentByClass);
    this.router.get('/:classNum/:bookId', this.bookRentsController.getBookRentByBookIdAndClass);
    this.router.post('/', validationMiddleware(CreateBookRentDto, 'body'), this.bookRentsController.createBookRent);
    this.router.put('/:classNum/:bookId', validationMiddleware(UpdateBookRentDto, 'body', true), this.bookRentsController.updateBookRent);
    this.router.delete('/:classNum/:bookId', this.bookRentsController.deleteBookRent);
  }
}

export default BookRentsRoute;
