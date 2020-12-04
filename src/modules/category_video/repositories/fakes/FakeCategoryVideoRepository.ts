import { v4 as uuidv4 } from 'uuid';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import ICreateCastMemberDTO from '@modules/cast_members/dtos/ICreateCastMemberDTO';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import AppError from '@shared/errors/AppError';
import IUpdateCastMemberDTO from '@modules/cast_members/dtos/IUpdatedCastMemberDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import IListCastMembersDTO from '@modules/cast_members/dtos/IListCastMembersDTO';
import Fakes from '@shared/utils';

class CastMembersRepository implements ICastMembersRepository {
  private cast_members: CastMember[] = [];

  public async findById({
    id,
  }: {
    id: string;
  }): Promise<CastMember | undefined> {
    const findCastMember = this.cast_members.find(
      cast_member => cast_member.id === id,
    );
    return findCastMember;
  }

  public async list({
    keyword = '',
    order = true,
    take = 0,
    skip = 5,
  }: IPaginationDTO): Promise<IListCastMembersDTO> {
    const fakePagination = new Fakes.FindAndCount({
      array: this.cast_members,
      keyword,
      order,
      property: 'content',
      skip,
      take,
    });
    const cast_members = fakePagination.findAndCount();
    return {
      total: cast_members.length,
      cast_members,
    };
  }

  public async create(
    cast_memberData: ICreateCastMemberDTO,
  ): Promise<CastMember> {
    const cast_member = new CastMember();
    Object.assign(cast_member, { id: uuidv4() }, cast_memberData);
    this.cast_members.push(cast_member);
    return cast_member;
  }

  public async update(
    cast_memberData: IUpdateCastMemberDTO,
  ): Promise<CastMember | undefined> {
    const cast_memberIndex = this.cast_members.findIndex(
      cast_member => cast_member.id === cast_memberData.id,
    );
    if (cast_memberIndex === -1) {
      throw new AppError('CastMember not exist', 400);
    }
    const newCastMember = {
      ...this.cast_members[cast_memberIndex],
      ...cast_memberData,
    };
    this.cast_members[cast_memberIndex] = { ...newCastMember };
    return this.cast_members[cast_memberIndex];
  }

  public async delete({ id }: { id: string }): Promise<CastMember | undefined> {
    const cast_memberIndex = this.cast_members.findIndex(
      cast_member => cast_member.id === id,
    );
    if (cast_memberIndex === -1) {
      throw new AppError('CastMember not exist', 400);
    }
    const cast_member = this.cast_members[cast_memberIndex];
    delete this.cast_members[cast_memberIndex];
    return cast_member;
  }
}
export default CastMembersRepository;
