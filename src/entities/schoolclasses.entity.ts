import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { SchoolClass } from '@interfaces/schoolclass.interface';

@Entity()
export class SchoolClassEntity extends BaseEntity implements SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  //@PrimaryColumn()
  //untisId: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  studentCount: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
