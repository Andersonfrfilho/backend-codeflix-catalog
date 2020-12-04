import faker from 'faker';
import CreateGenreService from '@modules/genres/services/CreateGenreService';
import FakeGenresRepository from '@modules/genres/repositories/fakes/FakeGenresRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeGenresRepository: FakeGenresRepository;
let fakeStorageProvider: FakeStorageProvider;
let createGenreService: CreateGenreService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateGenreService', () => {
  beforeEach(() => {
    fakeGenresRepository = new FakeGenresRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createGenreService = new CreateGenreService(fakeGenresRepository);
  });
  it('should be able to create a new genre', async () => {
    const createGenreServiceSpy = jest.spyOn(createGenreService, 'execute');
    const genreRepositoryCreateSpy = jest.spyOn(fakeGenresRepository, 'create');
    const fakeStorageProviderSaveFileSpy = jest.spyOn(
      fakeStorageProvider,
      'saveFile',
    );

    const fakeCacheProviderInvalidateByKeySpy = jest.spyOn(
      fakeCacheProvider,
      'invalidateByKey',
    );
    const genre_content = {
      name: faker.name.firstName(),
      is_active: faker.random.boolean(),
    };
    const genre = await createGenreService.execute(genre_content);
    // MATCH
    expect(genre).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        is_active: expect.any(Boolean),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(genre.name).toEqual(genre_content.name);
    // SPYON
    expect(createGenreServiceSpy).toHaveBeenCalled();
    expect(genreRepositoryCreateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
  });
});
