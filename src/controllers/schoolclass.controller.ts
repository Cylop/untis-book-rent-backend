import { NextFunction, Request, Response } from 'express';
import SchoolClassService from '@services/schoolclass.service';
import { mapToDto } from '@/utils/mapToDto';
import { ResponseContainerDto } from '@/dtos/response.dto';
import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { CreateSchoolClassDto, SchoolClassResultDto } from '@/dtos/schoolclass.dto';

class UsersController {
  public schoolClassService = new SchoolClassService();

  public getSchoolClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllClassData: SchoolClass[] = await this.schoolClassService.findAllSchoolClass();
      try {
        const dto = mapToDto<SchoolClass, SchoolClassResultDto>(findAllClassData, SchoolClassResultDto);
        res.status(200).json(new ResponseContainerDto(req, dto, 'findAll'));
      } catch (error) {
        res.status(200).json(new ResponseContainerDto(req, [], 'findAll'));
      }
    } catch (error) {
      next(error);
    }
  };

  public getSchoolClassById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const findOneClassData: SchoolClass = await this.schoolClassService.findSchoolClassById(id);
      const dto = mapToDto<SchoolClass, SchoolClassResultDto>(findOneClassData, SchoolClassResultDto);

      res.status(200).json(new ResponseContainerDto(req, dto, 'findOne'));
    } catch (error) {
      next(error);
    }
  };

  public createSchoolClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const classData: CreateSchoolClassDto = req.body;
      const createClassData: SchoolClass = await this.schoolClassService.createSchoolClass(classData);
      const dto = mapToDto<SchoolClass, SchoolClassResultDto>(createClassData, SchoolClassResultDto);

      res.status(201).json(new ResponseContainerDto(req, dto, 'created'));
    } catch (error) {
      next(error);
    }
  };

  public updateSchoolClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const classData: CreateSchoolClassDto = req.body;
      const updateClassData: SchoolClass = await this.schoolClassService.updateSchoolClass(id, classData);
      const dto = mapToDto<SchoolClass, SchoolClassResultDto>(updateClassData, SchoolClassResultDto);

      res.status(200).json(new ResponseContainerDto(req, dto, 'updated'));
    } catch (error) {
      next(error);
    }
  };

  public deleteSchoolClass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const deleteClassData: SchoolClass = await this.schoolClassService.deleteSchoolClass(id);
      const dto = mapToDto<SchoolClass, SchoolClassResultDto>(deleteClassData, SchoolClassResultDto);

      res.status(200).json(new ResponseContainerDto(req, dto, 'deleted'));
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
