import validationMiddleware from '@middlewares/validation.middleware';
import { ApiRouter } from '@/interfaces/routes.interface';
import BookRentsController from '@/controllers/bookrents.controller';
import { CreateBookRentDto, DeleteBookRentDto, UpdateBookRentDto } from '@/dtos/bookrents.dto';

class BookRentsRoute extends ApiRouter {
  public bookRentsController = new BookRentsController();

  constructor() {
    super('/book-rents');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.bookRentsController.getBookRents);
    this.router.get('/:isbn/:classNum', this.bookRentsController.getBookRentByIsbnAndClass);
    this.router.post('/', validationMiddleware(CreateBookRentDto, 'body'), this.bookRentsController.createBookRent);
    this.router.put('/:isbn/:classNum', validationMiddleware(UpdateBookRentDto, 'body', true), this.bookRentsController.updateBookRent);
    this.router.delete('/:isbn', validationMiddleware(DeleteBookRentDto, 'body', true), this.bookRentsController.deleteBookRent);
  }
}

export default BookRentsRoute;
