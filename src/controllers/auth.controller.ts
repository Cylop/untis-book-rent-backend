import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginUserDto, UserResultDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { mapToDto } from '@/utils/mapToDto';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      const dto = mapToDto(signUpUserData, UserResultDto);

      res.status(201).json({ data: dto, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      const dto = mapToDto(findUser, UserResultDto);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: dto, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      const dto = mapToDto(logOutUserData, UserResultDto);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: dto, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
