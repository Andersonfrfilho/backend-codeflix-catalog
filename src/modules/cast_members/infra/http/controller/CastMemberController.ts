import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCastMemberService from '@modules/cast_members/services/CreateCastMemberService';
import ShowCastMemberService from '@modules/cast_members/services/FindCastMemberService';
import ListCastMembersService from '@modules/cast_members/services/ListCastMembersService';
import DeleteCastMemberService from '@modules/cast_members/services/DeleteCastMemberService';
import UpdateCastMemberService from '@modules/cast_members/services/UpdateCastMemberService';
// const upload = multer(uploadConfig);
export default class CastMemberController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type } = request.body;
    const createCastMember = container.resolve(CreateCastMemberService);
    const cast_member = await createCastMember.execute({
      name,
      type,
    });
    return response.json(cast_member);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const showCastMember = container.resolve(ShowCastMemberService);
    const cast_member = await showCastMember.execute({ id });
    return response.json(cast_member);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { keyword, order, number, page } = request.query;
    const listCastMembers = container.resolve(ListCastMembersService);
    const cast_member = await listCastMembers.execute({
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
    const deleteCastMember = container.resolve(DeleteCastMemberService);
    const cast_member_deleted = await deleteCastMember.execute({
      id,
    });
    return response.json(cast_member_deleted);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, type, image_id } = request.body;
    const updateCastMember = container.resolve(UpdateCastMemberService);
    const cast_member_deleted = await updateCastMember.execute({
      id,
      name,
      email,
      password,
      type,
      image_id,
    });
    return response.json(cast_member_deleted);
  }
}
