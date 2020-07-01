const Concert = require('../models/concerts.model');

exports.findAll = async (req, res) => {
    
    try {
        res.json(await Concert.find());
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.random = async (req, res) =>{

    try {
        const count = await Concert.countDocuments();
        const random = Math.floor(Math.random() * count);
        const concertRandom = await Concert.findOne().skip(random);

        if(!concertRandom) res.status(404).json({message: 'Not found'})
        else res.json({message: concertRandom});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.newConcert = async (req, res) => {

    const { performer, genre, price, day, image} = req.body;

    try {
        const newConcert = new Concert({
            performer:performer,
             genre: genre,
             price: price,
             day: day,
             image: image,  
        });

        newConcert.save();
        res.json({message: newConcert});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.getId = async (req, res) => {

    try {
        const findConcert = await Concert.findById(req.params.id);

        if(!findConcert) res.status(404).json({message: 'Not found ' + req.params.id});
        else res.json({message: findConcert})
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.update = async (req, res) => {

    const {performer, genre, price, day, image} = req.body;

    try {
        const findConcert = await Concert.findById(req.params.id);
        
        if(!findConcert) res.status(404).json({message: 'Not found ' + req.params.id});

        else {
            await findConcert.updateOne({ $set: { 
                performer: performer, 
                genre: genre, 
                price: price, 
                day: day,
                image: image
            }});

            res.json({message: 'update: ', findConcert});
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.delete = async (req, res) => {
    
    try {
        findConcert = await Concert.findById(req.params.id);

        if(!findConcert) res.status(404).json({message: 'Not found' + req.params.id});

        else {
            await findConcert.deleteOne({_id: req.params.id})
            res.json({message: 'Delete', findConcert})
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
}