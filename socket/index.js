const io = require('socket.io')
const ModelsUserName = require('../config/models/UserName')

const listUser = []
var part = {}
var matran = {}

async function getAll() {
    const r = await ModelsUserName.find()
    r.map((e) => listUser.push(e.user))
}

getAll()

function handle(socket) {
    socket.on('login', (data) => {
        ModelsUserName.findOne({ user: data.user })
            .then((e) => {
                if (e.pass == data.pass) {
                    socket.UserName = data.user
                    socket.emit('server-send-dang-nhap-thanh-cong', data)
                } else {
                }
            })
            .catch()
    })

    socket.on('client-send-user-name', (data) => {
        if (data.pass == '') {
            if (listUser.includes(data.user)) {
                socket.emit('server-nhap-pass')
            } else {
                socket.emit('server-send-dang-ky')
            }
        } else {
            ModelsUserName.findOne({ user: data.user })
                .then((e) => {
                    if (e.pass == data.pass) {
                        socket.UserName = data.user
                        socket.emit('server-send-dang-nhap-thanh-cong', data)
                    } else {
                        socket.emit('sai-pass')
                    }
                })
                .catch()
        }
    })

    socket.on('client-send-pass-dang-ki', (data) => {
        ModelsUserName.create({
            ...data,
            monney: 100000,
        })
            .then(() => {
                listUser.push(data.user)
                socket.UserName = data.user
                socket.emit('server-send-dang-ky-thanh-cong', data)
            })
            .catch()
    })

    socket.on('log-out', (room) => {
        socket.UserName = undefined
        socket.leave(room)
        socket.emit('server-send-logout-thanh-cong')
    })

    socket.on('client-send-join-room', (room) => {
        socket.leave(socket.id)
        if (part[room]) {
            if (part[room].length == 2) {
                socket.emit('server-send-roon-da-du-nguoi', room)
            } else {
                socket.join(room)
                part[room].push(socket.UserName)
                socket.emit('server-send-join-room-thanh-cong', room)
            }
        } else {
            part[room] = []
            matran[room] = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
            socket.join(room)
            part[room].push(socket.UserName)
            socket.emit('server-send-join-room-thanh-cong', room)
        }
    })

    socket.on('client-send-tick-caro', ({ idAddress, room, name }) => {
        const hang = Number(idAddress.substring(0, 2))
        const cot = Number(idAddress.substring(2, 4))
        const matrancaro = matran[room]
        const nguoichoi = part[room]
        if (nguoichoi[0] == name) {
            matrancaro[hang][cot] = 1
            if (CheckWin(matrancaro, hang, cot, 1) == 'win') {
                socketIo.to(room).emit('server-co-nguoi-thang', nguoichoi[0])
            }
        } else {
            matrancaro[hang][cot] = 2
            if (CheckWin(matrancaro, hang, cot, 2) == 'win') {
                socketIo.to(room).emit('server-co-nguoi-thang', nguoichoi[1])
            }
        }

        socketIo.to(room).emit('server-send-co-nguoi-tick', {
            idAddress,
            name: socket.UserName,
        })
    })

    socket.on('stream', ({room,stream}) => {
        socket.emit('stream', stream)
    })
}

function CheckWin(matrancaro, hang, cot, key) {
    var d = 0
    var h = hang
    var c = cot
    //
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        cot += 1
    }
    if (d == 5) {
        return 'win'
    }
    cot = c - 1
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        cot -= 1
    }
    if (d == 5) {
        return 'win'
    }

    //
    var d = 0
    var hang = h
    var cot = c
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        hang += 1
    }
    if (d == 5) {
        return 'win'
    }
    hang = h - 1
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        hang -= 1
    }
    if (d == 5) {
        return 'win'
    }

    //
    var d = 0
    var hang = h
    var cot = c
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        hang += 1
        cot += 1
    }
    if (d == 5) {
        return 'win'
    }
    hang = h - 1
    cot = c - 1
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        hang -= 1
        cot -= 1
    }
    if (d == 5) {
        return 'win'
    }
    //
    var d = 0
    var hang = h
    var cot = c
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        hang += 1
        cot -= 1
    }
    if (d == 5) {
        return 'win'
    }
    hang = h - 1
    cot = c + 1
    while (hang >= 0 && cot >= 0 && matrancaro[hang][cot] == key) {
        d += 1
        hang -= 1
        cot += 1
    }
    if (d == 5) {
        return 'win'
    }
}

module.exports = {
    start: function (app) {
        io(app, {
            cors: {},
            path: '/socket',
        })
            .of('/client')
            .on('connection', handle)
    },
}
