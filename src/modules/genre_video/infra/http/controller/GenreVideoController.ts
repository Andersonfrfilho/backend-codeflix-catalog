import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGenreVideoService from '@modules/genre_video/services/CreateGenreVideoService';
import ShowGenreVideoService from '@modules/genre_video/services/FindGenreVideoService';
import ListGenreVideosService from '@modules/genre_video/services/ListGenreVideoService';
import DeleteGenreVideoService from '@modules/genre_video/services/DeleteGenreVideoService';
import UpdateGenreVideoService from '@modules/genre_video/services/UpdateGenreVideoService';
// const upload = multer(uploadConfig);
export default class GenreVideoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { genre_id, video_id } = request.body;
    const createGenreVideo = container.resolve(CreateGenreVideoService);
    const genre_video = await createGenreVideo.execute({
      genre_id,
      video_id,
    });
    return response.json(genre_video);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showGenreVideo = container.resolve(ShowGenreVideoService);
    const cast_member = await showGenreVideo.execute({ id });
    return response.json(cast_member);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { keyword, order, number, page } = request.query;
    const listGenreVideos = container.resolve(ListGenreVideosService);
    const cast_member = await listGenreVideos.execute({
      keyword: String(keyword),
      order: Boolean(order),
      skip: Number(page),
      take: Number(number),
    });
    return response.json(cast_member);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const deleteGenreVideo = container.resolve(DeleteGenreVideoService);
    const cast_member_deleted = await deleteGenreVideo.execute({
      id,
    });
    return response.json(cast_member_deleted);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { genre_id, video_id } = request.body;
    const updateGenreVideo = container.resolve(UpdateGenreVideoService);
    const cast_member_deleted = await updateGenreVideo.execute({
      id,
      genre_id,
      video_id,
    });
    return response.json(cast_member_deleted);
  }
}
