import CastMembers from '@modules/cast_members/infra/typeorm/entities/CastMember';

export default interface IListCastMemberServiceReturn {
  cast_members: CastMembers[];
  total: number;
}
