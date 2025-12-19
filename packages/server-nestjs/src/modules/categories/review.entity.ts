import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;
}
