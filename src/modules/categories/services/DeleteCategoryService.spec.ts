import faker from 'faker';
import AppError from '@shared/errors/AppError';
import CreateImageService from '@modules/images/services/CreateImageService';
import DeleteImageService from '@modules/images/services/DeleteImageService';
import FakeImagesRepository from '@modules/images/repositories/fakes/FakeImagesRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createImageService: CreateImageService;
let deleteImageService: DeleteImageService;

describe('DeleteImageService', () => {
  beforeEach(() => {
    fakeImagesRepository = new FakeImagesRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createImageService = new CreateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
    deleteImageService = new DeleteImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new image deleted this image', async () => {
    const createImageServiceSpy = jest.spyOn(createImageService, 'execute');
    const imageRepositoryCreateSpy = jest.spyOn(fakeImagesRepository, 'create');
    const imageRepositoryDeleteSpy = jest.spyOn(fakeImagesRepository, 'delete');
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
    const deleteImageServiceSpy = jest.spyOn(deleteImageService, 'execute');

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
    const image_deleted = await deleteImageService.execute({ id: image.id });
    // MATCH
    expect(image_deleted).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(image_deleted?.link).toEqual(image_content.link);
    expect(image_deleted?.file_name).toEqual(image_content.file_name);
    // SPY-ON
    expect(deleteImageServiceSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    expect(imageRepositoryDeleteSpy).toHaveBeenCalled();
    expect(fakeStorageProviderDeleteFileSpy).toHaveBeenCalled();
  });
  it('should be thrown error if the image to be deleted no longer exists', async () => {
    const imageRepositoryDeleteSpy = jest.spyOn(fakeImagesRepository, 'delete');
    const image_id = faker.random.uuid();

    // MATCH
    await expect(
      deleteImageService.execute({
        id: image_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    // SPYON
    expect(imageRepositoryDeleteSpy).toHaveBeenCalled();
  });
});
