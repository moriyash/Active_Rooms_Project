const pool = require('../db');

// Get all areas
exports.getAllAreas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM areas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
};

// Get area by ID
exports.getAreaById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM areas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Area not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch area' });
  }
};

// Create new area
exports.createArea = async (req, res) => {
  try {
    const { name, area_type, image_path, inside_of, coordinates, is_active, description, restriction } = req.body;

    const [result] = await pool.query(
      `INSERT INTO areas (name, area_type, image_path, inside_of, coordinates, is_active, description, restriction)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, area_type, image_path, inside_of, JSON.stringify(coordinates), is_active, description, restriction]
    );

    res.status(201).json({ id: result.insertId, message: 'Area created successfully' });
  } catch (err) {
    console.error("❌ SQL ERROR:", err); // <--- הוספנו את זה
    res.status(500).json({ error: 'Failed to create area' });
  }
};


// Update area
exports.updateArea = async (req, res) => {
  try {
    const { name, area_type, image_path, inside_of, coordinates, is_active, description, restriction } = req.body;

    const [result] = await pool.query(
      `UPDATE areas SET name=?, area_type=?, image_path=?, inside_of=?, coordinates=?, is_active=?, description=?, restriction=?
       WHERE id = ?`,
      [name, area_type, image_path, inside_of, JSON.stringify(coordinates), is_active, description, restriction, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Area not found' });

    res.json({ message: 'Area updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update area' });
  }
};

// Delete area
exports.deleteArea = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM areas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Area not found' });

    res.json({ message: 'Area deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete area' });
  }
};
