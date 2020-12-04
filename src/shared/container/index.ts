import { container } from 'tsyringe';

import '@shared/container/providers';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import GenresRepository from '@modules/genres/infra/typeorm/repositories/GenresRepository';

import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import CastMembersRepository from '@modules/cast_members/infra/typeorm/repositories/CastMembersRepository';

import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';

import ICategoryVideoRepository from '@modules/category_video/repositories/ICategoryVideoRepository';
import CategoryVideoRepository from '@modules/category_video/infra/typeorm/repositories/CategoryVideoRepository';

import IGenreVideoRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import GenreVideoRepository from '@modules/genre_video/infra/typeorm/repositories/GenreVideoRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
container.registerSingleton<IGenresRepository>(
  'GenresRepository',
  GenresRepository,
);

container.registerSingleton<ICastMembersRepository>(
  'CastMembersRepository',
  CastMembersRepository,
);

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepository,
);

container.registerSingleton<ICategoryVideoRepository>(
  'CategoryVideoRepository',
  CategoryVideoRepository,
);

container.registerSingleton<IGenreVideoRepository>(
  'GenreVideoRepository',
  GenreVideoRepository,
);
