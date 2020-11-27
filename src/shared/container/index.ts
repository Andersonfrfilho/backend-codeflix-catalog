import { container } from 'tsyringe';

import '@shared/container/providers';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import GenresRepository from '@modules/genres/infra/typeorm/repositories/GenresRepository';

import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import CastMembersRepository from '@modules/cast_members/infra/typeorm/repositories/CastMembersRepository';

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
