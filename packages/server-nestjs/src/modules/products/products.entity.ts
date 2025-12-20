import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from '../reviews/reviews.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  categories: string;

  @Column()
  in_stock: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
