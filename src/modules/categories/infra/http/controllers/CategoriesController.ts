import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import FindCategoryByIdService from '@modules/categories/services/FindCategoryByIdService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { keyword, order, number, page } = request.query;
    const listCategoriesService = container.resolve(ListCategoriesService);
    const categories = await listCategoriesService.execute({
      keyword: String(keyword),
      order: Boolean(order),
      skip: Number(page),
      take: Number(number),
    });
    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, is_active, description } = request.body;
    const createCategoryService = container.resolve(CreateCategoryService);
    const image = await createCategoryService.execute({
      name,
      is_active,
      description,
    });
    return response.json(image);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findCategorydById = container.resolve(FindCategoryByIdService);
    const image = await findCategorydById.execute({ id });
    return response.json(image);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, is_active } = request.body;
    const updateCategoryService = container.resolve(UpdateCategoryService);
    const image = await updateCategoryService.execute({
      id,
      name,
      description,
      is_active,
    });
    return response.json(image);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const deleteCategoryService = container.resolve(DeleteCategoryService);
    const imageDeleted = await deleteCategoryService.execute({ id });
    return response.json(imageDeleted);
  }
}
