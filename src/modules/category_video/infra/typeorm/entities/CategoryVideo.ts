import Category from '@modules/categories/infra/typeorm/entities/Category';
import Video from '@modules/videos/infra/typeorm/entities/Video';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('category_video')
class CategoryVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column()
  video_id: string;

  @OneToOne(() => Video)
  @JoinColumn({ name: 'video_id' })
  video?: Video;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
export default CategoryVideo;
