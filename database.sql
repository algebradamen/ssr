CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO users (name) VALUES
    ('Joe Biden'),
    ('Donald Trump'),
    ('Kamala Harris');

CREATE TABLE bilmerker (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    bilmerke VARCHAR (100)
);

INSERT INTO bilmerker (bilmerke) VALUES
    ('Volvo'),
    ('Audi'),
    ('Mercedes'),
    ('Golf'),
    ('Lada');
