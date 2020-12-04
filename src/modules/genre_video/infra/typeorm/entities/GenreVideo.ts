import Genre from '@modules/genres/infra/typeorm/entities/Genre';
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

@Entity('genre_video')
class GenreVideo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genre_id: string;

  @OneToOne(() => Genre)
  @JoinColumn({ name: 'genre_id' })
  genre?: Genre;

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
export default GenreVideo;
