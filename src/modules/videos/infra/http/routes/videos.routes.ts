import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';
import uploadConfig from '@config/upload';
import VideoController from '@modules/videos/infra/http/controllers/VideosController';

const videosRouter = Router();
const upload = multer(uploadConfig.multer);
const videosController = new VideoController();

videosRouter.post(
  '/',
  upload.single('videos'),
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      year_launched: Joi.number().required(),
      opened: Joi.boolean().required(),
      rating: Joi.string().required(),
      duration: Joi.number().required(),
    },
  }),
  videosController.create,
);

videosRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      keyword: Joi.string().default(''),
      order: Joi.boolean().default(true),
      page: Joi.string().default(0),
      number: Joi.number().default(10),
    },
  }),
  videosController.index,
);
videosRouter.get('/:id', videosController.show);
videosRouter.put('/:id', videosController.update);
videosRouter.delete('/:id', videosController.destroy);

export default videosRouter;
