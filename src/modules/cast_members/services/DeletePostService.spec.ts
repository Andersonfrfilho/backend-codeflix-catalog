import faker from 'faker';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreatePostService from '@modules/posts/services/CreatePostService';
import { ETypeUser } from '@modules/users/infra/typeorm/entities/User';
import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import CreateImageService from '@modules/images/services/CreateImageService';
import FakeImagesRepository from '@modules/images/repositories/fakes/FakeImagesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeletePostService from '@modules/posts/services/DeletePostService';

let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createImageService: CreateImageService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
let createPostService: CreatePostService;
let deletePostService: DeletePostService;
let fakePostsRepository: FakePostsRepository;

describe('DeletePostService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    fakeCacheProvider = new FakeCacheProvider();

    fakeImagesRepository = new FakeImagesRepository();

    fakeStorageProvider = new FakeStorageProvider();

    fakePostsRepository = new FakePostsRepository();

    createImageService = new CreateImageService(
      fakeImagesRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    createPostService = new CreatePostService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeCacheProvider,
    );
    deletePostService = new DeletePostService(
      fakePostsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new image and new user, after image after delete', async () => {
    const createImageServiceSpy = jest.spyOn(createImageService, 'execute');
    const imageRepositoryCreateSpy = jest.spyOn(fakeImagesRepository, 'create');
    const fakeStorageProviderSaveFileSpy = jest.spyOn(
      fakeStorageProvider,
      'saveFile',
    );

    const createUserServiceSpy = jest.spyOn(createUserService, 'execute');
    const fakeUsersRepositoryFindByEmailSpy = jest.spyOn(
      fakeUsersRepository,
      'findByEmail',
    );
    const fakeHashProviderGenerateHashSpy = jest.spyOn(
      fakeHashProvider,
      'generateHash',
    );
    const createPostServiceSpy = jest.spyOn(createPostService, 'execute');

    const fakePostsRepositoryCreateSpy = jest.spyOn(
      fakePostsRepository,
      'create',
    );
    const fakeCacheProviderInvalidateByKeySpy = jest.spyOn(
      fakeCacheProvider,
      'invalidateByKey',
    );
    const deletePostServiceSpy = jest.spyOn(deletePostService, 'execute');
    const fakePostsRepositoryDeleteSpy = jest.spyOn(
      fakePostsRepository,
      'delete',
    );
    const image_content = {
      link: faker.random.image(),
      file_name: faker.internet.userName(),
    };
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
    expect(createImageServiceSpy).toHaveBeenCalled();
    expect(imageRepositoryCreateSpy).toHaveBeenCalled();
    expect(fakeStorageProviderSaveFileSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
    const user_content = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      type: ETypeUser.admin,
      password: faker.internet.password(),
      image_id: image.id,
    };
    const user = await createUserService.execute(user_content);

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        type: expect.any(String),
        password_hash: expect.any(String),
        image_id: expect.any(String),
      }),
    );

    expect(createUserServiceSpy).toHaveBeenCalled();
    expect(fakeUsersRepositoryFindByEmailSpy).toHaveBeenCalled();
    expect(fakeHashProviderGenerateHashSpy).toHaveBeenCalled();

    const post_content = {
      author_id: user.id,
      content: faker.random.words(),
      published: faker.random.boolean(),
    };
    const post = await createPostService.execute(post_content);

    expect(post).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: expect.any(String),
        author_id: expect.any(String),
      }),
    );

    expect(createPostServiceSpy).toHaveBeenCalled();
    expect(fakeUsersRepositoryFindByEmailSpy).toHaveBeenCalled();
    expect(fakePostsRepositoryCreateSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();

    const post_deleted = await deletePostService.execute({ id: post.id });

    expect(post_deleted).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: expect.any(String),
        author_id: expect.any(String),
      }),
    );

    expect(deletePostServiceSpy).toHaveBeenCalled();
    expect(fakePostsRepositoryDeleteSpy).toHaveBeenCalled();
    expect(fakeCacheProviderInvalidateByKeySpy).toHaveBeenCalled();
  });
});
