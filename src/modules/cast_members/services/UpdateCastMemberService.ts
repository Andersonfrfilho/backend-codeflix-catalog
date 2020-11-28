import { injectable, inject } from 'tsyringe';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import AppError from '@shared/errors/AppError';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import IUpdateCastMemberDTO from '@modules/cast_members/dtos/IUpdatedCastMemberDTO';

@injectable()
class UpdateCastMemberService {
  constructor(
    @inject('CastMembersRepository')
    private cast_membersRepository: ICastMembersRepository,
  ) {}

  public async execute({
    id,
    name,
    type,
  }: IUpdateCastMemberDTO): Promise<CastMember | undefined> {
    const cast_memberExist = await this.cast_membersRepository.findById({ id });
    if (!cast_memberExist) {
      throw new AppError(
        'Only authenticated cast_member can change avatar',
        401,
      );
    }

    const cast_member = await this.cast_membersRepository.update({
      ...cast_memberExist,
      name,
      type,
    });
    return cast_member;
  }
}
export default UpdateCastMemberService;
