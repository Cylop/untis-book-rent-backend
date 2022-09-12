import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, UserResultDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { mapToDto } from '@/utils/mapToDto';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      try {
        const dto = mapToDto(findAllUsersData, UserResultDto);
        res.status(200).json({ data: dto, message: 'findAll' });
      } catch (error) {
        res.status(200).json({ data: [], message: 'findAll' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      const dto = mapToDto(findOneUserData, UserResultDto);
      res.status(200).json({ data: dto, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      const dto = mapToDto(createUserData, UserResultDto);

      res.status(201).json({ data: dto, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);
      const dto = mapToDto(updateUserData, UserResultDto);

      res.status(200).json({ data: dto, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);
      const dto = mapToDto(deleteUserData, UserResultDto);

      res.status(200).json({ data: dto, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
