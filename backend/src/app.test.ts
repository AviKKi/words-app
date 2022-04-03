import app from './app'
const supertest = require("supertest");
import * as chai from 'chai'
import connectMongo from './provider/mongo';
import Word from './models/word.model';

const expect = chai.expect


beforeAll(async () => {
    await connectMongo()
})

beforeEach(async () => {
    // clear the database before each test
    await Word.deleteMany({})
})

it('POST /api/words/ - should create a new word', async () => {
    await supertest(app)
        .post("/api/words/")
        .send({ word: "apple" })
        .expect(201)
    const words = await Word.find({})
    expect(words).to.be.lengthOf(1)
    expect(words[0]).to.be.equal("apple")
})