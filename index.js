const express = require('express')
const cors = require('cors')
const XLSX = require('xlsx')
require('dotenv').config()

const cookieParser = require('cookie-parser')

const app = express()

const server = require('http').createServer(app)
const socket = require('./socket').start(server)

const resAPI = require('./api')
const db = require('./config/db')
db.connect()
const ModelsUserName = require('./config/models/UserName')

app.use(cors())
app.use(cookieParser())
app.use(
    express.urlencoded({
        extended: false,
    }),
)
app.use(express.json())

app.use('/api', resAPI)
app.get('/getuser', async (req, res) => {
    var wb = XLSX.utils.book_new()
    const data = await ModelsUserName.find()
    var temp = JSON.parse(JSON.stringify(data))
    var ws = XLSX.utils.json_to_sheet(temp)
    var down = __dirname + '\\download\\demo.xlsx'
    XLSX.utils.book_append_sheet(wb, ws, 'sheet123')
    XLSX.writeFile(wb, down)
    res.download(down)
})


const schedule = require('node-schedule');
const request = require('request')

const job = schedule.scheduleJob('*/20 * * * *', function(){
   request("https://shopping-online-withme.herokuapp.com/acdm/keepserver", {},
    (err ,res) => {
        console.log(res.body)
    }
    )
})

server.listen(process.env.PORT || 3050, () => {
    console.log('start successfully')
})
