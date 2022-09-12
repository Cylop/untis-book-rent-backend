import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { BookInventory } from '@/interfaces/booksinventory.interface';

@Entity()
export class BookInventoryEntity extends BaseEntity implements BookInventory {
  @PrimaryColumn({ unique: true })
  isbn: string;

  @Column()
  amount: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
