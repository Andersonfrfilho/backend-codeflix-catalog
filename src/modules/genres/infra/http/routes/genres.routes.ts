import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import GenresController from '@modules/genres/infra/http/controllers/GenresController';

const genresRouter = Router();
const genresController = new GenresController();

genresRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      is_active: Joi.boolean().required(),
    },
  }),
  genresController.create,
);
genresRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      keyword: Joi.string().default(''),
      order: Joi.boolean().default(true),
      page: Joi.string().default(0),
      number: Joi.number().default(10),
    },
  }),
  genresController.index,
);
genresRouter.get('/:id', genresController.show);
genresRouter.put('/:id', genresController.update);
genresRouter.delete('/:id', genresController.destroy);

export default genresRouter;
