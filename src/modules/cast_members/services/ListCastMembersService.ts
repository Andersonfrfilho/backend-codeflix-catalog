import { injectable, inject } from 'tsyringe';
import IListCastMembersDTO from '@modules/cast_members/dtos/IListCastMembersDTO';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import IPagination from '@shared/dtos/IPaginatedDTO';

@injectable()
class FindCastMemberService {
  constructor(
    @inject('CastMembersRepository')
    private cast_membersRepository: ICastMembersRepository,
  ) {}

  public async execute(data: IPagination): Promise<IListCastMembersDTO> {
    const cast_members = await this.cast_membersRepository.list(data);
    return cast_members;
  }
}
export default FindCastMemberService;
