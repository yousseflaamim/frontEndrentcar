<template>
  <div class="add-car-container">
    <h2>Add New Car</h2>
    <form @submit.prevent="addCar" class="add-car-form">
      <div class="form-group">
        <label for="newImage">Image:</label>
        <input type="file" id="newImage" @change="onNewFileChange" accept="image/*">
      </div>
      <input type="hidden" v-model="newCar.carImage">
      <div class="form-group">
        <label for="carType">Car Type:</label>
        <input type="text" v-model="newCar.carType" required>
      </div>
      <div class="form-group">
        <label for="rentPrice">Rent Price:</label>
        <input type="number" v-model="newCar.rentPrice" required>
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" v-model="newCar.location" required>
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input type="text" v-model="newCar.model" required>
      </div>
      <div class="form-group">
        <label for="color">Color:</label>
        <input type="text" v-model="newCar.color" required>
      </div>
      <div class="form-group">
        <label for="seatingCapacity">Seating Capacity:</label>
        <input type="number" v-model="newCar.seatingCapacity" required>
      </div>
      <div class="form-buttons">
        <button type="submit">Add Car</button>
        <button type="button" @click="cancel">Cancel</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      newCar: {
        carImage: '',
        carType: '',
        rentPrice: '',
        location: '',
        model: '',
        color: '',
        seatingCapacity: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    onNewFileChange(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
    },
    addCar() {
      const ownerId = localStorage.getItem('ownerId');
      if (!ownerId) {
        this.errorMessage = 'Owner ID not found. Please login again.';
        return;
      }
      
      const config = {
        params: {
          ownerId: ownerId
        }
      };
      
      axios.post(`http://localhost:8081/api/cars/add`, this.newCar, config)
        .then(response => {
          console.log('Car added successfully:', response.data);
          this.$router.push('/profilowner'); 
        })
        .catch(error => {
          console.error('Error adding car:', error);
          this.errorMessage = error.response?.data?.message || 'Error adding car';
        });
    },
    cancel() {
      this.$router.push('/profilowner'); 
    }
  }
};
</script>

<style scoped>
.add-car-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  height: 100vh; /* Adjust as needed */
}

.add-car-form {
  width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="file"],
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.form-buttons button {
  width: 48%;
}

.form-buttons button[type="button"] {
  background-color: #dc3545;
}

.form-buttons button[type="button"]:hover {
  background-color: #c82333;
}
</style>

