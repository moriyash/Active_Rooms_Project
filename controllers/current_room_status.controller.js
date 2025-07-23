const pool = require('../db');

// Get all CurrentRoomStatus
exports.getAllCurrentRoomStatus = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM current_room_status');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current_room_status' });
  }
};

// Get CurrentRoomStatus by ID
exports.getCurrentRoomStatusById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM current_room_status WHERE room_id = ?', [req.params.room_id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Status not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current_room_status' });
  }
};

// Create new CurrentRoomStatus
exports.createCurrentRoomStatus = async (req, res) => {
  try {
    const { people_count, is_active, motion_detected, last_motion_time, last_light_change} = req.body;

    const [result] = await pool.query(
      `INSERT INTO current_room_status (people_count, is_active, motion_detected, last_motion_time, last_light_change)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [people_count, is_active, motion_detected, last_motion_time, last_light_change]
    );

    res.status(201).json({ sensor_id: result.insertId, message: 'current_room_status created successfully' });
  } catch (err) {
    console.error(" SQL ERROR:", err); 
    res.status(500).json({ error: 'Failed to create status' });
  }
};


// Update CurrentRoomStatus
exports.updateCurrentRoomStatus = async (req, res) => {
  try {
    const { people_count, is_active, motion_detected, last_motion_time, last_light_change} = req.body;

    const [result] = await pool.query(
      `UPDATE current_room_status SET people_count=?, is_active=?, motion_detected=?, last_motion_time=?, last_light_change=?
       WHERE room_id = ?`,
      [people_count, is_active, motion_detected, last_motion_time, last_light_change]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'current_room_status not found' });

    res.json({ message: 'current_room_status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

// Delete CurrentRoomStatus
exports.deleteCurrentRoomStatus = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM current_room_status WHERE room_id = ?', [req.params.room_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'current_room_status not found' });

    res.json({ message: 'current_room_status deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete status' });
  }
};
