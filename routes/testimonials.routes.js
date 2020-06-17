const express = require('express');
const router = express.Router();
const db = require('../db');
const generatorId = require('@radex171/randomid-generator');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomItem = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];
    res.json(randomItem);
  });

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = generatorId(Math.floor(Math.random() * 9 + 1));
    db.testimonials.push({ id, author, text });
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;

  const changedData = {
    id: req.params.id, 
    author: author, 
    text: text
  };

  const person = db.testimonials.findIndex(persons => persons.id == req.params.id);
  db.testimonials[person] = changedData;

  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const person = db.testimonials.findIndex(persons => persons.id == req.params.id);
  db.testimonials.splice(person, true);
  
    res.json({ message: 'OK' });
  });

module.exports = router 