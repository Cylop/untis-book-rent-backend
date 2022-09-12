import { NextFunction, Request, Response } from 'express';
import BookInventoryService from '@services/booksinventory.service';
import { mapToDto } from '@/utils/mapToDto';
import { BookInventory } from '@/interfaces/booksinventory.interface';
import { BookInventoryResultDto, CreateBookInventoryDto } from '@/dtos/booksinventory.dto';
import { ResponseContainerDto } from '@/dtos/response.dto';

class BookInventoriesController {
  public bookInventoryService = new BookInventoryService();

  public getBookInventories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBookInventoriesData: BookInventory[] = await this.bookInventoryService.findAllBookInventories();
      try {
        const dto = mapToDto<BookInventory, BookInventoryResultDto>(findAllBookInventoriesData, BookInventoryResultDto);
        res.status(200).json(new ResponseContainerDto(req, dto, 'findAll'));
      } catch (error) {
        res.status(200).json(new ResponseContainerDto(req, [], 'findAll'));
      }
    } catch (error) {
      next(error);
    }
  };

  public getBookInventoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.isbn);
      const findOneBookInventoryData: BookInventory = await this.bookInventoryService.findBookInventoryById(isbn);
      const dto = mapToDto<BookInventory, BookInventoryResultDto>(findOneBookInventoryData, BookInventoryResultDto);

      res.status(200).json(new ResponseContainerDto(req, dto, 'findOne'));
    } catch (error) {
      next(error);
    }
  };

  public createBookInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookInventoryData: CreateBookInventoryDto = req.body;
      const createBookInventoryData: BookInventory = await this.bookInventoryService.createBookInventory(bookInventoryData);
      const dto = mapToDto<BookInventory, BookInventoryResultDto>(createBookInventoryData, BookInventoryResultDto);

      res.status(201).json(new ResponseContainerDto(req, dto, 'created'));
    } catch (error) {
      next(error);
    }
  };

  public updateBookInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.isbn);
      const bookInventoryData: CreateBookInventoryDto = req.body;
      const updateBookInventoryData: BookInventory = await this.bookInventoryService.updateBookInventory(isbn, bookInventoryData);
      const dto = mapToDto<BookInventory, BookInventoryResultDto>(updateBookInventoryData, BookInventoryResultDto);

      res.status(200).json(new ResponseContainerDto(req, dto, 'updated'));
    } catch (error) {
      next(error);
    }
  };

  public deleteBookInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isbn = String(req.params.isbn);
      const deleteBookInventoryData: BookInventory = await this.bookInventoryService.deleteBookInventory(isbn);
      const dto = mapToDto<BookInventory, BookInventoryResultDto>(deleteBookInventoryData, BookInventoryResultDto);

      res.status(200).json(new ResponseContainerDto(req, dto, 'deleted'));
    } catch (error) {
      next(error);
    }
  };
}

export default BookInventoriesController;
