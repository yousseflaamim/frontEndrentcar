<template>
  <div class="page-container">
    <header class="header">
      <h1 class="title">Car Rental System</h1>
      <div class="buttons">
        <button @click="goToOwnerRegistration">Register as Owner</button>
        <button @click="goToRenterRegistration">Register as Renter</button>
      </div>
    </header>
    <main class="main-content">
      <h2>Welcome to the Car Rental System</h2>
      <div class="car-list">
        <h3>Available Cars</h3>
        <div class="car-grid">
          <div class="car-card" v-for="car in cars" :key="car.id">
            <div class="car-info">
                <p><strong>{{ car.carType }}</strong></p>
                <p>image: {{ car.carImage }}</p>
              <p>Rent Price: {{ car.rentPrice }}</p>
              <p>Location: {{ car.location }}</p>
              <p>Model: {{ car.model }}</p>
              <p>Color: {{ car.color }}</p>
              <p>Seating Capacity: {{ car.seatingCapacity }}</p>
              <p v-if="car.availableForBooking">Available for Booking</p>
              <p v-else>Not Available for Booking</p>
             
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
  data() {
    return {
      cars: [] // Populate this with your car data from API or other source
    };
  },
  created() {
    this.fetchCars(); // Fetch cars when the component is created
  },
  methods: {
    fetchCars() {
      // Fetch car data from your API
      axios.get('http://localhost:8081/api/cars/')
        .then(response => {
          this.cars = response.data;
        })
        .catch(error => {
          console.error('Error fetching cars:', error);
        });
    },
    goToOwnerRegistration() {
      this.$router.push('/ownerRegister');
    },
    goToRenterRegistration() {
      this.$router.push('/registerRenter');
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
  padding: 20px;
  background-color: rgb(139, 131, 131);
  color: white;
}

.title {
  margin: 0;
}

.buttons button {
  margin-left: 10px;
  padding: 10px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.car-list {
  margin-top: 20px;
}

.car-list h3 {
  margin-bottom: 10px;
}

.car-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.car-card {
  flex: 1 1 calc(33.333% - 20px);
  background-color: #f4f3ed;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>
