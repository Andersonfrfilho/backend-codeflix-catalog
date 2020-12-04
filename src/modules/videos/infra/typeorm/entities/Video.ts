import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import Category from '@modules/categories/infra/typeorm/entities/Category';

enum RATING_LIST {
  L = 'L',
  THEN = '10',
  TWELVE = '12',
  FOURTEEN = '14',
  EIGHTEEN = '18',
}
@Entity('videos')
class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  year_launched: number;

  @Column()
  opened: boolean;

  @Column()
  rating: string;

  @Column()
  duration: number;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'category_video',
    joinColumn: { name: 'video_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories?: Category[];

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'genre_video',
    joinColumn: { name: 'video_id' },
    inverseJoinColumn: { name: 'genre_id' },
  })
  genres?: Genre[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
export { Video as default, RATING_LIST };
