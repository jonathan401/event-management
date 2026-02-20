import { UserRole } from '../../../src/entities/User';
import { HTTP_STATUS } from '../../../src/utils/constants';
import { TestFactory } from '../../factory';
import { sampleData, USER_POST_ROUTE, validatorErrorMessage } from '../../testUtills';

describe('POST /api/v1/users', () => {
  let factory: TestFactory;

  beforeAll(async () => {
    factory = new TestFactory();
    await factory.init();
  });

  afterAll(async () => {
    await factory.close();
  });

  afterEach(async () => {
    await factory.reset();
  });

  it('should register a new user with default role set to USER', async () => {
    const response = await factory.app.post(USER_POST_ROUTE).send(sampleData);
    expect(response.statusCode).toBe(HTTP_STATUS.CREATED);
    expect(response.body).toMatchObject({ data: { role: UserRole.USER } });
  });

  it('should register a new user with role set to ADMIN', async () => {
    const response = await factory.app.post(USER_POST_ROUTE).send({
      ...sampleData,
      role: UserRole.ADMIN
    });

    expect(response.statusCode).toBe(HTTP_STATUS.CREATED);
    expect(response.body).toMatchObject({
      data: { role: UserRole.ADMIN }
    });
  });

  describe('Edge cases', () => {
    it('should return validation error for missing field [name]', async () => {
      const response = await factory.app.post(USER_POST_ROUTE).send({
        email: sampleData.email,
        password: sampleData.password
      });

      expect(response.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body).toMatchObject({
        message: validatorErrorMessage,
        errors: ['Name field must not be empty']
      });
    });

    it('should return error for short password', async () => {
      const response = await factory.app.post(USER_POST_ROUTE).send({
        name: sampleData.name,
        email: sampleData.email,
        password: 'short'
      });

      expect(response.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body).toMatchObject({
        message: validatorErrorMessage,
        errors: ['Password must be at least 6 characters']
      });
    });
  });

  it('should return error for invalid email', async () => {
    const response = await factory.app.post(USER_POST_ROUTE).send({
      name: sampleData.name,
      email: 'email',
      password: sampleData.password
    });

    expect(response.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body).toMatchObject({
      message: validatorErrorMessage,
      errors: ['Invalid email provided']
    });
  });

  it('should return an error for an existing email', async () => {
    const response = await factory.app.post(USER_POST_ROUTE).send(sampleData);

    expect(response.statusCode).toBe(HTTP_STATUS.CREATED);

    const duplicateRequest = await factory.app.post(USER_POST_ROUTE).send({
      name: 'peter',
      email: sampleData.email,
      password: 'peter123'
    });

    expect(duplicateRequest.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(duplicateRequest.body).toMatchObject({
      message: validatorErrorMessage,
      errors: ['Email already exists']
    });
  });
});
