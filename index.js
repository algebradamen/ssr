// Først bruker vi 'require' for å referere til Express-biblioteket
//  (som ligger i node_modules):
const express = require('express');

// Deretter lager vi en ny instans av Express:
const app = express();

app.use(express.json());

app.use(express.static('public'));

// Først refererer vi til driveren (som ligger i node_modules)
const { Pool } = require('pg');

// Så lager vi en forbindelse til databasen
const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
});

app.get('/deltagere-2', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    let html = "<h1>Deltagere</h1>"
    html += "<ul>"
    for( const row of result.rows) {
        html += "<li>" + row.name + "</li>"
    }
    html += "</ul>"
    res.send(html);
});


app.get('/bilmerker', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    let html = "<h1>Bilmerker</h1>"
    html += "<ul>"
    for( const row of result.rows) {
        html += "<li>" + row.bilmerke + "</li>"
    }
    html += "</ul>"
    res.send(html);
});


app.get('/skuespillere-og-filmer', async (req, res) => {
    const result = await pool.query(`
        SELECT skuespillere.navn , filmer.tittel 
            from skuespiller_i_film 
            join skuespillere on skuespillere.id = skuespiller_i_film.skuespiller
            join filmer on filmer.id = skuespiller_i_film.film`
        );
    let html = "<h1>Skuespillere og filmer</h1>"
    html += "<ul>"
    for( const row of result.rows) {
        html += "<li>" + row.navn + " spiller i " + row.tittel + "</li>"
    }
    html += "</ul>"
    res.send(html);
});

app.get('/skuespillere-og-filmer-json', async (req, res) => {
    const result = await pool.query(`
        SELECT skuespillere.navn , filmer.tittel 
            from skuespiller_i_film 
            join skuespillere on skuespillere.id = skuespiller_i_film.skuespiller
            join filmer on filmer.id = skuespiller_i_film.film`
        );
    res.json(result.rows);
});

app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.get('/bilmerker-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    res.json(result.rows);
});

app.get('/skuespillere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM skuespillere');
    res.json(result.rows);
});

// Vi setter opp en enkel "rute" (route) som svarer på
// forespørsler til rotkatalogen, /:
app.get('/Hello', (req, res) => {
    res.send('Hello, world! Klokken er ' + new Date().toLocaleTimeString());
});

app.get('/her', (req, res) => {
    res.send('<h1>Her er en overskrift</h1>');
});

app.get('/der', (req, res) => {
    res.send('<h1>Lurte deg det var egentlig her :D</h1>');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/deltager-1', (req, res) => {
    res.send(`<h1>Deltagerne i konkuransen</h1>
        <ul>
        <li>Endre</li>
        <li>Brage,</li>
        <li>Solveig,</li>
        <li>Jasmin</li></ul>`);
});

app.post('/deltagere', async (req, res) => {
    const data = req.body;
    console.log('Lagrer deltager: ', data)
    const query = 'INSERT INTO users (name) VALUES ($1)';
    const values = [data.name];
    await pool.query(query, values);
    console.log('Lagret deltager: ', data)
    res.send('Data lagret');
});

app.post('/skuespillere', async (req, res) => {
    const data = req.body;
    console.log('Lagrer deltager: ', data)
    const query = 'INSERT INTO skuespillere (navn) VALUES ($1)';
    const values = [data.navn];
    await pool.query(query, values);
    console.log('Lagret skuespiller: ', data)
    res.send('Data lagret');
});


// Så starter vi serveren, som nå lytter på port 3000:
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


