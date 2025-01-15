// Først bruker vi 'require' for å referere til Express-biblioteket
//  (som ligger i node_modules):
const express = require('express');

// Deretter lager vi en ny instans av Express:
const app = express();

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

app.get('/bilmerker-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    res.json(result.rows);
});

// Vi setter opp en enkel "rute" (route) som svarer på
// forespørsler til rotkatalogen, /:
app.get('/', (req, res) => {
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
// Så starter vi serveren, som nå lytter på port 3000:
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
