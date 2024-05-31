<template>
  <div class="page-container">
    <header class="header">
      <h1 class="title">Car Rental System</h1>
      <div class="buttons">
        <button class="header-button" @click="goToAddCar">Add Car</button>
        <button class="header-button" @click="logout">Logout</button>
      </div>
    </header>
    <main class="main-content">
      <h2>Welcome to your Car Profile</h2>
      <div class="car-list">
        <h3>Available Cars</h3>
        <div class="car-grid">
          <div class="car-card" v-for="car in cars" :key="car.id">
            <img :src="car.image" alt="Car Image" class="car-image" />
            <div class="car-info">
              <p><strong>Model:</strong> {{ car.model }}</p>
              <p><strong>Color:</strong> {{ car.color }}</p>
              <p><strong>Car Type:</strong> {{ car.carType }}</p>
              <p><strong>Rent Price:</strong> ${{ car.rentPrice }}</p>
              <p><strong>Location:</strong> {{ car.location }}</p>
              <p><strong>Seating Capacity:</strong> {{ car.seatingCapacity }}</p>
              <p><strong>Owner:</strong> {{ car.owner.name }}</p>
              <div class="car-actions">
                <button class="action-button" @click="editCar(car)">Edit</button>
                <button class="action-button" @click="deleteCar(car.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer">
      <p>&copy; 2024 Car Rental System</p>
    </footer>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
    async getCarByIdAndOwner(carId, ownerId) {
      try {
        let url = '';
        if (carId) {
          // If car ID is available, fetch the car details by ID and owner ID
          url = `http://localhost:8081/api/cars/${carId}/owner/${ownerId}`;
        } else {
          // If car ID is not available, fetch cars associated with the owner ID
          url = `http://localhost:8081/api/cars/owner/${ownerId}`;
        }
        
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data; 
      } catch (error) {
        console.error('Error fetching car by ID and owner:', error);
        throw error; 
      }
    },
    goToAddCar() {
      this.$router.push('/addcar');
    },
    logout() {
      localStorage.removeItem('ownerId');
      this.$router.push('/home');
    }
  }
};
</script>




<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #003366;
  color: white;
  padding: 1rem;
}

.title {
  margin: 0;
}

.buttons {
  display: flex;
}

.header-button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header-button:hover {
  background-color: #0056b3;
}

.main-content {
  flex: 1;
  padding: 1rem;
}

.car-list {
  margin-top: 1rem;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.car-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.car-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.car-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.car-info {
  padding: 1rem;
}

.car-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #218838;
}

.action-button:nth-child(2) {
  background-color: #dc3545;
}

.action-button:nth-child(2):hover {
  background-color: #c82333;
}

.footer {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>
