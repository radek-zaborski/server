const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

const app = express();

router.get('/concerts', ConcertController.findAll);
router.get('/concerts/random', ConcertController.random);
router.post('/concerts', ConcertController.newConcert);
router.get('/concerts/:id', ConcertController.getId);
router.put('/concerts/:id', ConcertController.update);
router.delete('/concerts/:id', ConcertController.delete);
router.get('/concerts/performer/:performer', ConcertController.findPerformer);
router.get('/concerts/genre/:genre', ConcertController.genreFind);
router.get('/concerts/price/:price_min/:price_max', ConcertController.priceMinMax);
router.get('/concerts/day/:day', ConcertController.dayFind);

module.exports = router 