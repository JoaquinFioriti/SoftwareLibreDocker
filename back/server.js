const express = require('express');
const bodyParser = require('body-parser');
const CouchDB = require('node-couchdb');
const cors = require('cors')
const app = express();
const port = 3000;





// Configuración de CouchDB
const couch = new CouchDB({
    host: 'couchdb', //container_db
    protocol: 'http',
    port: 5984,
    auth: {
        user: 'admin',
        pass: 'password'
    }
});

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());


app.use(cors())

// Endpoint para manejar solicitudes POST de personas
app.post('/personas', (req, res) => {
    const { nombre, apellido } = req.body;
    const persona = { nombre, apellido };

    couch.insert('personas', persona).then(({ data, headers, status }) => {
        res.status(status).json(data);
    }).catch(err => {
        res.status(500).send(`Error: ${err}`);
    });
});

// Endpoint para obtener todas las personas
app.get('/personas', (req, res) => {

    couch.get('personas', '_all_docs', { include_docs: true })
        .then(({ data, headers, status }) => {
            const personas = data.rows.map(row => row.doc);
            res.status(status).json(personas);
        })
        .catch(err => {
            res.status(500).send(`Error: ${err}`);
        });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
