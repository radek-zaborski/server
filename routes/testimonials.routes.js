const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');


router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.random);
router.get('/testimonials/:id', TestimonialController.select);
router.post('/testimonials', TestimonialController.newTestimonilas);
router.put('/testimonials/:id', TestimonialController.update);
router.delete('/testimonials/:id', TestimonialController.delete);

 
module.exports = router ;