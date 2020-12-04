import { injectable, inject } from 'tsyringe';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import AppError from '@shared/errors/AppError';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';

@injectable()
class DeleteCastMemberService {
  constructor(
    @inject('CastMembersRepository')
    private cast_membersRepository: ICastMembersRepository,
  ) {}

  public async execute({
    id,
  }: {
    id: string;
  }): Promise<CastMember | undefined> {
    const cast_member = await this.cast_membersRepository.findById({ id });
    if (!cast_member) {
      throw new AppError('This cast member is already exist');
    }
    await this.cast_membersRepository.delete({ id });
    return cast_member;
  }
}
export default DeleteCastMemberService;
