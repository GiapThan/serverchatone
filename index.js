const express = require('express')
const XLSX = require('xlsx')

const app = express()
const server = require('http').createServer(app)

const ModelsUserName = require('./config/models/UserName')


const db = require('./config/db')
db.connect()

const listUser = []
var part = {}
var matran = {}

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.get('/123', (req, res) => {
    console.log('123')
    res.render('index')
})

app.post('/sendmail', (req,res) => {
    console.log('1234578')
    res.send(req.body)
})

app.get('/getuser', async (req, res) => {
    var wb = XLSX.utils.book_new()
    await ModelsUserName.find()
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

ModelsUserName.find()
    .then(data => {
        data.map(e => listUser.push(e.user))
    })
    .catch()

//#region 
const socketIo = require('socket.io')(server, {
    cors: {
    }
})

//#region 
function CheckWin(matrancaro, hang, cot, key) {
    var d = 0
    var h = hang
    var c = cot
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        cot+=1
    }
    if (d==5) {
        return "win"
    } else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        cot-=1
    }
    if (d==5) {
        return "win"
    }else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        hang-=1
    }
    if (d==5) {
        return "win"
    }else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        hang+=1
    }
    if (d==5) {
        return "win"
    }else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        cot+=1
        hang+=1
    }
    if (d==5) {
        return "win"
    }else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        cot-=1
        hang-=1
    }
    if (d==5) {
        return "win"
    }else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        cot-=1
        hang+=1
    }
    if (d==5) {
        return "win"
    }else {
        d=0
        hang = h
        cot = c
    }
//
    while (hang>=0 && cot>=0 && matrancaro[hang][cot] == key) {
        d+=1
        cot+=1
        hang-=1
    }
    if (d==5) {
        return "win"
    }
}
//#endregion

//#region 
socketIo.on('connection', socket => {
     
    socket.on("login", data => {
        
        ModelsUserName.findOne({ user: data[0] })
        .then(e => {
            if (e.pass == data[1]) {
                socket.UserName = data[0]
                socket.emit("server-send-dang-nhap-thanh-cong", data)
            }
        })
        .catch()
    })
    
    socket.on("client-send-user-name", (data) => {
        
        if (data.pass == '') {
            if (listUser.includes(data.user)) {
                socket.emit("server-nhap-pass")
            }
            else {
                
                socket.emit("server-send-dang-ky")
            }
        }
        else {
            ModelsUserName.findOne({user: data.user})
            .then(e => {
                if (e.pass == data.pass) {
                    socket.UserName = data.user
                    socket.emit("server-send-dang-nhap-thanh-cong", data)
                }
            })
            .catch()
        }
    })
    
    socket.on("client-send-pass-dang-ki", data => {
        
        ModelsUserName.create({
            ...data,
            monney: 100000
        })
        .then(() => {
            listUser.push(data.user)
            socket.UserName = data.user
            socket.emit("server-send-dang-ky-thanh-cong", data)
        })
        .catch()
    })
    
    socket.on("log-out", room => {
        socket.UserName = undefined
        socket.leave(room)
        socket.emit("server-send-logout-thanh-cong")
    })
    
    socket.on("client-send-join-room", room => {
        socket.leave(socket.id)
        if (part[room]) {
            if (part[room].length == 2) {
                socket.emit("server-send-roon-da-du-nguoi", room)
            }
            else {
                socket.join(room)
                part[room].push(socket.UserName)
                socket.emit("server-send-join-room-thanh-cong",room)
            }
        }
        else {
            part[room] = []
            matran[room] = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ]
            socket.join(room)
            part[room].push(socket.UserName)
            socket.emit("server-send-join-room-thanh-cong", room)
        }
    })

    //#region caro
    socket.on("client-send-tick-caro", ({idAddress, room, name}) => {
        
        const hang = Number(idAddress.substring(0,2))
        const cot = Number(idAddress.substring(2,4))
        const matrancaro = matran[room]
        const nguoichoi = part[room]
        if (nguoichoi[0] == name) {
            matrancaro[hang][cot] = 1
            if (CheckWin(matrancaro, hang, cot, 1) == 'win') {
                socketIo.to(room).emit("server-co-nguoi-thang", nguoichoi[0])
            }
        }
        else {
            matrancaro[hang][cot] = 2
            if (CheckWin(matrancaro, hang, cot, 2) == 'win') {
                socketIo.to(room).emit("server-co-nguoi-thang", nguoichoi[1])
            }
        }
        
        socketIo.to(room).emit("server-send-co-nguoi-tick", {
            idAddress,
            name: socket.UserName
        })
    })
    //#endregion
})
//#endregion
//#endregion

server.listen(process.env.PORT||3050, () => {
    console.log('start successfully')
})
