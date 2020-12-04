import { injectable, inject } from 'tsyringe';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import AppError from '@shared/errors/AppError';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import ICreateCastMemberDTO from '@modules/cast_members/dtos/ICreateCastMemberDTO';

@injectable()
class CreateCastMemberService {
  constructor(
    @inject('CastMembersRepository')
    private castMembersRepository: ICastMembersRepository,
  ) {}

  public async execute({
    name,
    type,
  }: ICreateCastMemberDTO): Promise<CastMember> {
    const cast_member = await this.castMembersRepository.create({
      name,
      type,
    });

    return cast_member;
  }
}
export default CreateCastMemberService;
