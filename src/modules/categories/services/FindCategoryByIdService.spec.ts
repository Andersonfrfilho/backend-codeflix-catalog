import faker from 'faker';
import AppError from '@shared/errors/AppError';
import CreateImageService from '@modules/images/services/CreateImageService';
import FindImageByIdService from '@modules/images/services/FindImageByIdService';
import FakeImagesRepository from '@modules/images/repositories/fakes/FakeImagesRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createImageService: CreateImageService;
let findImageByIdService: FindImageByIdService;

describe('FindImageByIdService', () => {
  beforeEach(() => {
    fakeImagesRepository = new FakeImagesRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createImageService = new CreateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
    findImageByIdService = new FindImageByIdService(fakeImagesRepository);
  });
  it('should be able to create a new image after show this is image', async () => {
    const createImageServiceSpy = jest.spyOn(createImageService, 'execute');
    const imageRepositoryCreateSpy = jest.spyOn(fakeImagesRepository, 'create');
    const fakeStorageProviderSaveFileSpy = jest.spyOn(
      fakeStorageProvider,
      'saveFile',
    );
    const fakeCacheProviderInvalidateByKeySpy = jest.spyOn(
      fakeCacheProvider,
      'invalidateByKey',
    );
    const findImageByIdServiceSpy = jest.spyOn(findImageByIdService, 'execute');

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
    const image_found = await findImageByIdService.execute({ id: image.id });
    // MATCH
    expect(image_found).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(image_found?.link).toEqual(image_content.link);
    expect(image_found?.file_name).toEqual(image_content.file_name);
    // SPY-ON
    expect(findImageByIdServiceSpy).toHaveBeenCalled();
  });
  it('should be thrown error if the image to be deleted no longer exists', async () => {
    const imageRepositoryDeleteSpy = jest.spyOn(
      fakeImagesRepository,
      'findImageById',
    );
    const image_id = faker.random.uuid();

    // MATCH
    await expect(
      findImageByIdService.execute({
        id: image_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    // SPYON
    expect(imageRepositoryDeleteSpy).toHaveBeenCalled();
  });
});
