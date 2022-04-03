import app from './app'
import connectMongo from './provider/mongo'

connectMongo().then(() => {
    app.listen(
        app.get('port'),
        () => console.log(`listening on the port ${app.port}`)
    )
})
