const express = require('express');
const router = express.Router();
const db = require('../db');
const generatorId = require('@radex171/randomid-generator');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    const randomItem = db.concerts[Math.floor(Math.random()*db.concert.length)];
    res.json(randomItem);
  });

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const { genre, performer, price, day, image} = req.body;
    const id = generatorId(Math.floor(Math.random() * 9 + 1));
    db.concerts.push({ id, genre, performer, price, day, image });
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    const { genre, performer, price, day, image } = req.body;

    const changedData = {
        id: req.params.id, 
        performer: performer,
        genre: genre, 
        price: price,
        day: day,
        image: image
    };

    const concertsIdChange = db.concerts.findIndex(concerts => concerts.id == req.params.id);
      db.concerts[concertsIdChange] = changedData;
      res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {

  const concertsIdChange = db.concerts.findIndex(concerts => concerts.id == req.params.id);
    db.concerts.splice(concertsIdChange, true);
  
    res.json({ message: 'OK' });
  });

module.exports = router 