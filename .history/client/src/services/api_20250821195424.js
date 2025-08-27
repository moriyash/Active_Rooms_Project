// client/src/services/api.js - Mock Data for View Only
class MockApiService {
  // Mock data
  mockBuildings = [
    {
      id: 1,
      name: "בניין מדעי המחשב",
      area_type: "building",
      description: "בניין הפקולטה למדעי המחשב וטכנולוגיה",
      mapX: 25,
      mapY: 35,
      floorCount: 5,
      sensorCount: 24
    },
    {
      id: 2,
      name: "בניין הנדסה",
      area_type: "building", 
      description: "בניין הפקולטה להנדסה",
      mapX: 70,
      mapY: 30,
      floorCount: 8,
      sensorCount: 35
    },
    {
      id: 3,
      name: "ספרייה מרכזית",
      area_type: "building",
      description: "הספרייה המרכזית של הקמפוס",
      mapX: 50,
      mapY: 65,
      floorCount: 4,
      sensorCount: 18
    },
    {
      id: 4,
      name: "בניין מנהלה",
      area_type: "building",
      description: "בניין המנהלה והמשרדים",
      mapX: 80,
      mapY: 75,
      floorCount: 3,
      sensorCount: 12
    }
  ];

  mockFloors = [
    // Building 1 floors
    { id: 11, name: "קומת קרקע", area_type: "floor", inside_of: 1, level: 0, description: "כניסה ראשית ואולמות הרצאות" },
    { id: 12, name: "קומה ראשונה", area_type: "floor", inside_of: 1, level: 1, description: "מעבדות מחשבים" },
    { id: 13, name: "קומה שנייה", area_type: "floor", inside_of: 1, level: 2, description: "מעבדות מחקר" },
    { id: 14, name: "קומה שלישית", area_type: "floor", inside_of: 1, level: 3, description: "משרדי סגל" },
    { id: 15, name: "קומה רביעית", area_type: "floor", inside_of: 1, level: 4, description: "משרדי הנהלה" },
    
    // Building 2 floors  
    { id: 21, name: "קומת קרקע", area_type: "floor", inside_of: 2, level: 0, description: "אולמות הרצאות גדולים" },
    { id: 22, name: "קומה ראשונה", area_type: "floor", inside_of: 2, level: 1, description: "מעבדות הנדסה" },
    { id: 23, name: "קומה שנייה", area_type: "floor", inside_of: 2, level: 2, description: "מעבדות אלקטרוניקה" },
    
    // Building 3 floors
    { id: 31, name: "קומת קרקע", area_type: "floor", inside_of: 3, level: 0, description: "עמדות מידע ועיון" },
    { id: 32, name: "קומה ראשונה", area_type: "floor", inside_of: 3, level: 1, description: "אולמות קריאה" },
    { id: 33, name: "קומה שנייה", area_type: "floor", inside_of: 3, level: 2, description: "ארכיון ומחסן ספרים" }
  ];

  mockSensors = [
    // Floor 11 sensors (Building 1, Floor 0)
    { id: 101, area_id: 11, name: "חיישן טמפרטורה - אולם A", status: "active", coordinates: {x: 25, y: 30} },
    { id: 102, area_id: 11, name: "חיישן לחות - אולם A", status: "active", coordinates: {x: 25, y: 35} },
    { id: 103, area_id: 11, name: "חיישן תנועה - כניסה ראשית", status: "active", coordinates: {x: 50, y: 20} },
    { id: 104, area_id: 11, name: "חיישן תאורה - מסדרון מרכזי", status: "active", coordinates: {x: 50, y: 50} },
    { id: 105, area_id: 11, name: "חיישן דלת - חדר שרתים", status: "active", coordinates: {x: 80, y: 70} },
    { id: 106, area_id: 11, name: "חיישן איכות אוויר - אולם B", status: "alert", coordinates: {x: 75, y: 30} },
    
    // Floor 12 sensors
    { id: 111, area_id: 12, name: "חיישן טמפרטורה - מעבדה 1", status: "active", coordinates: {x: 30, y: 25} },
    { id: 112, area_id: 12, name: "חיישן רעש - מעבדה 2", status: "active", coordinates: {x: 70, y: 25} },
    { id: 113, area_id: 12, name: "חיישן צריכת חשמל - מעבדה 3", status: "inactive", coordinates: {x: 50, y: 60} },
    
    // Building 2 sensors
    { id: 201, area_id: 21, name: "חיישן טמפרטורה - אולם הנדסה", status: "active", coordinates: {x: 40, y: 40} },
    { id: 202, area_id: 21, name: "חיישן תנועה - כניסה", status: "active", coordinates: {x: 50, y: 20} },
    { id: 203, area_id: 22, name: "חיישן איכות אוויר - מעבדה", status: "alert", coordinates: {x: 60, y: 50} },
    
    // Building 3 sensors  
    { id: 301, area_id: 31, name: "חיישן רעש - אולם קריאה", status: "active", coordinates: {x: 45, y: 55} },
    { id: 302, area_id: 32, name: "חיישן תאורה - מחלקת עיון", status: "active", coordinates: {x: 35, y: 40} }
  ];

  // Simulate API delay
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Buildings API
  async getAllBuildings() {
    await this.delay(300);
    return this.mockBuildings;
  }

