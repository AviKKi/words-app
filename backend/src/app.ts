const envPath = process.env.NODE_ENV === "development" ? ".local.env" : ".env"
require('dotenv').config({ path: envPath })
import * as express from 'express'
import { json as jsonBodyParser } from 'body-parser'
const app = express()
app.use(jsonBodyParser())
app.set('port', 8000)

app.get("/", (req, res) => {
    res.json({ "msg": "hello" })
})

// All routes are defined here, for a larger app create seperate routes+controller folder
// or <app_name>/router+controller

// Create a word
app.post("/api/words/", (req, res)=>{
    
})

// Return list of all the words
app.get("/api/words/", (req, res)=>{

})

// Delete a word with ID
app.delete("/api/words/:id/", (req, res)=>{

})

// update a word with ID
app.put("/api/words/:id/", (req, res)=>{

})

export default app