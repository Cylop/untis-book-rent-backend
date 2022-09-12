import { ApiRouter } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import BookInventoriesController from '@/controllers/booksinventory.controller';
import { CreateBookInventoryDto } from '@/dtos/booksinventory.dto';

class BookInventoriesRoute extends ApiRouter {
  public booksInventoryController = new BookInventoriesController();

  constructor() {
    super('/book-inventories');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.booksInventoryController.getBookInventories);
    this.router.get('/:isbn', this.booksInventoryController.getBookInventoryById);
    this.router.post('/', validationMiddleware(CreateBookInventoryDto, 'body'), this.booksInventoryController.createBookInventory);
    this.router.put('/:isbn', validationMiddleware(CreateBookInventoryDto, 'body', true), this.booksInventoryController.updateBookInventory);
    this.router.delete('/:isbn', this.booksInventoryController.deleteBookInventory);
  }
}

export default BookInventoriesRoute;
