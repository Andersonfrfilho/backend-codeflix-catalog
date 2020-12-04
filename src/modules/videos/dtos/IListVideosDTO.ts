import Video from '@modules/videos/infra/typeorm/entities/Video';

export default interface IListVideosServiceDTO {
  videos: Video[];
  total: number;
}
