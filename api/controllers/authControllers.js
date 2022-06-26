const Account = require('../../config/models/Account')
const bcrypt = require('bcrypt')

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
}

module.exports = new AuthController()
