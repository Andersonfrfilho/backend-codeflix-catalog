import faker from 'faker';
import AppError from '@shared/errors/AppError';
import CreateImageService from '@modules/images/services/CreateImageService';
import UpdateImageService from '@modules/images/services/UpdateImageService';
import FakeImagesRepository from '@modules/images/repositories/fakes/FakeImagesRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createImageService: CreateImageService;
let updateImageByIdService: UpdateImageService;

describe('UpdateImageService', () => {
  beforeEach(() => {
    fakeImagesRepository = new FakeImagesRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createImageService = new CreateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
    updateImageByIdService = new UpdateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new image after like updated the image', async () => {
    const createImageServiceSpy = jest.spyOn(createImageService, 'execute');
    const imageRepositoryCreateSpy = jest.spyOn(fakeImagesRepository, 'create');
    const imageRepositoryUpdateSpy = jest.spyOn(fakeImagesRepository, 'update');
    const fakeStorageProviderSaveFileSpy = jest.spyOn(
      fakeStorageProvider,
      'saveFile',
    );
    const fakeStorageProviderDeleteFileSpy = jest.spyOn(
      fakeStorageProvider,
      'deleteFile',
    );
    const fakeCacheProviderInvalidateByKeySpy = jest.spyOn(
      fakeCacheProvider,
      'invalidateByKey',
    );
    const findImageByIdServiceSpy = jest.spyOn(
      updateImageByIdService,
      'execute',
    );

    const image_content = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
    // Created Image
    const image = await createImageService.execute(image_content);
    // MATCH
    expect(image).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(image.link).toEqual(image_content.link);
    expect(image.file_name).toEqual(image_content.file_name);
    // SPY-ON
    expect(createImageServiceSpy).toHaveBeenCalled();
    expect(imageRepositoryCreateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    // Deleted Image
    const image_edited_content = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
    const image_edited = await updateImageByIdService.execute({
      id: image.id,
      ...image_edited_content,
    });
    // MATCH
    expect(image_edited).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(image_edited?.link).toEqual(image_edited_content.link);
    expect(image_edited?.file_name).toEqual(image_edited_content.file_name);
    // SPY-ON
    expect(findImageByIdServiceSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    expect(imageRepositoryUpdateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderDeleteFileSpy).toHaveBeenCalled();
  });
  it('should be thrown error if the image to be update no longer exists', async () => {
    const imageRepositoryUpdateFindImageByIdSpy = jest.spyOn(
      fakeImagesRepository,
      'findImageById',
    );

    const image_id = faker.random.uuid();
    const image_edited_content = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
    // MATCH
    await expect(
      updateImageByIdService.execute({
        id: image_id,
        ...image_edited_content,
      }),
    ).rejects.toBeInstanceOf(AppError);
    // SPYON
    expect(imageRepositoryUpdateFindImageByIdSpy).toHaveBeenCalled();
  });
});
