import faker from 'faker';
import CategoriesController from '@modules/categories/infra/http/controllers/CategoriesController';

let categoriesController: CategoriesController;

describe('CreateImageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    categoriesController = new CategoriesController();
  });
  it('should be able to create a new image', async () => {
    const createImageServiceSpy = jest
      .spyOn(categoriesController, 'index')
      .mockReturnValue({ total: 0, categories: [] });

    // MATCH
    expect(createImageServiceSpy).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        file_name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
    // SPYON
    expect(createImageServiceSpy).toHaveBeenCalled();
  });
});
