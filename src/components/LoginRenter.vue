<template>
  <div class="login-container">
    <h2>Renter Login</h2>
    <form @submit.prevent="loginRenter">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="credentials.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="credentials.password" required>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <a href="/registerRenter" class="register-link">If you don't have an account, click here to register</a>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    loginRenter() {
      axios.post('http://localhost:8081/renters/login', this.credentials)
        .then(response => {
          // Check if the response contains a token
          if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            // Redirect to the renter's profile page
            this.$router.push('/profilRenter');
          } else {
            // Handle invalid response (e.g., invalid credentials)
            this.errorMessage = 'Invalid username or password';
          }
        })
        .catch(error => {
          console.error('Login error:', error);
          this.errorMessage = error.response?.data?.message || 'Login error';
        });
    }
  }
};
</script>



<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ede6e6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
