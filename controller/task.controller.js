import { query } from "../database/db.js";

export const addTask = async (req, res) => {
    const { title, description, status, due_date, user_id, project_id } = req.body;
    try {
        await query("INSERT INTO tasks(title, description, status, due_date, user_id, project_id) values (?,?,?,?,?,?)", [title, description, status, due_date, user_id, project_id]);
        return res.status(200).json({ msg: "task Ditambahkan" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "terjadi kesalahan pada server" });
    }
}

export const getTask = async (req, res) => {
    try {
        const result = await query("SELECT * from tasks")
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const editTask = async (req, res) => {
    const { id } = req.params
    const { status } = req.body;
    try {
        await query("UPDATE tasks SET status = ? WHERE tasks_id = ?",
            [status, id]);
        return res.status(200).json({ msg: "task diperbarui" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        await query("DELETE FROM tasks where tasks_id=?", [id])
        return res.status(200).json({ msg: "task Dihapus" })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}