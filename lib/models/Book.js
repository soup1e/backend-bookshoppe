const pool = require('../utils/pool');

module.exports = class Book {
  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors;
  }

  static async getBooks() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((bookRow) => new Book(bookRow));
  }

  static async getSingleBook(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
      COALESCE(json_agg(to_jsonb(authors))
      FILTER (WHERE authors.id IS NOT NULL), '[]') as authors
    FROM 
      books
      LEFT JOIN book_author on books.id = book_author.book_id
      LEFT JOIN authors on book_author.author_id = authors.id
    WHERE books.id = $1
    GROUP by books.id`,
      [id]
    );
    return new Book(rows[0]);
  }
};
