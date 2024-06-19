import { query } from "../database/db.js";

export const getProfiderById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await query("SELECT * FROM providers WHERE user_id = ?", [id])
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const insertProvider = async (req, res) => {
    const { user_id, provider_name, description, price_start, price_end, category_id } = req.body;
    try {
        await query("INSERT INTO providers(user_id, provider_name, description, price_start, price_end, category_id) values (?, ?, ?, ?, ?, ?)", [user_id, provider_name, description, price_start, price_end, category_id]);
        return res.status(200).json({ msg: "Provider Ditambahkan" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "terjadi kesalahan pada server" });
    }
}

export const editProvider = async (req, res) => {
    const { id, status } = req.body;
    try {
        await query("UPDATE providers SET status = ? WHERE provider_id = ?", [status, id]);
        return res.status(200).json({ msg: "Status provider diperbarui" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const getProfiderActive = async (req, res) => {
    try {
        const result = await query("SELECT providers.*, users.name FROM providers INNER JOIN users ON providers.user_id = users.id WHERE providers.status = 'active'")
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const searchProvider = async (req, res) => {
    const { name } = req.body;
    const nameWithWildcards = `%${name}%`;
    try {
        const result = await query(
            "SELECT providers.*, users.name FROM providers INNER JOIN users ON providers.user_id = users.id WHERE providers.status = 'active' AND providers.provider_name LIKE ?",
            [nameWithWildcards]
        );
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}
