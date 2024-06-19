import { query } from "../database/db.js"

export const getAppointPending = async (req, res) => {
    const { id } = req.params
    try {
        const result = await query("SELECT appointment_id, seeker_id, appointments.provider_id, appointment_date, appointments.status, provider_name, users.username FROM appointments INNER JOIN providers ON appointments.provider_id = providers.provider_id INNER JOIN users ON appointments.seeker_id = users.id WHERE providers.user_id = ? AND appointments.status = 'pending';", [id])
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const getAppointConfirm = async (req, res) => {
    const { id } = req.params
    try {
        const result = await query("SELECT appointment_id, seeker_id, appointments.provider_id, appointment_date, appointments.status, provider_name, users.username FROM appointments INNER JOIN providers ON appointments.provider_id = providers.provider_id INNER JOIN users ON appointments.seeker_id = users.id WHERE providers.user_id = ? AND appointments.status = 'confirmed';", [id])
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log("Terjadi kesalahan", e)
        return res.status(500).json({ msg: "terjadi kesalahan pada server" })
    }
}

export const editStatusAppoint = async (req, res) => {
    const { id, status } = req.body;
    try {
        await query("UPDATE appointments SET status = ? WHERE appointment_id = ?", [status, id]);
        return res.status(200).json({ msg: "Status provider diperbarui" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}
