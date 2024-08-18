import { query } from "../database/db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const register = async (req, res) => {
    const { name, username, email, password, confPassword, avatar } = req.body

    if (username === "" || username === undefined || password === "" || password === undefined || confPassword === "" || confPassword === undefined) {
        return res.status(400).json({ error: "Field must not be empty" })
    }

    if (password !== confPassword) {
        return res.status(400).json({ error: "Password not match" })
    }

    try {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)
        await query("INSERT INTO users(name, username, email, password, avatar) values (?,?,?,?,?)", [name, username, email, password, avatar])
        return res.status(200).json({ username, hash })
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan" })
    }
}


const login = async (req, res) => {
    const { email, password: inputPass } = req.body
    // TODO Validasi email dan password
    try {
        const [validation] = await query("select id from users where email=?", [email])

        if (validation === undefined) {
            return res.status(400).json({ error: "User not found" })
        }
        const [check] = await query("select id, email, name, password from users where id=?", [validation.id])
        // const isMatch = await bcrypt.compare(inputPass, check.password);
        if (inputPass != check.password) {
            return res.status(400).json({ error: "Password is wrong" })
        }

        const data = {
            id: check.id,
            email: check.email,
            name: check.name
        }

        jwt.sign(data, process.env.SECRETKEY, (err, token) => {
            if (err) throw err
            return res.status(200).json({ Authorization: `Bearer ${token}` })
        })

    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan" })
    }
}

export { register, login }