  async getBuildingById(id) {
    await this.delay(200);
    const building = this.mockBuildings.find(b => b.id === parseInt(id));
    if (!building) throw new Error('Building not found');
    return building;
  }

  // Floors API  
  async getFloorsByBuilding(buildingId) {
    await this.delay(300);
    return this.mockFloors.filter(f => f.inside_of === parseInt(buildingId));
  }

  async getFloorById(id) {
    await this.delay(200);
    const floor = this.mockFloors.find(f => f.id === parseInt(id));
    if (!floor) throw new Error('Floor not found');
    
    return {
      ...floor,
      buildingId: floor.inside_of,
      level: floor.level || this.extractFloorLevel(floor.name)
    };
  }

  extractFloorLevel(floorName) {
    if (floorName.includes('קרקע')) return 0;
    if (floorName.includes('מרתף')) {
      const match = floorName.match(/-?\d+/);
      return match ? -parseInt(match[0]) : -1;
    }
    const match = floorName.match(/\d+/);
    return match ? parseInt(match[0]) : 1;
  }

  // Sensors API
  async getAllSensors() {
    await this.delay(300);
    return this.mockSensors;
  }

  async getSensorById(id) {
    await this.delay(200);
    const sensor = this.mockSensors.find(s => s.id === parseInt(id));
    if (!sensor) throw new Error('Sensor not found');
    return sensor;
  }

  async getSensorsByFloor(floorId) {
    await this.delay(300);
    return this.mockSensors.filter(s => s.area_id === parseInt(floorId));
  }

  async getSensorsByFloorEnhanced(floorId) {
    const sensors = await this.getSensorsByFloor(floorId);
    return sensors.map(sensor => ({
      ...sensor,
      ...this.parseSensorCoordinates(sensor),
      type: this.extractSensorType(sensor.name)
    }));
  }

  parseSensorCoordinates(sensor) {
    if (sensor.coordinates) {
      try {
        const coords = typeof sensor.coordinates === 'string' 
          ? JSON.parse(sensor.coordinates) 
          : sensor.coordinates;
        return {
          positionX: coords.x || 50,
          positionY: coords.y || 50
        };
      } catch (e) {
        console.warn('Failed to parse sensor coordinates:', e);
      }
    }
    return { positionX: 50, positionY: 50 };
  }

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

  // Sensor status simulation
  async getAllSensorsStatus() {
    await this.delay(200);
    const status = {};
    
    this.mockSensors.forEach(sensor => {
      status[sensor.id] = {
        sensorId: sensor.id,
        areaId: sensor.area_id,
        status: sensor.status,
        alert: sensor.status === 'alert',
        lastUpdate: new Date().toISOString()
      };
    });
    
    return status;
  }

  // Generate sensor data based on type and status
  async getSensorData(sensorId, timeRange = '24h') {
    await this.delay(300);
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
      const value = this.generateValueBySensorType(sensorType, sensor.status === 'alert');
      
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

  generateValueBySensorType(type, isAlert = false) {
    let baseValue;
    
    switch (type) {
      case 'temperature':
        baseValue = isAlert ? +(Math.random() * 10 + 35).toFixed(1) : +(Math.random() * 15 + 18).toFixed(1);
        return { value: baseValue, unit: '°C' };
      case 'humidity':
        baseValue = isAlert ? +(Math.random() * 20 + 80).toFixed(1) : +(Math.random() * 40 + 40).toFixed(1);
        return { value: baseValue, unit: '%' };
      case 'light':
        baseValue = isAlert ? +(Math.random() * 100 + 50).toFixed(0) : +(Math.random() * 800 + 200).toFixed(0);
        return { value: baseValue, unit: 'lux' };
      case 'motion':
        return { value: Math.random() > 0.7 ? 1 : 0, unit: '' };
      case 'door':
        return { value: Math.random() > 0.9 ? 1 : 0, unit: '' };
      case 'air_quality':
        baseValue = isAlert ? +(Math.random() * 300 + 700).toFixed(0) : +(Math.random() * 200 + 300).toFixed(0);
        return { value: baseValue, unit: 'ppm' };
      case 'noise':
        baseValue = isAlert ? +(Math.random() * 30 + 70).toFixed(1) : +(Math.random() * 20 + 30).toFixed(1);
        return { value: baseValue, unit: 'dB' };
      case 'energy':
        baseValue = isAlert ? +(Math.random() * 20 + 25).toFixed(1) : +(Math.random() * 10 + 5).toFixed(1);
        return { value: baseValue, unit: 'kW' };
      default:
        return { value: +(Math.random() * 100).toFixed(1), unit: '' };
    }
  }

  // Mock CRUD operations (for demo purposes)
  async createArea(areaData) {
    await this.delay(400);
    return { id: Date.now(), message: 'Area created successfully (demo)' };
  }

  async updateArea(id, areaData) {
    await this.delay(400);
    return { message: 'Area updated successfully (demo)' };
  }

  async deleteArea(id) {
    await this.delay(400);
    return { message: 'Area deleted successfully (demo)' };
  }

  async createSensor(sensorData) {
    await this.delay(400);
    return { id: Date.now(), message: 'Sensor created successfully (demo)' };
  }

  async updateSensor(id, sensorData) {
    await this.delay(400);
    return { message: 'Sensor updated successfully (demo)' };
  }

  async deleteSensor(id) {
    await this.delay(400);
    return { message: 'Sensor deleted successfully (demo)' };
  }
}

export default new MockApiService();