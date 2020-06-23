const express = require('express');
const router = express.Router();
const db = require('../db');
const generatorId = require('@radex171/randomid-generator');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    const randomItem = db.seats[Math.floor(Math.random()*db.seats.length)];
    res.json(randomItem);
  });

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = generatorId(Math.floor(Math.random() * 9 + 1));
    db.seats.push({ id, day, seat, client, email });
    req.io.emit('seatsUpdated', db.seats);
    res.json({ message: 'OK' });

});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;

    const changedData = {
        id: req.params.id, 
        day: day, 
        seat: seat,
        client: client,
        email: email
    };

  const seatsIdChange = db.seats.findIndex( seats => seats.id == req.params.id);
  db.seats[seatsIdChange] = changedData;

  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {

  const seatsIdChange = db.seats.findIndex( seats => seats.id == req.params.id);
    db.seats.splice(seatsIdChange, true);
  
    res.json({ message: 'OK' });
  });

module.exports = router 