CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(167),
        password VARCHAR(167)
    );

CREATE TABLE
    notes (
        id SERIAL PRIMARY KEY,
        title TEXT,
        note TEXT,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );