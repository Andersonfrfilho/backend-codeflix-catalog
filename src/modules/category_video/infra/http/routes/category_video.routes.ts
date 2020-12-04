import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CategoryVideoController from '@modules/category_video/infra/http/controller/CategoryVideoController';

const castMembersRouter = Router();
const castMembersController = new CategoryVideoController();
castMembersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      category_id: Joi.string().required(),
      video_id: Joi.string().required(),
    },
  }),
  castMembersController.create,
);
castMembersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      keyword: Joi.string().default(''),
      order: Joi.boolean().default(true),
      page: Joi.string().default(0),
      number: Joi.number().default(10),
    },
  }),
  castMembersController.index,
);
castMembersRouter.get('/:id', castMembersController.show);
castMembersRouter.put('/:id', castMembersController.update);
castMembersRouter.delete('/:id', castMembersController.destroy);
export default castMembersRouter;
