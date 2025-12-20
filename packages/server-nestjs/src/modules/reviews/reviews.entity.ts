import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
