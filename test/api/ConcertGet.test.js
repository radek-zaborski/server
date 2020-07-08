const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concerts = require ('../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe ('GET /concerts/performer/:performer', () =>{
    before( async () =>{
        const performerOne = new Concerts({ performer: 'JMJ', genre: 'Electronica', price: 250, day: 2, image: 'jmj' });
        await performerOne.save();

        const performerTwo = new Concerts({ performer: 'Marek Bilinski', genre: 'Electronica', price: 130, day: 2, image: 'bilinski' });
        await performerTwo.save();
    });

    it('should return performer by name ', async () => {
        const performer = await request(server).get('/api/concerts/performer/JMJ');
        expect(performer.status).to.be.equal(200);
        expect(performer.body).to.be.an('array');
        expect(performer.body.length).to.be.equal(1);
    });
    
      it('should return performers by genre ', async () => {
        const performer = await request(server).get('/api/concerts/genre/Electronica');
        expect(performer.status).to.be.equal(200);
        expect(performer.body).to.be.an('array');
        expect(performer.body.length).to.be.equal(2);
    });

    it('should return performers by price ', async () => {
        const performer = await request(server).get('/api/concerts/price/129/250');
        expect(performer.status).to.be.equal(200);
        expect(performer.body).to.be.an('array');
        expect(performer.body.length).to.be.equal(2);
    });

    it('should return performers by day ', async () => {
        const performer = await request(server).get('/api/concerts/day/2');
        expect(performer.status).to.be.equal(200);
        expect(performer.body).to.be.an('array');
        expect(performer.body.length).to.be.equal(2);
    });
    
    after (async () => {
        await Concerts.deleteMany();
    });
});