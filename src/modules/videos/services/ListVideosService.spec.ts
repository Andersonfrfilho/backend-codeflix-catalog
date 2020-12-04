import faker from 'faker';
import CreateGenreService from '@modules/genres/services/CreateGenreService';
import ListGenresService from '@modules/genres/services/ListGenresService';
import FakeGenresRepository from '@modules/genres/repositories/fakes/FakeGenresRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeGenresRepository: FakeGenresRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createGenreService: CreateGenreService;
let listGenresService: ListGenresService;

describe('ListGenresService', () => {
  beforeEach(() => {
    fakeGenresRepository = new FakeGenresRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createGenreService = new CreateGenreService(fakeGenresRepository);
    listGenresService = new ListGenresService(fakeGenresRepository);
  });
  it('should be able to create a new genre after list the genres', async () => {
    const createGenreServiceSpy = jest.spyOn(createGenreService, 'execute');
    const listGenresServiceSpy = jest.spyOn(listGenresService, 'execute');
    const genreRepositorySpy = jest.spyOn(fakeGenresRepository, 'create');
    const fakeCacheInvalidateByKeyProviderSpy = jest.spyOn(
      fakeCacheProvider,
      'invalidateByKey',
    );
    const fakeStorageProviderSaveFileSpy = jest.spyOn(
      fakeStorageProvider,
      'saveFile',
    );

    const genre_one_content = {
      name: faker.name.firstName(),
      is_active: faker.random.boolean(),
    };
    const genre_one = await createGenreService.execute(genre_one_content);
    // MATCH
    expect(genre_one).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        is_active: expect.any(Boolean),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(genre_one.name).toEqual(genre_one_content.name);
    expect(genre_one.is_active).toEqual(genre_one_content.is_active);
    // SPY-ON
    expect(createGenreServiceSpy).toHaveBeenCalled();
    expect(genreRepositorySpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheInvalidateByKeyProviderSpy).toHaveBeenCalled();

    const genre_two_content = {
      name: faker.name.firstName(),
      is_active: faker.random.boolean(),
    };
    const genre_two = await createGenreService.execute(genre_two_content);

    // MATCH
    expect(genre_two).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        is_active: expect.any(Boolean),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(genre_two.name).toEqual(genre_two_content.name);
    expect(genre_two.is_active).toEqual(genre_two_content.is_active);
    // SPY-ON
    expect(createGenreServiceSpy).toHaveBeenCalled();
    expect(genreRepositorySpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();

    const genres = await listGenresService.execute({
      keyword: '',
      order: true,
      skip: 0,
      take: 10,
    });
    // MATCH
    expect(genres).toEqual(
      expect.objectContaining({
        total: expect.any(Number),
        genres: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            is_active: expect.any(Boolean),
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
          }),
        ]),
      }),
    );
    // SPYON
    expect(listGenresServiceSpy).toHaveBeenCalled();
  });
  it('should be to list genres even when there are no genres as an empty array', async () => {
    const listGenresServiceSpy = jest.spyOn(listGenresService, 'execute');

    const genres = await listGenresService.execute({
      keyword: '',
      order: true,
      skip: 0,
      take: 10,
    });
    // MATCH
    expect(genres).toEqual({ genres: [], total: 0 });
    // SPYON
    expect(listGenresServiceSpy).toHaveBeenCalled();
  });
});
