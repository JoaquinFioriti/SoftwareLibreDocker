const express = require('express');
const bodyParser = require('body-parser');
const CouchDB = require('node-couchdb');
const cors = require('cors')
const app = express();
const {faker} = require('@faker-js/faker');
const port = 3000;


const addPersona = async (nombre, apellido) =>{
    const persona = {nombre, apellido}
    const res = await couch.insert('personas', persona);
    return res
}



const couch = new CouchDB({
    host: 'couchdb', 
    protocol: 'http',
    port: 5984,
    auth: {
        user: 'admin',
        pass: 'password'
    }
});

app.use(bodyParser.json());


app.use(cors())

app.post('/personas', (req, res) => {
    const { nombre, apellido } = req.body;
    
    addPersona(nombre, apellido).then(({ data, headers, status }) => {
        res.status(status).json(data);
    }).catch(err => {
        res.status(500).send(`Error: ${err}`);
    });
});

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





function generarNombreAleatorio() {
  const nombre = faker.name.firstName();
  const apellido = faker.name.lastName()
  addPersona(nombre, apellido)
  console.log(`Nombre generado: ${nombre} ${apellido}`);
}

generarNombreAleatorio();
setInterval(generarNombreAleatorio, 10000);//30segs


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
