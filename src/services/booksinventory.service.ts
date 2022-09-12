import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { BookInventory } from '@/interfaces/booksinventory.interface';
import { CreateBookInventoryDto } from '@/dtos/booksinventory.dto';
import { BookInventoryEntity } from '@/entities/bookinventories.entity';
import { BookEntity } from '@/entities/books.entity';
import { Book } from '@/interfaces/books.interface';

@EntityRepository()
class BookInventoryService extends Repository<BookInventoryEntity> {
  public async findAllBookInventories(): Promise<BookInventory[]> {
    const inventories: BookInventory[] = await BookInventoryEntity.find();
    return inventories;
  }

  public async findBookInventoryById(isbn: string): Promise<BookInventory> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const findInventory: BookInventory = await BookInventoryEntity.findOne({ where: { isbn: isbn } });
    if (!findInventory) throw new HttpException(409, "Book inventory doesn't exist");

    return findInventory;
  }

  public async createBookInventory(inventoryData: CreateBookInventoryDto): Promise<BookInventory> {
    if (isEmpty(inventoryData)) throw new HttpException(400, 'inventoryData is empty');

    const findBook: Book = await BookEntity.findOne({ where: { isbn: inventoryData.isbn } });
    if (!findBook) throw new HttpException(409, `Book with isbn ${inventoryData.isbn} doesn't exist`);

    const findInventory: BookInventory = await BookInventoryEntity.findOne({ where: { isbn: inventoryData.isbn } });
    if (findInventory) throw new HttpException(409, `This book inventory for book ${inventoryData.isbn} already exists`);

    const createInventoryData: BookInventory = await BookInventoryEntity.create({ ...inventoryData }).save();

    return createInventoryData;
  }

  public async updateBookInventory(isbn: string, inventoryData: CreateBookInventoryDto): Promise<BookInventory> {
    if (isEmpty(inventoryData)) throw new HttpException(400, 'inventoryData is empty');

    const findInventory: BookInventory = await BookInventoryEntity.findOne({ where: { isbn } });
    if (!findInventory) throw new HttpException(409, `Book inventory for book ${isbn} doesn't exist`);

    await BookInventoryEntity.update(isbn, { ...inventoryData });

    const updateBookInventory: BookInventory = await BookInventoryEntity.findOne({ where: { isbn } });
    return updateBookInventory;
  }

  public async deleteBookInventory(isbn: string): Promise<BookInventory> {
    if (isEmpty(isbn)) throw new HttpException(400, 'Isbn is empty');

    const findInventory: BookInventory = await BookInventoryEntity.findOne({ where: { isbn } });
    if (!findInventory) throw new HttpException(409, `Book inventory for book ${isbn} doesn't exist`);

    await BookInventoryEntity.delete({ isbn });
    return findInventory;
  }
}

export default BookInventoryService;
