import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { Category } from './category.entity';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity('products')
export class Product {
  // @Exclude()
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

  @Expose({ name: 'createAt' })
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

  @Transform(
    ({ value }: { value: Category[] }) =>
      value?.map((cat) => cat.name).join(', ') ?? '',
  )
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

  /*
  @Expose()
  get categoryNames(): string {
    return this.categories?.map((cat) => cat.name).join(', ') ?? '';
  }
  */

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
