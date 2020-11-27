import faker from 'faker';
import AppError from '@shared/errors/AppError';
import CreateGenreService from '@modules/genres/services/CreateGenreService';
import UpdateGenreService from '@modules/genres/services/UpdateGenreService';
import FakeGenresRepository from '@modules/genres/repositories/fakes/FakeGenresRepository';
import FakeStorageService from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeGenresRepository: FakeGenresRepository;
let fakeStorageProvider: FakeStorageService;
let fakeCacheProvider: FakeCacheProvider;
let createGenreService: CreateGenreService;
let updateGenreByIdService: UpdateGenreService;

describe('UpdateGenreService', () => {
  beforeEach(() => {
    fakeGenresRepository = new FakeGenresRepository();
    fakeStorageProvider = new FakeStorageService();
    fakeCacheProvider = new FakeCacheProvider();
    createGenreService = new CreateGenreService(fakeGenresRepository);
    updateGenreByIdService = new UpdateGenreService(fakeGenresRepository);
  });
  it('should be able to create a new genre after like updated the genre', async () => {
    const createGenreServiceSpy = jest.spyOn(createGenreService, 'execute');
    const genreRepositoryCreateSpy = jest.spyOn(fakeGenresRepository, 'create');
    const genreRepositoryUpdateSpy = jest.spyOn(fakeGenresRepository, 'update');
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
    const findGenreByIdServiceSpy = jest.spyOn(
      updateGenreByIdService,
      'execute',
    );

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
    const genre_edited_content = {
      name: faker.name.firstName(),
      is_active: faker.random.boolean(),
    };
    const genre_edited = await updateGenreByIdService.execute({
      id: genre.id,
      ...genre_edited_content,
    });
    // MATCH
    expect(genre_edited).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        is_active: expect.any(Boolean),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    expect(genre_edited?.name).toEqual(genre_edited_content.name);
    expect(genre_edited?.is_active).toEqual(genre_edited_content.is_active);
    // SPY-ON
    expect(findGenreByIdServiceSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    expect(genreRepositoryUpdateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderDeleteFileSpy).toHaveBeenCalled();
  });
  it('should be thrown error if the genre to be update no longer exists', async () => {
    const genreRepositoryUpdateFindGenreByIdSpy = jest.spyOn(
      fakeGenresRepository,
      'findGenreById',
    );

    const genre_id = faker.random.uuid();
    const genre_edited_content = {
      name: faker.name.firstName(),
      is_active: faker.random.boolean(),
    };
    // MATCH
    await expect(
      updateGenreByIdService.execute({
        id: genre_id,
        ...genre_edited_content,
      }),
    ).rejects.toBeInstanceOf(AppError);
    // SPYON
    expect(genreRepositoryUpdateFindGenreByIdSpy).toHaveBeenCalled();
  });
});
