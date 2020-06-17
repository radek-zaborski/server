const express = require ('express');
const cors = require ('cors');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const db = require ('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use( testimonialsRoutes);
app.use( concerts);
app.use( seats);

app.use((req, res) => {
    res.status(404).json({ message: 'not found... 404' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});