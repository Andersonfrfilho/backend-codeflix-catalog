import faker from 'faker';
import CreateImageService from '@modules/images/services/CreateImageService';
import ListImagesService from '@modules/images/services/ListImagesService';
import FakeImagesRepository from '@modules/images/repositories/fakes/FakeImagesRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createImageService: CreateImageService;
let listImagesService: ListImagesService;

describe('ListImagesService', () => {
  beforeEach(() => {
    fakeImagesRepository = new FakeImagesRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createImageService = new CreateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
    listImagesService = new ListImagesService(fakeImagesRepository);
  });
  it('should be able to create a new image after list the images', async () => {
    const createImageServiceSpy = jest.spyOn(createImageService, 'execute');
    const listImagesServiceSpy = jest.spyOn(listImagesService, 'execute');
    const imageRepositorySpy = jest.spyOn(fakeImagesRepository, 'create');
    const fakeCacheInvalidateByKeyProviderSpy = jest.spyOn(
      fakeCacheProvider,
      'invalidateByKey',
    );
    const fakeStorageProviderSaveFileSpy = jest.spyOn(
      fakeStorageProvider,
      'saveFile',
    );

    const image_one_content = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
    const image_one = await createImageService.execute(image_one_content);
    // MATCH
    expect(image_one).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(image_one.link).toEqual(image_one_content.link);
    expect(image_one.file_name).toEqual(image_one_content.file_name);
    // SPY-ON
    expect(createImageServiceSpy).toHaveBeenCalled();
    expect(imageRepositorySpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheInvalidateByKeyProviderSpy).toHaveBeenCalled();

    const image_two_content = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
    const image_two = await createImageService.execute(image_two_content);

    // MATCH
    expect(image_two).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(image_two.link).toEqual(image_two_content.link);
    expect(image_two.file_name).toEqual(image_two_content.file_name);
    // SPY-ON
    expect(createImageServiceSpy).toHaveBeenCalled();
    expect(imageRepositorySpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();

    const images = await listImagesService.execute({
      keyword: '',
      order: true,
      skip: 0,
      take: 10,
    });
    // MATCH
    expect(images).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        images: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            link: expect.any(String),
            file_name: expect.any(String),
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
          }),
        ]),
      }),
    );
    // SPYON
    expect(listImagesServiceSpy).toHaveBeenCalled();
  });
  it('should be to list images even when there are no images as an empty array', async () => {
    const listImagesServiceSpy = jest.spyOn(listImagesService, 'execute');

    const images = await listImagesService.execute({
      keyword: '',
      order: true,
      skip: 0,
      take: 10,
    });
    // MATCH
    expect(images).toEqual({ images: [], total: 0 });
    // SPYON
    expect(listImagesServiceSpy).toHaveBeenCalled();
  });
});
