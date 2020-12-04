import faker from 'faker';
import AppError from '@shared/errors/AppError';
import CreateGenreService from '@modules/genres/services/CreateGenreService';
import FindGenreByIdService from '@modules/genres/services/FindGenreByIdService';
import FakeGenresRepository from '@modules/genres/repositories/fakes/FakeGenresRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeGenresRepository: FakeGenresRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createGenreService: CreateGenreService;
let findGenreByIdService: FindGenreByIdService;

describe('FindGenreByIdService', () => {
  beforeEach(() => {
    fakeGenresRepository = new FakeGenresRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createGenreService = new CreateGenreService(fakeGenresRepository);
    findGenreByIdService = new FindGenreByIdService(fakeGenresRepository);
  });
  it('should be able to create a new genre after show this is genre', async () => {
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
    const findGenreByIdServiceSpy = jest.spyOn(findGenreByIdService, 'execute');

    const genre_content = {
      name: faker.name.firstName(),
      is_active: faker.random.boolean(),
    };
    // Created Genre
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
    expect(genre.is_active).toEqual(genre_content.is_active);
    // SPY-ON
    expect(createGenreServiceSpy).toHaveBeenCalled();
    expect(genreRepositoryCreateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    // Deleted Genre
    const genre_found = await findGenreByIdService.execute({ id: genre.id });
    // MATCH
    expect(genre_found).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        is_active: expect.any(Boolean),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(genre_found?.name).toEqual(genre_content.name);
    expect(genre_found?.is_active).toEqual(genre_content.is_active);
    // SPY-ON
    expect(findGenreByIdServiceSpy).toHaveBeenCalled();
  });
  it('should be thrown error if the genre to be deleted no longer exists', async () => {
    const genreRepositoryDeleteSpy = jest.spyOn(
      fakeGenresRepository,
      'findGenreById',
    );
    const genre_id = faker.random.uuid();

    // MATCH
    await expect(
      findGenreByIdService.execute({
        id: genre_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    // SPYON
    expect(genreRepositoryDeleteSpy).toHaveBeenCalled();
  });
});
