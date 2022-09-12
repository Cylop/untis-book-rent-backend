import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Book } from '@/interfaces/books.interface';
import { UserEntity } from './users.entity';

@Entity()
export class BookEntity extends BaseEntity implements Book {
  @PrimaryColumn({ unique: true })
  isbn: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
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
