import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SchoolClassEntity } from '@/entities/schoolclasses.entity';
import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { CreateSchoolClassDto } from '@/dtos/schoolclass.dto';

@EntityRepository()
class SchoolClassService extends Repository<SchoolClassEntity> {
  public async findAllSchoolClass(): Promise<SchoolClass[]> {
    const classes: SchoolClass[] = await SchoolClassEntity.find();
    return classes;
  }

  public async findSchoolClassById(id: number): Promise<SchoolClass> {
    if (isEmpty(id)) throw new HttpException(400, 'Id is empty');

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id } });
    if (!findClass) throw new HttpException(409, "Class doesn't exist");

    return findClass;
  }

  public async createSchoolClass(schoolClass: CreateSchoolClassDto): Promise<SchoolClass> {
    if (isEmpty(schoolClass)) throw new HttpException(400, 'schoolClass is empty');

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { name: schoolClass.name } });
    if (findClass) throw new HttpException(409, `This class ${schoolClass.name} already exists`);

    const createSchoolClassData: SchoolClass = await SchoolClassEntity.create({ ...schoolClass }).save();

    return createSchoolClassData;
  }

  public async updateSchoolClass(id: number, schoolClass: CreateSchoolClassDto): Promise<SchoolClass> {
    if (isEmpty(schoolClass)) throw new HttpException(400, 'schoolClass is empty');

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id } });
    if (!findClass) throw new HttpException(409, `Class '${id}' doesn't exist`);

    await SchoolClassEntity.update(id, schoolClass);

    const updateClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id } });
    return updateClass;
  }

  public async deleteSchoolClass(id: number): Promise<SchoolClass> {
    if (isEmpty(id)) throw new HttpException(400, 'Name is empty');

    const findClass: SchoolClass = await SchoolClassEntity.findOne({ where: { id } });
    if (!findClass) throw new HttpException(409, `Class '${id}' doesn't exist`);

    await SchoolClassEntity.delete({ id });
    return findClass;
  }
}

export default SchoolClassService;
