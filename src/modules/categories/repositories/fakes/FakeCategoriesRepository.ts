import { v4 as uuidv4 } from 'uuid';
import Image from '@modules/images/infra/typeorm/entities/Image';
import IImagesRepository from '@modules/images/repositories/IImagesRepository';
import ICreateImageDTO from '@modules/images/dtos/ICreateImageDTO';
import IUpdateImageDTO from '@modules/images/dtos/IUpdateImageDTO';
import AppError from '@shared/errors/AppError';
import IListUsersDTO from '@modules/images/dtos/IListImagesDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import Fakes from '@shared/utils';

class FakerImagesRepository implements IImagesRepository {
  private images: Image[] = [];

  public async create({ file_name, link }: ICreateImageDTO): Promise<Image> {
    const image = new Image();
    const date = new Date();
    Object.assign(image, {
      id: uuidv4(),
      link,
      file_name,
      created_at: date,
      updated_at: date,
    });
    this.images.push(image);
    return image;
  }

  public async list({
    keyword = '',
    order = true,
    take = 0,
    skip = 5,
  }: IPaginationDTO): Promise<IListUsersDTO> {
    const fakePagination = new Fakes.FindAndCount({
      array: this.images,
      keyword,
      order,
      property: 'file_name',
      skip,
      take,
    });
    const images = fakePagination.findAndCount();

    return {
      total: images.length,
      images,
    };
  }

  public async delete({ id }: { id: string }): Promise<Image | undefined> {
    const indexListImages = this.images.findIndex(image => {
      return image.id === id;
    });
    const imageDelete = this.images[indexListImages];
    delete this.images[indexListImages];
    return imageDelete;
  }

  public async findImageById({
    id,
  }: {
    id: string;
  }): Promise<Image | undefined> {
    const findImage = this.images.find(image => {
      return image.id === id;
    });
    return findImage;
  }

  public async update({
    id,
    link,
    file_name,
  }: IUpdateImageDTO): Promise<Image | undefined> {
    const findImage = this.images.map(image => {
      if (image.id === id) {
        return { ...image, link, file_name };
      }
      return image;
    });
    if (!findImage) {
      throw new AppError('Image dont exist', 400);
    }
    this.images = [...findImage];
    const image = this.images.find(image => image.id === id);
    return image;
  }
}
export default FakerImagesRepository;
