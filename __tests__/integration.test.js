const request = require('supertest');
const app = require('../index');
const db = require('../db');

describe('Integration: API <-> DB', () => {
  beforeEach(() => {
    db.clear();
  });

  test('POST /items creates an item and GET /items returns it', async () => {
    const createRes = await request(app)
      .post('/items')
      .send({ name: 'apple' });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty('id');
    expect(createRes.body.name).toBe('apple');

    const listRes = await request(app).get('/items');
    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBe(1);
    expect(listRes.body[0].name).toBe('apple');
  });

  test('POST /items without name yields 400', async () => {
    const res = await request(app)
      .post('/items')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
