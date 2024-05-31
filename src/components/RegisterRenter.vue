<template>
  <div class="register-renter-container">
    <h2>Renter Registration</h2>
    <form @submit.prevent="registerRenter" class="register-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="renter.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="renter.password" required>
      </div>
      <div class="form-group">
        <label for="renterBankAccountId">Renter Bank Account ID:</label>
        <input type="text" id="renterBankAccountId" v-model="renter.renterBankAccountId" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <a href="/registerRenter">Already have an account? Click here to login</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      renter: {
        username: '',
        password: '',
        renterBankAccountId:''
      },
      errorMessage: ''
    };
  },
  methods: {
    registerRenter() {
      axios.post('http://localhost:8081/renters/register', this.renter)
        .then(response => {
          localStorage.setItem('token', response.data);
          this.$router.push('/loginRenter');
        })
        .catch(error => {
          console.error('Registration error:', error);
          this.errorMessage = error.response?.data || 'Registration error';
        });
    }
  }
};
</script>

<style scoped>
.register-renter-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  height: 100vh; 
}

.register-form {
  width: 300px;
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
input[type="password"],
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
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
