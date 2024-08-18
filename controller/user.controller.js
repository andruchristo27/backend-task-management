import { query } from "../database/db.js"

export const insertUser = async (req, res) => {
    const { nama, username, email, password, avatar } = req.body
    try {
        await query("INSERT INTO users (name, username, email, password, avatar) values (?,?,?,?)", [nama, username, email, password, avatar])
        return res.status(200).json({ msg: "Siswa Ditambahkan" })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const getUser = async (req, res) => {
    try {
        const result = await query('Select * from users')
        return res.status(200).json({ success: true, data: result })
    } catch (e) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, username, email, avatar } = req.body
    try {
        await query(
            "UPDATE users SET name = ?, username = ?, email = ?, avatar = ? WHERE id = ?",
            [name, username, email, avatar, id]
        );
        return res.status(200).json({ msg: "Data Berhasil Diubah" });
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await query("DELETE FROM users where id=?", [id])
        return res.status(200).json({ msg: "user Dihapus" })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}