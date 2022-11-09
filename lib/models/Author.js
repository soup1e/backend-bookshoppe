const pool = require('../utils/pool');

module.exports = class Author {
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books;
  }

  static async getAuthors() {
    const { rows } = await pool.query('SELECT * from authors');
    return rows.map((authorRow) => new Author(authorRow));
  }

  static async getSingleAuthor(id) {
    const { rows } = await pool.query(
      `SELECT authors.*,
      COALESCE(json_agg(to_jsonb(books))
      FILTER (WHERE books.id IS NOT NULL), '[]') as books
    FROM 
      authors
      LEFT JOIN book_author on authors.id = book_author.author_id
      LEFT JOIN books on book_author.book_id = books.id
    WHERE authors.id = $1
    GROUP by authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }
};
