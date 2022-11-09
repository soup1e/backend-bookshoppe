const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const { books } = require('../lib/books-data');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books should return a list of books', async () => {
    const res = await request(app).get('/books');
    const expected = books.map(({ id, title, released }) => ({
      id,
      title,
      released,
    }));
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
