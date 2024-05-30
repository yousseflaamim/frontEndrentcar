<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="loginOwner" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <a href="/ownerRegister">if you dont have account? Click here to register</a>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLoginComponent',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    loginOwner() {
      axios.post('http://localhost:8081/owners/login', this.formData)
        .then(response => {
          const token = response.data.token;
          if (!token) {
            throw new Error('Token is undefined');
          }
          const ownerId = this.extractOwnerIdFromToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('ownerId', ownerId);
          console.log('Token and ownerId set in localStorage:', { token, ownerId });
          this.$router.push('/profilowner');
        })
        .catch(error => {
          console.error('Login failed:', error);
          this.errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
        });
    },
    extractOwnerIdFromToken(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Extracted payload from token:', payload);
      return payload.sub;  // Assuming 'sub' is the ownerId
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
   background-color: #f5f2ca;
}

.login-form {
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

