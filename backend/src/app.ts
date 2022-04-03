const envPath = process.env.NODE_ENV === "development" ? ".local.env" : ".env"
require('dotenv').config({ path: envPath })
import * as express from 'express'
import { json as jsonBodyParser } from 'body-parser'
import Word from './models/word.model'
const app = express()
app.use(jsonBodyParser())
app.set('port', 8000)

app.get("/", (req, res) => {
    res.json({ "msg": "hello" })
})

// All routes are defined here, for a larger app create seperate routes+controller folder
// or <app_name>/router+controller

// Create a word
app.post("/api/words/", async (req, res) => {
    const { word } = req.body
    if (!word) {
        res.status(400).json({ word: "word is required!" })
        return
    }
    const w = await Word.create({ word })
    res.status(201).json(w)
})

// Return list of all the words
app.get("/api/words/", async (req, res) => {
    const words = await Word.find({})
    res.json(words.map(w => w.toJSON()))
})

// Delete a word with ID
app.delete("/api/words/:id/", async (req, res) => {
    const { id } = req.params
    await Word.deleteOne({ _id: id })
    res.json({})
})

// update a word with ID
app.put("/api/words/:id/", (req, res) => {

})

export default app