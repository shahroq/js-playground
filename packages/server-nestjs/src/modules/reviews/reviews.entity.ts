import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('reviews')
export class Review {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @Expose({ name: 'submittedAt' })
  @Column()
  created_at: string;

  @Exclude()
  @Column()
  updated_at: string;

  @Exclude()
  @Column()
  created_by: number;

  @Exclude()
  @Column()
  updated_by: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
