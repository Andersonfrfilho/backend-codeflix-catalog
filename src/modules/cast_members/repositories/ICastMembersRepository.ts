import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import ICreateCastMemberDTO from '@modules/cast_members/dtos/ICreateCastMemberDTO';
import IPagination from '@shared/dtos/IPaginatedDTO';
import IListCastMembersDTO from '@modules/cast_members/dtos/IListCastMembersDTO';
import IUpdateCastMemberDTO from '@modules/cast_members/dtos/IUpdatedCastMemberDTO';

export default interface ICastMembersRepository {
  findById({ id }: { id: string }): Promise<CastMember | undefined>;
  create(data: ICreateCastMemberDTO): Promise<CastMember>;
  list(data: IPagination): Promise<IListCastMembersDTO>;
  update(data: IUpdateCastMemberDTO): Promise<CastMember | undefined>;
  delete({ id }: { id: string }): Promise<CastMember | undefined>;
}
