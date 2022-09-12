import { RequestHandler, Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}

export abstract class ApiRouter implements Routes {
  public path: string;
  public router: Router;

  constructor(path?: string) {
    this.path = path;
    this.router = Router();
  }

  public registerRoute(parentRouter: Router, middlewares: RequestHandler[] = []) {
    parentRouter.use(this.path, ...middlewares, this.router);
  }
}
