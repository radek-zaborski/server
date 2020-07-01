const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.findAll);
router.get('/seats/random', SeatController.random);
router.post('/seats', SeatController.newSeat);
router.get('/seats/:id', SeatController.getId);
router.put('/seats/:id', SeatController.update);
router.delete('/seats/:id', SeatController.delete);

module.exports = router 