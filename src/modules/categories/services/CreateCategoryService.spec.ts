import faker from 'faker';
import CreateImageService from '@modules/images/services/CreateImageService';
import FakeImagesRepository from '@modules/images/repositories/fakes/FakeImagesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createImageService: CreateImageService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateImageService', () => {
  beforeEach(() => {
    fakeImagesRepository = new FakeImagesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createImageService = new CreateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new image', async () => {
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
    const imageContent = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
    const image = await createImageService.execute(imageContent);
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
    expect(image.link).toEqual(imageContent.link);
    expect(image.file_name).toEqual(imageContent.file_name);
    // SPYON
    expect(createImageServiceSpy).toHaveBeenCalled();
    expect(imageRepositoryCreateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
  });
});
