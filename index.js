const express = require('express')
const app = express()

const XLSX = require('xlsx')

const server = require('http').createServer(app)

const socket = require('./socket').start(server)

const db = require('./config/db')
const { modelName } = require('./config/models/UserName')
db.connect()

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.get('/getuser', async (req, res) => {
    var wb = XLSX.utils.book_new()
    await modelName.find()
        .then(data => {
            var temp = JSON.parse(JSON.stringify(data))
            var ws = XLSX.utils.json_to_sheet(temp)
            var down = __dirname+'\\download\\demo.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,'sheet123')
            XLSX.writeFile(wb,down)
            res.download(down)
        })
        .catch()
})

//#region 


//#region 

//#endregion

//#endregion

server.listen(process.env.PORT||3050, () => {
    console.log('start successfully')
})
