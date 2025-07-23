const pool = require('../db');

// Get all sensors
exports.getAllSensors = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sensors');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sensors' });
  }
};

// Get sensor by ID
exports.getSensorById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sensors WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Sensor not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sensors' });
  }
};

// Create new sensor
exports.createSensor = async (req, res) => {
  try {
    const { room_id, sensor_type, status, managed_by} = req.body;

    const [result] = await pool.query(
      `INSERT INTO sensors (room_id, sensor_type, status, managed_by)
       VALUES (?, ?, ?, ?)`,
      [room_id, sensor_type, JSON.stringify(status), managed_by]
    );

    res.status(201).json({ id: result.insertId, message: 'Sensor created successfully' });
  } catch (err) {
    console.error(" SQL ERROR:", err); 
    res.status(500).json({ error: 'Failed to create sensor' });
  }
};


// Update sensor
exports.updateSensor = async (req, res) => {
  try {
    const { room_id, sensor_type, status, managed_by} = req.body;

    const [result] = await pool.query(
      `UPDATE sensors SET sensor_type=?, status=?, managed_by=?
       WHERE id = ?`,
      [room_id, sensor_type, JSON.stringify(status), managed_by]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Sensor not found' });

    res.json({ message: 'Sensor updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update sensor' });
  }
};

// Delete sensor
exports.deleteSensor = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM sensors WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Sensor not found' });

    res.json({ message: 'Sensor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete sensor' });
  }
};
