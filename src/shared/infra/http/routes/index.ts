// src/routes/index.ts
import { Router } from 'express';
import genresRouter from '@modules/genres/infra/http/routes/genres.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import castMemberRouter from '@modules/cast_members/infra/http/routes/cast_member.routes';

const routes = Router();

routes.use('/genres', genresRouter);
routes.use('/categories', categoriesRouter);
routes.use('/cast_members', castMemberRouter);

export default routes;
