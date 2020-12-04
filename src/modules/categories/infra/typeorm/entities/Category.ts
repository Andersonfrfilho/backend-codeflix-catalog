import Video from '@modules/videos/infra/typeorm/entities/Video';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: boolean;

  @ManyToMany(() => Video)
  @JoinTable({
    name: 'category_video',
    joinColumn: { name: 'category_id' },
    inverseJoinColumn: { name: 'video_id' },
  })
  videos?: Video[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
export default Category;
