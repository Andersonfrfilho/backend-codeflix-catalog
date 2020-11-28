import { getRepository, Raw, Repository } from 'typeorm';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';
import ICreateCastMemberDTO from '@modules/cast_members/dtos/ICreateCastMemberDTO';
import ICastMembersRepository from '@modules/cast_members/repositories/ICastMembersRepository';
import IPaginate, { EOrder } from '@shared/dtos/IPaginatedDTO';
import IListCastMembersDTO from '@modules/cast_members/dtos/IListCastMembersDTO';

class CastMembersRepository implements ICastMembersRepository {
  private ormRepository: Repository<CastMember>;

  constructor() {
    this.ormRepository = getRepository(CastMember);
  }

  public async findById({
    id,
  }: {
    id: string;
  }): Promise<CastMember | undefined> {
    const cast_members = await this.ormRepository.findOne(id);
    return cast_members;
  }

  public async create(
    cast_membersData: ICreateCastMemberDTO,
  ): Promise<CastMember> {
    const cast_members = this.ormRepository.create(cast_membersData);
    await this.ormRepository.save(cast_members);
    return cast_members;
  }

  public async save(cast_members: CastMember): Promise<CastMember> {
    return this.ormRepository.save(cast_members);
  }

  public async list({
    take,
    skip,
    keyword,
    order,
  }: IPaginate): Promise<IListCastMembersDTO> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        name: Raw(cast_members => `${cast_members} ILIKE '%${keyword}%'`),
      },
      order: { created_at: order ? EOrder.DESC : EOrder.ASC },
      take,
      skip,
    });
    return { total, cast_members: result };
  }

  public async update(
    cast_membersData: Partial<CastMember>,
  ): Promise<CastMember | undefined> {
    const cast_membersExist = await this.ormRepository.findOne({
      where: { id: cast_membersData.id },
    });
    const cast_members = await this.ormRepository.save({
      ...cast_membersExist,
      ...cast_membersData,
    });
    return cast_members;
  }

  public async delete({ id }: { id: string }): Promise<CastMember | undefined> {
    const cast_membersExist = await this.ormRepository.findOneOrFail({
      where: { id },
    });
    await this.ormRepository.delete({ id });
    return cast_membersExist;
  }
}
export default CastMembersRepository;
