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
import Video from '@modules/videos/infra/typeorm/entities/Video';

@Entity('genres')
class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @ManyToMany(() => Video)
  @JoinTable({
    name: 'genre_video',
    joinColumn: { name: 'genre_id' },
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
export default Genre;
