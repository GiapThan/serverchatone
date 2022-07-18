const Account = require('../../config/models/Account')
const bcrypt = require('bcrypt')

const schedule = require('node-schedule')

class AuthController {
    // Đăng ký
    async sign(req, res) {
        try {
            const { username, password, email } = req.body
            const salt = await bcrypt.genSalt(11)
            const has = await bcrypt.hash(password, salt)

            Account.create({ username, email, password: has })
                .then((acc) => {
                    res.status(200).json(acc)
                })
                .catch()
        } catch (error) {
            res.status(500).json(error)
        }
    }

    index(req, res) {
        console.log('1231232')
    }

    test(req, res) {
        const param = req.params
        const current = new Date()
        const date = new Date(
            `${current.getUTCFullYear()}/${param.m}/${param.d} ${param.h}:${
                param.p
            }:00 +0700`,
        )
        const job = schedule.scheduleJob(date, () => {
            res.send('ppp')
        })
        res.send('ok')
    }
}

module.exports = new AuthController()
