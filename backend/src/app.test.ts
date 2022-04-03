import app from './app'
const supertest = require("supertest");
import * as chai from 'chai'
import { disconnect } from 'mongoose'
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

afterAll(async () => {
    await disconnect()
})

it('POST /api/words/ - should create a new word', async () => {
    const res = await supertest(app)
        .post("/api/words/")
        .send({ word: "apple" })
        .expect(201)
    expect(res.body).to.have.any.keys('word')
    expect(res.body.word).to.be.equal('apple')
    const words = await Word.find({})
    expect(words).to.be.lengthOf(1)
    expect(words[0]['word']).to.be.equal("apple")
})