import { ApiRouter } from '@interfaces/routes.interface';
import V1Route from './v1/v1.route';

const VERSION_ROUTES = [new V1Route()];

class ApiRoute extends ApiRouter {
  constructor() {
    super('/api');
    this.registerVersionRoutes();
  }

  private registerVersionRoutes() {
    VERSION_ROUTES.forEach(router => router.registerRoute(this.router));
  }
}

export default ApiRoute;
