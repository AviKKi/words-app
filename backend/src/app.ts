import * as express from 'express'
import { json as jsonBodyParser } from 'body-parser'
const app = express()
app.use(jsonBodyParser())
app.set('port', 8000)

app.get("/", (req, res) => {
    res.json({ "msg": "hello" })
})



export default app