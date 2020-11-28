import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CastMembersController from '@modules/cast_members/infra/http/controller/CastMembersController';

const castMembersRouter = Router();
const castMembersController = new CastMembersController();
castMembersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.number().required(),
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
