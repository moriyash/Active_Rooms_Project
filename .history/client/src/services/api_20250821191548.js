// client/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class ApiService {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Areas API - מותאם בדיוק לטבלה שלך
  async getAllAreas() {
    return this.get('/areas');
  }

  async getAreaById(id) {
    return this.get(`/areas/${id}`);
  }

  // Buildings - areas עם area_type = 'building'
  async getAllBuildings() {
    const areas = await this.getAllAreas();
    return areas.filter(area => area.area_type === 'building');
  }

  async getBuildingById(id) {
    const area = await this.getAreaById(id);
    if (area.area_type === 'building') {
      return area;
    }
    throw new Error('Area is not a building');
  }

  // Floors - areas עם area_type = 'floor' ו inside_of = building_id
  async getFloorsByBuilding(buildingId) {
    const areas = await this.getAllAreas();
    return areas.filter(area => 
      area.area_type === 'floor' && area.inside_of === buildingId
    );
  }

  async getFloorById(id) {
    const area = await this.getAreaById(id);
    if (area.area_type === 'floor') {
      return {
        ...area,
        buildingId: area.inside_of,
        level: this.extractFloorLevel(area.name) // נחלץ מהשם
      };
    }
    throw new Error('Area is not a floor');
  }

  // Helper function to extract floor level from name
  extractFloorLevel(floorName) {
    // דוגמאות: "קומה 1", "קומת קרקע", "מרתף -1"
    if (floorName.includes('קרקע')) return 0;
    if (floorName.includes('מרתף')) {
      const match = floorName.match(/-?\d+/);
      return match ? -parseInt(match[0]) : -1;
    }
    const match = floorName.match(/\d+/);
    return match ? parseInt(match[0]) : 1;
  }

  // Sensors API - מותאם בדיוק לטבלה שלך
  async getAllSensors() {
    return this.get('/sensors');
  }

  async getSensorById(id) {
    return this.get(`/sensors/${id}`);
  }

  async getSensorsByFloor(floorId) {
    const sensors = await this.getAllSensors();
    return sensors.filter(sensor => sensor.area_id === floorId);
  }

  // Parse coordinates from JSON field
  parseSensorCoordinates(sensor) {
    if (sensor.coordinates) {
      try {
        const coords = typeof sensor.coordinates === 'string' 
          ? JSON.parse(sensor.coordinates) 
          : sensor.coordinates;
        return {
          positionX: coords.x || coords.positionX || 50,
          positionY: coords.y || coords.positionY || 50
        };
      } catch (e) {
        console.warn('Failed to parse sensor coordinates:', e);
      }
    }
    return { positionX: 50, positionY: 50 };
  }

  // Enhanced sensor data with parsed coordinates
  async getSensorsByFloorEnhanced(floorId) {
    const sensors = await this.getSensorsByFloor(floorId);
    return sensors.map(sensor => ({
      ...sensor,
      ...this.parseSensorCoordinates(sensor),
      type: this.extractSensorType(sensor.name)
    }));
  }

  // Extract sensor type from name (if not separate field)
  extractSensorType(sensorName) {
    const name = sensorName.toLowerCase();
    if (name.includes('טמפרטורה') || name.includes('temperature')) return 'temperature';
    if (name.includes('לחות') || name.includes('humidity')) return 'humidity';
    if (name.includes('תאורה') || name.includes('light')) return 'light';
    if (name.includes('תנועה') || name.includes('motion')) return 'motion';
    if (name.includes('דלת') || name.includes('door')) return 'door';
    if (name.includes('אוויר') || name.includes('air')) return 'air_quality';
    if (name.includes('רעש') || name.includes('noise')) return 'noise';
    if (name.includes('חשמל') || name.includes('energy')) return 'energy';
    return 'general';
  }

  // Status based on sensor.status field
  async getAllSensorsStatus() {
    const sensors = await this.getAllSensors();
    const status = {};
    
    sensors.forEach(sensor => {
      // Map your sensor areas to building/floor structure
      status[sensor.id] = {
        sensorId: sensor.id,
        areaId: sensor.area_id,
        status: sensor.status || 'unknown',
        alert: sensor.status === 'alert' || false,
        lastUpdate: new Date().toISOString()
      };
    });
    
    return status;
  }

  // Since you don't have sensor_data table, simulate based on current status
  async getSensorData(sensorId, timeRange = '24h') {
    const sensor = await this.getSensorById(sensorId);
    return this.generateSensorDataFromStatus(sensor, timeRange);
  }

  generateSensorDataFromStatus(sensor, timeRange) {
    const now = new Date();
    const data = [];
    const points = timeRange === '1h' ? 12 : timeRange === '24h' ? 24 : 48;
    const sensorType = this.extractSensorType(sensor.name);
    
    for (let i = points; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      const value = this.generateValueBySensorType(sensorType);
      
      data.push({
        id: Date.now() + i,
        sensorId: sensor.id,
        value: value.value,
        unit: value.unit,
        status: sensor.status,
        alert: sensor.status === 'alert',
        timestamp: timestamp.toISOString()
      });
    }
    
    return data;
  }

  generateValueBySensorType(type) {
    switch (type) {
      case 'temperature':
        return { value: +(Math.random() * 15 + 18).toFixed(1), unit: '°C' };
      case 'humidity':
        return { value: +(Math.random() * 40 + 40).toFixed(1), unit: '%' };
      case 'light':
        return { value: +(Math.random() * 800 + 200).toFixed(0), unit: 'lux' };
      case 'motion':
        return { value: Math.random() > 0.7 ? 1 : 0, unit: '' };
      case 'door':
        return { value: Math.random() > 0.9 ? 1 : 0, unit: '' };
      case 'air_quality':
        return { value: +(Math.random() * 200 + 300).toFixed(0), unit: 'ppm' };
      case 'noise':
        return { value: +(Math.random() * 20 + 30).toFixed(1), unit: 'dB' };
      case 'energy':
        return { value: +(Math.random() * 10 + 5).toFixed(1), unit: 'kW' };
      default:
        return { value: +(Math.random() * 100).toFixed(1), unit: '' };
    }
  }

  // CRUD operations for your exact schema
  async createArea(areaData) {
    // Expecting: { name, area_type, image_path, inside_of, description }
    return this.post('/areas', areaData);
  }

  async updateArea(id, areaData) {
    return this.put(`/areas/${id}`, areaData);
  }

  async deleteArea(id) {
    return this.delete(`/areas/${id}`);
  }

  async createSensor(sensorData) {
    // Expecting: { area_id, status, name, coordinates }
    // coordinates should be JSON: {"x": 50, "y": 50}
    return this.post('/sensors', sensorData);
  }

  async updateSensor(id, sensorData) {
    return this.put(`/sensors/${id}`, sensorData);
  }

  async deleteSensor(id) {
    return this.delete(`/sensors/${id}`);
  }

  // Users API
  async getAllUsers() {
    return this.get('/users');
  }

  async getUserById(id) {
    return this.get(`/users/${id}`);
  }

  async createUser(userData) {
    // Expecting: { username, email, password_hash, user_type, phone }
    return this.post('/users', userData);
  }

  async updateUser(id, userData) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return this.delete(`/users/${id}`);
  }
}

export default new ApiService();