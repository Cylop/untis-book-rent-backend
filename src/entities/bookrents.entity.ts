import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';
import { BookRent } from '@/interfaces/bookrents.interface';
import { SchoolClassEntity } from './schoolclasses.entity';
import { RentStatus } from '@/dtos/bookrents.dto';
import { BookEntity } from './books.entity';

@Entity()
export class BookRentEntity extends BaseEntity implements BookRent {
  @PrimaryColumn({ unique: true })
  id: string;

  @ManyToOne(() => BookEntity, { eager: true })
  book: BookEntity;

  @ManyToOne(() => SchoolClassEntity, { eager: true })
  classNum: SchoolClassEntity;

  @Column({ default: 'rented', type: 'enum', enum: RentStatus })
  status: RentStatus;

  @Column({ default: 0 })
  amount: number;

  @ManyToOne(() => UserEntity, { eager: true })
  rentedBy: UserEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
