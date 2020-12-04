import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import GenreVideoController from '@modules/genre_video/infra/http/controller/GenreVideoController';

const genreVideoRouter = Router();
const genreVideoController = new GenreVideoController();
genreVideoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      genre_id: Joi.string().required(),
      video_id: Joi.string().required(),
    },
  }),
  genreVideoController.create,
);
genreVideoRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      keyword: Joi.string().default(''),
      order: Joi.boolean().default(true),
      page: Joi.string().default(0),
      number: Joi.number().default(10),
    },
  }),
  genreVideoController.index,
);
genreVideoRouter.get('/:id', genreVideoController.show);
genreVideoRouter.put('/:id', genreVideoController.update);
genreVideoRouter.delete('/:id', genreVideoController.destroy);
export default genreVideoRouter;
