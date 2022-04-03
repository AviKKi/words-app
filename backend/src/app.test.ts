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

it('GET /api/words/ - should return a list of words', async () => {
    await Word.create({ word: "apple" })
    await Word.create({ word: "grapes" })
    await Word.create({ word: "oranges" })
    const res = await supertest(app).get('/api/words/').expect(200)
    expect(res.body).to.be.a('array')
    expect(res.body).to.be.lengthOf(3)
    const resWords = res.body.map(w => w.word)
    expect(resWords).to.have.all.members(["apple", "grapes", "oranges"])
})


it("PUT /api/words/:id - should update a word given it's id", async () => {
    const word = await Word.create({ word: "apple" })
    const res = await supertest(app)
        .put(`/api/words/${word._id}`)
        .send({ word: "grapes" })
        .expect(200)
    expect(res.body).to.have.any.keys("word")
    expect(res.body).to.have.any.keys("_id")
    expect(res.body._id).to.be.equal(String(word._id))
    const updatedWord = await Word.findOne({ _id: word._id })
    expect(updatedWord.word).to.be.equal("grapes")
})

it("delete /api/words/:id - delete a word, given it's ID", async () => {
    const word = await Word.create({ word: "apple" })
    const res = await supertest(app)
        .delete(`/api/words/${word._id}`)
        .send({ word: "grapes" })
    const count = await Word.find().count()
    expect(count).to.be.equal(0)
})