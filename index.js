const express = require('express');
const serveStatic = require('serve-static');

const config = require('./config');
const app = express();
const appPort = config.port;
const password = config.adminPassword;

const Datastore = require('nedb');
const db = new Datastore({ filename: config.dbLocation });
db.loadDatabase((err) => {
    // exit if database fails to load
    if (err) {
        console.error(err);
        return -1;
    }
    console.log('Loaded database');

    // serve static files (Vue app)
    app.use(serveStatic(__dirname + "/app/dist"));

    // REST API (consumes JSON)
    app.use(express.json());

    // GET all crash reports sorted by latest first
    app.get('/api/crash', (req, res) => {
        if (password) {
            if (req.headers.authorization !== password) {
                res.status(401).send('Unauthorized');
                return;
            }
        }
        db.find({}).sort({ timestamp: -1 }).exec((err, docs) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            res.status(200).send(docs);
        });
    });

    // POST a new crash report
    app.post('/api/crash', (req, res) => {
        const timestamp = Date.now();
        const snitchCrash = req.body;
        snitchCrash.timestamp = timestamp;
        console.log(snitchCrash);
        db.insert(snitchCrash, (err, newDoc) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            console.log(`Added new crash(${newDoc._id}) into database`);
            res.status(201).send(newDoc);
        });
    });

    // DELETE crash report by id
    app.delete('/api/crash/:id', (req, res) => {
        const id = req.params.id;
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            console.log(`Removed crash(${id}) from database`);
            res.status(200).send(numRemoved.toString());
        });
    });

    app.listen(appPort, () => {
        console.log(`Snitch Server running on port ${appPort}`);
    });
});

