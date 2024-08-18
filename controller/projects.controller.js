import { query } from "../database/db.js"

export const addProject = async (req, res) => {
    const { project_name, description } = req.body;
    try {
        await query("INSERT INTO projects(project_name, description) values (?, ?)", [project_name, description]);
        return res.status(200).json({ msg: "Project Ditambahkan" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "terjadi kesalahan pada server" });
    }
}

export const getProject = async (req, res) => {
    try {
        const result = await query("SELECT * from projects")
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const editProject = async (req, res) => {
    const { id } = req.params
    const { project_name, description } = req.body
    try {
        await query("UPDATE projects SET project_name = ?, description = ? WHERE project_id = ?",
            [project_name, description, id]);
        return res.status(200).json({ msg: "project diperbarui" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        await query("DELETE FROM Projects where project_id=?", [id])
        return res.status(200).json({ msg: "Project Dihapus" })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}