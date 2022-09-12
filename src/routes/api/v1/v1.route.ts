import { ApiRouter } from '@/interfaces/routes.interface';
import BookInventoriesRoute from './bookinventories.route';
import BooksRoute from './books.route';
import SchoolClassRoute from './schoolclass.route';
import UsersRoute from './users.route';

const API_ROUTES = [new UsersRoute(), new BooksRoute(), new BookInventoriesRoute(), new SchoolClassRoute()];

class V1Route extends ApiRouter {
  constructor() {
    super('/v1');

    this.registerVersionRoutes();
  }

  private registerVersionRoutes() {
    API_ROUTES.forEach(router => router.registerRoute(this.router));
  }
}

export default V1Route;
