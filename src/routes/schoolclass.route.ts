import { Router } from 'express';
import SchoolClassController from '@controllers/schoolclass.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateSchoolClassDto } from '@/dtos/schoolclass.dto';

class SchoolClassRoute implements Routes {
  public path = '/classes';
  public router = Router();
  public schoolClassController = new SchoolClassController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.schoolClassController.getSchoolClass);
    this.router.get(`${this.path}/:id(\\d+)`, this.schoolClassController.getSchoolClassById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSchoolClassDto, 'body'), this.schoolClassController.createSchoolClass);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateSchoolClassDto, 'body', true), this.schoolClassController.updateSchoolClass);
    this.router.delete(`${this.path}/:id(\\d+)`, this.schoolClassController.deleteSchoolClass);
  }
}

export default SchoolClassRoute;
