import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../reviews/reviews.entity';
import { Category } from '../categories/categories.entity';

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
  in_stock: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @JoinTable({
    name: 'products_categories', // join table name
    joinColumn: {
      name: 'product_id', // FK column in join table
      referencedColumnName: 'id', // Product.id
    },
    inverseJoinColumn: {
      name: 'category_id', // FK column in join table
      referencedColumnName: 'id', // Category.id
    },
  })
  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  categories: Category[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
