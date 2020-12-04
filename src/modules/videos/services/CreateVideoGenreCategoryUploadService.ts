import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Video from '@modules/videos/infra/typeorm/entities/Video';
import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IGenreVideosRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import ICategoryVideosRepository from '@modules/category_video/repositories/ICategoryVideoRepository';

interface IRequest {
  title: string;
  description: string;
  year_launched: number;
  opened: boolean;
  rating: string;
  duration: number;
  name: string;
  category_name: string;
  genre_name: string;
}
@injectable()
class CreateVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
    @inject('GenreVideoRepository')
    private genreVideoRepository: IGenreVideosRepository,
    @inject('CategoryVideoRepository')
    private categoryVideoRepository: ICategoryVideosRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    description,
    year_launched,
    opened,
    rating,
    duration,
    name,
    category_name,
    genre_name,
  }: IRequest): Promise<Video> {
    let category_exist = await this.categoriesRepository.findByName({
      name: category_name,
    });
    if (!category_exist) {
      category_exist = await this.categoriesRepository.create({
        name: category_name,
        description: '',
        is_active: true,
      });
    }
    let genre_exist = await this.genresRepository.findByName({
      name: genre_name,
    });
    if (!genre_exist) {
      genre_exist = await this.genresRepository.create({
        name: category_name,
        is_active: true,
      });
    }
    const { videos } = await this.videosRepository.list({
      keyword: '',
      order: true,
      skip: 0,
      take: 10,
    });
    const videos_file = await this.storageProvider.listFiles({
      ignore_files: [name, 'uploads'],
    });

    const deleted_files = videos_file.filter(
      name => !videos.some(video => video.name === name),
    );
    await this.storageProvider.deleteTemporaryFiles({
      file_names: deleted_files,
    });
    await this.storageProvider.saveFile({ file_name: name });

    const video = await this.videosRepository.create({
      title,
      description,
      year_launched,
      opened,
      rating,
      duration,
      name,
    });
    await this.genreVideoRepository.create({
      genre_id: genre_exist.id,
      video_id: video.id,
    });
    await this.categoryVideoRepository.create({
      category_id: category_exist.id,
      video_id: video.id,
    });
    return video;
  }
}
export default CreateVideoService;
