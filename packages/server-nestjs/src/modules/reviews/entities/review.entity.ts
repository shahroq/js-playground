import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

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
}
