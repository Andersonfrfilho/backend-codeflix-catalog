import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CategoriesController from '@modules/categories/infra/http/controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      is_active: Joi.boolean().required(),
      description: Joi.string().required(),
    },
  }),
  categoriesController.create,
);
categoriesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      keyword: Joi.string().default(''),
      order: Joi.boolean().default(true),
      page: Joi.string().default(0),
      number: Joi.number().default(10),
    },
  }),
  categoriesController.index,
);
categoriesRouter.get('/:id', categoriesController.show);
categoriesRouter.put('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.destroy);

export default categoriesRouter;
