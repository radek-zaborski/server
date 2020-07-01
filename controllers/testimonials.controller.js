const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {

    try {
    res.json(await Testimonial.find());
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.random = async (req, res) => {

    try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonialRandom = await Testimonial.findOne().skip(rand);

    if(!testimonialRandom) res.status(404).json({message: 'Not found'})

    else res.json({message: testimonialRandom});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.select = async (req,res) => {

    try {
        const testimonialSelect = await Testimonial.findById(req.params.id);

        if(!testimonialSelect) res.status(404).json({message: 'not found' + req.params.id});

        else res.json({message: testimonialSelect});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.newTestimonilas = async (req,res) => {
    const {author, text} = req.body;

    try {
        const newRecord = new Testimonial({ author: author, text: text});
        await newRecord.save();
        res.json({message: newRecord });
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.update = async (req, res) => {

    const {author, text} = req.body;

    try {
        const findTestimonial = await Testimonial.findById(req.params.id);

        if(!findTestimonial) res.status(404).json({message: 'Not found' + req.params.id});

        else {
            await findTestimonial.updateOne({$set: {author: author, text: text}});
            res.json({message: req.body});
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.delete = async (req, res) => {
    
    try {
        findTestimonial = await Testimonial.findById(req.params.id);

        if(!findTestimonial) res.status(404).json({message: 'Not found' + req.params.id});

        else {
            await findTestimonial.deleteOne({_id: req.params.id})
            res.json({message: 'Delete' + findTestimonial})
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
};