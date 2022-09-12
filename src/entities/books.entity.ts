import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, Unique } from 'typeorm';
import { Book } from '@/interfaces/books.interface';
import { UserEntity } from './users.entity';

@Entity()
export class BookEntity extends BaseEntity implements Book {
  @PrimaryColumn({ unique: true })
  isbn: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsDate()
  @IsOptional()
  publishingDate: Date;

  @ManyToOne(() => UserEntity, { eager: true })
  createdBy: UserEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
