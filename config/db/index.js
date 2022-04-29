const mongoose = require('mongoose')
async function connect() {
    try {
        const con = await mongoose.connect('mongodb+srv://danggiapthan:danggiapthan@cluster0.gpavr.mongodb.net/chatuser?retryWrites=true', {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })
        console.log(con.connection.host)
    } catch (error) {
        console.log(error)
        console.log('Connection failed')
    }
}
module.exports = {connect}