// client/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  // Helper method for making HTTP requests
  static async makeRequest(url, options = {}) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(`${API_BASE_URL}${url}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // ==========================================
  // AREAS API (Buildings & Floors)
  // ==========================================
  
  // Get all areas (buildings and floors)
  static async getAllAreas() {
    return this.makeRequest('/areas');
  }

  // Get specific area by ID
  static async getAreaById(id) {
    return this.makeRequest(`/areas/${id}`);
  }

  // Get floors of a building (areas where inside_of = building_id)
  static async getFloorsByBuildingId(buildingId) {
    const allAreas = await this.getAllAreas();
    return allAreas.filter(area => 
      area.area_type === 'floor' && area.inside_of === buildingId
    );
  }

  // Get all buildings (areas where area_type = 'building')
  static async getAllBuildings() {
    try {
      const allAreas = await this.getAllAreas();
      const buildings = allAreas.filter(area => area.area_type === 'building');
      
      // Transform to match expected frontend structure
      const transformedBuildings = await Promise.all(
        buildings.map(async (building) => {
          try {
            const floors = await this.getFloorsByBuildingId(building.id);
            
            return {
              id: building.id,
              name: building.name,
              description: building.description,
              imageUrl: building.image_path,
              floors: await Promise.all(
                floors.map(async (floor) => {
                  try {
                    const floorSensors = await this.getSensorsByAreaId(floor.id);
                    return {
                      id: floor.id,
                      name: floor.name,
                      floorImageUrl: floor.image_path,
                      sensors: floorSensors.map(sensor => ({
                        id: sensor.id,
                        name: sensor.name,
                        x: sensor.coordinates?.x || 50,
                        y: sensor.coordinates?.y || 50,
                        occupied: sensor.status === 'active',
                        count: sensor.coordinates?.count || 0,
                        maxCapacity: sensor.coordinates?.maxCapacity || 30
                      }))
                    };
                  } catch (error) {
                    // אם אין סנסורים לקומה, פשוט מחזיר קומה ריקה
                    return {
                      id: floor.id,
                      name: floor.name,
                      floorImageUrl: floor.image_path,
                      sensors: []
                    };
                  }
                })
              )
            };
          } catch (error) {
            // אם אין קומות לבניין, פשוט מחזיר בניין ריק
            return {
              id: building.id,
              name: building.name,
              description: building.description,
              imageUrl: building.image_path,
              floors: []
            };
          }
        })
      );
      
      return transformedBuildings;
    } catch (error) {
      console.error('Error in getAllBuildings:', error);
      throw error;
    }
  }

  // Create new area (building or floor)
  static async createArea(areaData) {
    return this.makeRequest('/areas', {
      method: 'POST',
      body: JSON.stringify(areaData),
    });
  }

  // Update area
  static async updateArea(id, areaData) {
    return this.makeRequest(`/areas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(areaData),
    });
  }

  // Delete area
  static async deleteArea(id) {
    return this.makeRequest(`/areas/${id}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // SENSORS API
  // ==========================================
  
  // Get all sensors
  static async getAllSensors() {
    return this.makeRequest('/sensors');
  }

  // Get sensor by ID
  static async getSensorById(id) {
    return this.makeRequest(`/sensors/${id}`);
  }

  // Get sensors by area ID (floor)
  static async getSensorsByAreaId(areaId) {
    const allSensors = await this.getAllSensors();
    return allSensors.filter(sensor => sensor.area_id === areaId);
  }

  // Get sensors by building ID (all floors in building)
  static async getSensorsByBuildingId(buildingId) {
    const floors = await this.getFloorsByBuildingId(buildingId);
    const allSensors = [];
    
    for (const floor of floors) {
      const floorSensors = await this.getSensorsByAreaId(floor.id);
      allSensors.push(...floorSensors);
    }
    
    return allSensors;
  }

  // Get all sensors status (for dashboard)
  static async getAllSensorsStatus() {
    const sensors = await this.getAllSensors();
    const statusMap = {};
    
    sensors.forEach(sensor => {
      statusMap[sensor.id] = {
        id: sensor.id,
        areaId: sensor.area_id,
        status: sensor.status,
        name: sensor.name,
        alert: sensor.status === 'error' || sensor.status === 'offline',
        coordinates: sensor.coordinates
      };
    });
    
    return statusMap;
  }

  // Create new sensor
  static async createSensor(sensorData) {
    return this.makeRequest('/sensors', {
      method: 'POST',
      body: JSON.stringify(sensorData),
    });
  }

  // Update sensor
  static async updateSensor(id, sensorData) {
    return this.makeRequest(`/sensors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sensorData),
    });
  }

  // Update sensor coordinates
  static async updateSensorCoordinates(id, coordinates) {
    const sensor = await this.getSensorById(id);
    const updatedCoordinates = {
      ...sensor.coordinates,
      ...coordinates
    };
    
    return this.updateSensor(id, {
      ...sensor,
      coordinates: updatedCoordinates
    });
  }

  // Delete sensor
  static async deleteSensor(id) {
    return this.makeRequest(`/sensors/${id}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // USERS API
  // ==========================================
  
  // Get all users
  static async getAllUsers() {
    return this.makeRequest('/users');
  }

  // Get user by ID
  static async getUserById(id) {
    return this.makeRequest(`/users/${id}`);
  }

  // Login user
  static async login(username, passwordHash) {
    return this.makeRequest(`/users/${username},${passwordHash}`);
  }

  // Create new user
  static async createUser(userData) {
    return this.makeRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Update user
  static async updateUser(id, userData) {
    return this.makeRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Delete user
  static async deleteUser(id) {
    return this.makeRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================
  
  // Health check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Get server info
  static async getServerInfo() {
    return this.makeRequest('/info');
  }
}

export default ApiService;