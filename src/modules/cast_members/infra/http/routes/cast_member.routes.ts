import { Router } from 'express';

const castMembersRouter = Router();

castMembersRouter.get('/', async (request, response) => {
  return response.json({ route: true });
});

export default castMembersRouter;
