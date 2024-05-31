<template>
  <div class="registration-container">
    <h2>Register Owner</h2>
    <form @submit.prevent="registerOwner" class="registration-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="formData.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required>
      </div>
      <div class="form-group">
        <label for="ownerBankAccountId">Owner Bank Account ID:</label>
        <input type="text" id="ownerBankAccountId" v-model="formData.ownerBankAccountId" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
     <a href="/loginowner">Already have an account? Click here to login</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        ownerBankAccountId: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    registerOwner() {
      axios.post('http://localhost:8081/owners/register', this.formData)
        .then(response => {
          console.log('Registration successful:', response.data);
          this.$router.push('/loginowner'); 
        })
        .catch(error => {
          console.error('Registration failed:', error.response.data);
          this.errorMessage = error.response.data;
        });
    }
  }
};
</script>

<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
   background-color: #f5f2ca;
}

.registration-form {
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="password"],
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
