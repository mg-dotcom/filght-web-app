<script setup>
// Login component setup
</script>

<template>
  <div class="login-container">
    <!-- Left side with login form -->
    <div class="login-form-container">
      <h1 class="login-title">LOGIN</h1>
      <p class="login-subtitle">How to i get started lorem ipsum dolor at?</p>

      <div class="form-group">
        <div class="input-with-icon">
          <span class="icon">👤</span>
          <input type="text" placeholder="Username" class="input-field" />
        </div>
      </div>

      <div class="form-group">
        <div class="input-with-icon">
          <span class="icon">🔒</span>
          <input type="password" placeholder="Password" class="input-field" />
        </div>
      </div>

      <button class="login-button">Login Now</button>
    </div>

    <!-- Right side with airplane image -->
    <div class="image-container"></div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.login-form-container {
  flex: 1;
  background-color: #e9f3f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.image-container {
  flex: 1;
  background-image: url("/login/right-side-cover.png");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.login-title {
  color: #2c5d7c;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.login-subtitle {
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  width: 100%;
  max-width: 320px;
  margin-bottom: 1.5rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.icon {
  position: absolute;
  left: 1rem;
  color: #999;
}

.input-field {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 8px;
}

.login-button {
  background-color: #2c5d7c;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
  background-color: #1f4560;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-form-container,
  .image-container {
    flex: none;
  }

  .login-form-container {
    height: 60vh;
  }

  .image-container {
    height: 40vh;
  }
}
</style>
