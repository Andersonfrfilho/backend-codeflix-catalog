import { injectable, inject } from 'tsyringe';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import AppError from '@shared/errors/AppError';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';

interface IRequest {
  id: string;
}
@injectable()
class FindCastMemberService {
  constructor(
    @inject('CastMembersRepository')
    private cast_membersRepository: ICastMembersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<CastMember | undefined> {
    const postExist = await this.cast_membersRepository.findById({ id });

    if (!postExist) {
      throw new AppError('This post is not exist');
    }
    return postExist;
  }
}
export default FindCastMemberService;
