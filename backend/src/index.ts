import app from './app'

app.listen(app.get('port'), () => console.log(`listening on the port ${app.port}`))