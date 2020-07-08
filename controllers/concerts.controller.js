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

        await newConcert.save();
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
        const findConcert = await Concert.findById(req.params.id);

        if(!findConcert) res.status(404).json({message: 'Not found' + req.params.id});

        else {
            await findConcert.deleteOne({_id: req.params.id})
            res.json({message: 'Delete', findConcert})
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.findPerformer = async (req, res) =>{

    try {
        const findPerformer = await Concert.find({ performer: req.params.performer});

        if(!findPerformer) res.status(404).json({message: 'Not found'});

        else res.json(findPerformer);
    }
    catch(err){
        res.status(500).json({message: err});
    };
};

exports.genreFind = async (req, res) => {
    try {
        const genre = await Concert.find({genre: req.params.genre});

        if(!genre) res.status(404).json({message: 'Not found'});

        else res.json(genre);
      } 
      catch {
        res.status(500).json({ message: err });
      };
    };

    exports.priceMinMax = async (req, res) => {
        try {
            const price = await Concert.find({ $and: [{ price: { $gte: req.params.price_min } }, { price: { $lte: req.params.price_max } }] });
            
            if(!price) res.status(404).json({message: 'Not found'});

            else res.json(price);
        } catch {
          res.status(500).json({ message: err });
        }
      };

    exports.dayFind = async (req, res) => {
        try {
            const day = await Concert.find({day: req.params.day});
    
            if(!day) res.status(404).json({message: 'Not found'});
    
            else res.json(day);
        } 
        catch {
            res.status(500).json({ message: err });
        };
    };