import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (!Authorization) {
      next(new HttpException(404, 'Authentication token missing'));
      return;
    }
    const secretKey: string = SECRET_KEY;
    const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
    const findUser = await UserEntity.findOne(id, { select: ['id', 'email', 'password'] });

    if (!findUser) {
      next(new HttpException(401, 'Wrong authentication token'));
      return;
    }
    req.user = findUser;
    next();
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
