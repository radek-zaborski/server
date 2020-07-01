const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.findAll);
router.get('/concerts/random', ConcertController.random);
router.post('/concerts', ConcertController.newConcert);
router.get('/concerts/:id', ConcertController.getId);
router.put('/concerts/:id', ConcertController.update);
router.delete('/concerts/:id', ConcertController.delete);

module.exports = router 