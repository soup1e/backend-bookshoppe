DROP TABLE IF EXISTS book_author;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;



CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released VARCHAR
);

INSERT INTO
    books (title, released)
VALUES
    ('Diary of a Wimpy Kid', 2010),
    ('Big Nate', 2010),
    ('Harry Potter', 1997),
    ('The Fault in Our Stars', 2012),
    ('Looking for Alaska', 2005),
    ('Lord of the Flies', 1954);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    dob VARCHAR,
    pob VARCHAR
);

INSERT INTO
    authors (name, dob, pob)
VALUES
    (
        'Jeff Kinney',
        'February 19, 1971',
        'Fort Washington, Maryland'
    ),
    (
        'Lincoln Peirce',
        'October 23, 1963',
        'Ames, Iowa'
    ),
    (
        'Joanne Rowling',
        'July 31, 1965',
        'Yate, Gloucestershire, England'
    ),
    (
        'John Green',
        'August 24, 1977',
        'Indianapolis, Indiana'
    ),
    (
        'William Golding',
        'September 19, 1911',
        'Newquay, United Kingdom'
    );

CREATE TABLE book_author (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT,
    book_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO
    book_author (author_id, book_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (4, 5),
    (5, 6);