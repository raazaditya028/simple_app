const request = require('supertest');
const app = require('../index');

describe('API tests', () => {
  test('GET / returns status ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('POST /add returns sum for numbers', async () => {
    const res = await request(app)
      .post('/add')
      .send({ a: 2, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });

  test('POST /add rejects non-number', async () => {
    const res = await request(app)
      .post('/add')
      .send({ a: "x", b: 3 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
