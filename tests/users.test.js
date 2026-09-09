jest.mock('../src/modules/users/users.repository', () => ({
  findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'A', email: 'a@x.com' }]),
  count: jest.fn().mockResolvedValue(1),
  findById: jest.fn().mockResolvedValue({ id: 1, name: 'A', email: 'a@x.com' }),
  create: jest.fn().mockResolvedValue({ id: 1, name: 'A', email: 'a@x.com' }),
}));
// Mock auth guard: 401 tanpa header (seperti aslinya), pass-through bila ada header.
jest.mock('../src/common/middlewares/auth', () => (req, res, next) => {
  if (!req.headers.authorization) {
    const ApiError = require('../src/common/utils/ApiError');
    return next(new ApiError(401, 'Missing or invalid token'));
  }
  req.user = { id: 1, email: 'a@x.com' };
  return next();
});
const request = require('supertest');
const app = require('../src/app');

describe('Users module', () => {
  it('GET /api/v1/users returns paginated success', async () => {
    const res = await request(app).get('/api/v1/users?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta.page).toBe(1);
  });
  it('POST invalid body returns 400', async () => {
    const res = await request(app).post('/api/v1/users').set('Authorization', 'Bearer test').send({ name: '' });
    expect(res.status).toBe(400);
  });
  it('POST without token returns 401', async () => {
    const res = await request(app).post('/api/v1/users').send({ name: 'A', email: 'a@x.com', password: 'secret123' });
    expect(res.status).toBe(401);
  });
});
