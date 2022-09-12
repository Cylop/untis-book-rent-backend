import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import BookInventoriesController from '@/controllers/booksinventory.controller';
import { CreateBookInventoryDto } from '@/dtos/booksinventory.dto';

class BookInventoriesRoute implements Routes {
  public path = '/book-inventories';
  public router = Router();
  public booksInventoryController = new BookInventoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.booksInventoryController.getBookInventories);
    this.router.get(`${this.path}/:isbn`, this.booksInventoryController.getBookInventoryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateBookInventoryDto, 'body'), this.booksInventoryController.createBookInventory);
    this.router.put(
      `${this.path}/:isbn`,
      validationMiddleware(CreateBookInventoryDto, 'body', true),
      this.booksInventoryController.updateBookInventory,
    );
    this.router.delete(`${this.path}/:isbn`, this.booksInventoryController.deleteBookInventory);
  }
}

export default BookInventoriesRoute;
