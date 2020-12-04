// src/routes/index.ts
import { Router } from 'express';
import genresRouter from '@modules/genres/infra/http/routes/genres.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import castMemberRouter from '@modules/cast_members/infra/http/routes/cast_member.routes';
import videosRouter from '@modules/videos/infra/http/routes/videos.routes';
import categoryVideoRouter from '@modules/category_video/infra/http/routes/category_video.routes';
import genreVideoRouter from '@modules/genre_video/infra/http/routes/genre_video.routes';

const routes = Router();

routes.use('/genres', genresRouter);
routes.use('/categories', categoriesRouter);
routes.use('/cast_members', castMemberRouter);
routes.use('/videos', videosRouter);
routes.use('/category_video', categoryVideoRouter);
routes.use('/genre_video', genreVideoRouter);

export default routes;
