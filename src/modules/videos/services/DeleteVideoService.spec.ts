import faker from 'faker';
import AppError from '@shared/errors/AppError';
import CreateGenreService from '@modules/genres/services/CreateGenreService';
import DeleteGenreService from '@modules/genres/services/DeleteGenreService';
import FakeGenresRepository from '@modules/genres/repositories/fakes/FakeGenresRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeGenresRepository: FakeGenresRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createGenreService: CreateGenreService;
let deleteGenreService: DeleteGenreService;

describe('DeleteGenreService', () => {
  beforeEach(() => {
    fakeGenresRepository = new FakeGenresRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createGenreService = new CreateGenreService(fakeGenresRepository);
    deleteGenreService = new DeleteGenreService(fakeGenresRepository);
  });
  it('should be able to create a new genre deleted this genre', async () => {
    const createGenreServiceSpy = jest.spyOn(createGenreService, 'execute');
    const genreRepositoryCreateSpy = jest.spyOn(fakeGenresRepository, 'create');
    const genreRepositoryDeleteSpy = jest.spyOn(fakeGenresRepository, 'delete');
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
    const deleteGenreServiceSpy = jest.spyOn(deleteGenreService, 'execute');

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
    const genre_deleted = await deleteGenreService.execute({ id: genre.id });
    // MATCH
    expect(genre_deleted).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        is_active: expect.any(Boolean),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(genre_deleted?.name).toEqual(genre_content.name);
    expect(genre_deleted?.is_active).toEqual(genre_content.is_active);
    // SPY-ON
    expect(deleteGenreServiceSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    expect(genreRepositoryDeleteSpy).toHaveBeenCalled();
    expect(fakeStorageProviderDeleteFileSpy).toHaveBeenCalled();
  });
  it('should be thrown error if the genre to be deleted no longer exists', async () => {
    const genreRepositoryDeleteSpy = jest.spyOn(fakeGenresRepository, 'delete');
    const genre_id = faker.random.uuid();

    // MATCH
    await expect(
      deleteGenreService.execute({
        id: genre_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    // SPYON
    expect(genreRepositoryDeleteSpy).toHaveBeenCalled();
  });
});
