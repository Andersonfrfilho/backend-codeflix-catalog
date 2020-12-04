import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Video from '@modules/videos/infra/typeorm/entities/Video';
import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';

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
    let category_exist = this.categoriesRepository.findByName({
      name: category_name,
    });
    if (!category_exist) {
      category_exist = this.categoriesRepository.create({
        name: category_name,
        description: '',
        is_active: true,
      });
    }
    let genre_exist = this.genresRepository.findByName({
      name: genre_name,
    });
    if (!genre_exist) {
      genre_exist = this.genresRepository.create({
        name: category_name,
        is_active: true,
      });
    }

    const video = await this.videosRepository.create({
      title,
      description,
      year_launched,
      opened,
      rating,
      duration,
      name,
      category_name,
      genre_name,
    });
    return video;
  }
}
export default CreateVideoService;
