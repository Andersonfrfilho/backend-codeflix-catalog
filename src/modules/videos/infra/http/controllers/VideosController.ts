import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateVideoGenreCategoryUploadService from '@modules/videos/services/CreateVideoGenreCategoryUploadService';
import ListVideosService from '@modules/videos/services/ListVideosService';
import FindVideoByIdService from '@modules/videos/services/FindVideoByIdService';
import UpdateVideoService from '@modules/videos/services/UpdateVideoService';
import DeleteVideoService from '@modules/videos/services/DeleteVideoService';

export default class VideoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { keyword, order, number, page } = request.query;
    const listVideosService = container.resolve(ListVideosService);
    const videos = await listVideosService.execute({
      keyword: String(keyword),
      order: Boolean(order),
      skip: Number(page),
      take: Number(number),
    });
    return response.json(videos);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      year_launched,
      opened,
      rating,
      duration,
      category_name,
      genre_name,
    } = request.body;

    const createVideoGenreCategoryUploadService = container.resolve(
      CreateVideoGenreCategoryUploadService,
    );
    const image = await createVideoGenreCategoryUploadService.execute({
      title,
      name: request.file.filename,
      description,
      year_launched,
      opened,
      rating,
      duration,
      category_name,
      genre_name,
    });
    return response.json(image);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findGeneratedById = container.resolve(FindVideoByIdService);
    const image = await findGeneratedById.execute({ id });
    return response.json(image);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, is_active } = request.body;
    const updateVideoService = container.resolve(UpdateVideoService);
    const video = await updateVideoService.execute({
      id,
      name,
      is_active,
    });
    return response.json(video);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const deleteVideoService = container.resolve(DeleteVideoService);
    const imageDeleted = await deleteVideoService.execute({ id });
    return response.json(imageDeleted);
  }
}
