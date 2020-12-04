import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryVideoService from '@modules/category_video/services/CreateCategoryVideoService';
import ShowCategoryVideoService from '@modules/category_video/services/FindCategoryVideoService';
import ListCategoryVideosService from '@modules/category_video/services/ListCategoryVideoService';
import DeleteCategoryVideoService from '@modules/category_video/services/DeleteCategoryVideoService';
import UpdateCategoryVideoService from '@modules/category_video/services/UpdateCategoryVideoService';
// const upload = multer(uploadConfig);
export default class CategoryVideoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_id, video_id } = request.body;
    const createCategoryVideo = container.resolve(CreateCategoryVideoService);
    const category_video = await createCategoryVideo.execute({
      category_id,
      video_id,
    });
    return response.json(category_video);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCategoryVideo = container.resolve(ShowCategoryVideoService);
    const cast_member = await showCategoryVideo.execute({ id });
    return response.json(cast_member);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { keyword, order, number, page } = request.query;
    const listCategoryVideos = container.resolve(ListCategoryVideosService);
    const cast_member = await listCategoryVideos.execute({
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
    const deleteCategoryVideo = container.resolve(DeleteCategoryVideoService);
    const cast_member_deleted = await deleteCategoryVideo.execute({
      id,
    });
    return response.json(cast_member_deleted);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { category_id, video_id } = request.body;
    const updateCategoryVideo = container.resolve(UpdateCategoryVideoService);
    const cast_member_deleted = await updateCategoryVideo.execute({
      id,
      category_id,
      video_id,
    });
    return response.json(cast_member_deleted);
  }
}
