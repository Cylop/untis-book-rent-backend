import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Book } from '@/interfaces/books.interface';
import { UserEntity } from './users.entity';

@Entity()
export class BookEntity extends BaseEntity implements Book {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  isbn10: string;

  @Column({ unique: true })
  isbn13: string;

  @Column()
  title: string;

  @Column()
  titleLong: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true, default: new Date() })
  publishingDate: Date;

  @Column({ default: 'de' })
  language: String;

  @Column({ nullable: true })
  edition: String;

  @Column({ nullable: true })
  dimensions: String;

  @Column({ nullable: true })
  pages: number;

  @Column('simple-array')
  authors: string[];

  @Column({ default: 0 })
  amount: number;

  @ManyToOne(() => UserEntity, { eager: true })
  createdBy: UserEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
