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
  it('/id should return a single book', async () => {
    const res = await request(app).get('/books/1');
    const expected = {
      id: '1',
      title: 'Diary of a Wimpy Kid',
      released: '2010',
      authors: [
        {
          id: 1,
          name: 'Jeff Kinney',
          dob: 'February 19, 1971',
          pob: 'Fort Washington, Maryland',
        },
      ],
    };
    expect(res.body).toEqual(expected);
  });

  it('/authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    const expected = books.map(({ id, name, dob, pob }) => ({
      id,
      name,
      dob,
      pob,
    }));
    expect(res.body).toEqual(expected);
  });
  afterAll(() => {
    pool.end();
  });
});
