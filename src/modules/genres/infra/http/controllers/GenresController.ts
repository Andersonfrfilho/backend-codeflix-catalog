import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGenreService from '@modules/genres/services/CreateGenreService';
import ListGenresService from '@modules/genres/services/ListGenresService';
import FindGenreByIdService from '@modules/genres/services/FindGenreByIdService';
import UpdateGenreService from '@modules/genres/services/UpdateGenreService';
import DeleteGenreService from '@modules/genres/services/DeleteGenreService';

export default class GenreController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { keyword, order, number, page } = request.query;
    const listGenresService = container.resolve(ListGenresService);
    const genres = await listGenresService.execute({
      keyword: String(keyword),
      order: Boolean(order),
      skip: Number(page),
      take: Number(number),
    });
    return response.json(genres);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, is_active } = request.body;
    const createGenreService = container.resolve(CreateGenreService);
    const image = await createGenreService.execute({
      name,
      is_active,
    });
    return response.json(image);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findGeneratedById = container.resolve(FindGenreByIdService);
    const image = await findGeneratedById.execute({ id });
    return response.json(image);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, is_active } = request.body;
    const updateGenreService = container.resolve(UpdateGenreService);
    const genre = await updateGenreService.execute({
      id,
      name,
      is_active,
    });
    return response.json(genre);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const deleteGenreService = container.resolve(DeleteGenreService);
    const imageDeleted = await deleteGenreService.execute({ id });
    return response.json(imageDeleted);
  }
}
