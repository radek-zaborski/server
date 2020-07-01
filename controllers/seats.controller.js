const Seat = require('../models/seats.model');

exports.findAll = async (req, res) => {
    
    try {
        res.json(await Seat.find());
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.random = async (req, res) =>{

    try {
        const count = await Seat.countDocuments();
        const random = Math.floor(Math.random() * count);
        const SeatRandom = await Seat.findOne().skip(random);

        if(!SeatRandom) res.status(404).json({message: 'Not found'})
        else res.json({message: SeatRandom});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.newSeat = async (req, res) => {

    const { day, seat, client, email} = req.body;

    try {
        const newSeat = new Seat({
             day: day,
             seat: seat,
             client: client,
             email: email,
        });

        newSeat.save();
        res.json({message: newSeat});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.getId = async (req, res) => {

    try {
        const findSeat = await Seat.findById(req.params.id);

        if(!findSeat) res.status(404).json({message: 'Not found ' + req.params.id});
        else res.json({message: findSeat})
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.update = async (req, res) => {

    const { day, seat, client, email} = req.body;

    try {
        const findSeat = await Seat.findById(req.params.id);
        
        if(!findSeat) res.status(404).json({message: 'Not found ' + req.params.id});

        else {
             await findSeat.updateOne({ $set: { 
                day: day,
                seat: seat,
                client: client,
                email: email,
            }});
            res.json({message: 'update: ', findSeat});
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.delete = async (req, res) => {
    
    try {
        findSeat = await Seat.findById(req.params.id);

        if(!findSeat) res.status(404).json({message: 'Not found' + req.params.id});

        else {
            await findSeat.deleteOne({_id: req.params.id})
            res.json({message: 'Delete', findSeat})
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
}