import SchoolClassController from '@controllers/schoolclass.controller';
import { ApiRouter } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateSchoolClassDto } from '@/dtos/schoolclass.dto';

class SchoolClassRoute extends ApiRouter {
  public schoolClassController = new SchoolClassController();

  constructor() {
    super('/classes');
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.schoolClassController.getSchoolClass);
    this.router.get('/:id(\\d+)', this.schoolClassController.getSchoolClassById);
    this.router.post('/', validationMiddleware(CreateSchoolClassDto, 'body'), this.schoolClassController.createSchoolClass);
    this.router.put('/:id(\\d+)', validationMiddleware(CreateSchoolClassDto, 'body', true), this.schoolClassController.updateSchoolClass);
    this.router.delete('/:id(\\d+)', this.schoolClassController.deleteSchoolClass);
  }
}

export default SchoolClassRoute;
