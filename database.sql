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

INSERT INTO users (name) VALUES
    ('Lasse Larsen'),
    ('Sverre Sverresen'),
    ('Ola Dunk');

   CREATE TABLE filmer (
                        id SERIAL PRIMARY KEY,
                        tittel VARCHAR(100) NOT NULL
                    );

                    CREATE TABLE skuespillere (
                        id SERIAL PRIMARY KEY,
                        navn VARCHAR(100) NOT NULL
                    );

                    INSERT INTO filmer (tittel) VALUES
                        ('The Matrix'),
                        ('The Matrix Reloaded'),
                        ('The Matrix Revolutions');

                    INSERT INTO skuespillere (navn) VALUES
                        ('Keanu Reeves'),
                        ('Laurence Fishburne'),
                        ('Carrie-Anne Moss');
                    
SELECT * FROM filmer;
SELECT * FROM skuespillere;



CREATE TABLE skuespiller_i_film (
    skuespiller int not null references skuespillere(id),
    film int not null references filmer(id)
)

insert into skuespiller_i_film(skuespiller, film)
values (1, 1), (1, 2)

SELECT skuespillere.navn "Skuespiller", filmer.tittel "Film"
from skuespiller_i_film 
join skuespillere on skuespillere.id = skuespiller_i_film.skuespiller
join filmer on filmer.id = skuespiller_i_film.film
