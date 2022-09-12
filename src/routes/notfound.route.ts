import NotFoundController from '@/controllers/notfound.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class NotFoundRoute implements Routes {
  router = Router();
  notFoundController = new NotFoundController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.notFoundController.sendNotFound);
  }
}

export default NotFoundRoute;
