<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="login-container">
    <div class="login-form-container">
      <h1 class="login-title">LOGIN</h1>
      <p class="login-subtitle">How to i get started lorem ipsum dolor at?</p>

      <div class="form-group">
        <div class="input-with-icon">
          <span class="icon"
            ><svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 21H14V19C14 17.3431 12.6569 16 11 16H5C3.34315 16 2 17.3431 2 19V21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                fill="#1C1C1C"
              />
            </svg>
          </span>
          <input type="text" placeholder="Username" class="input-field" />
        </div>
      </div>

      <div class="form-group">
        <div class="input-with-icon">
          <span class="icon"
            ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"
                fill="#1C1C1C"
              />
            </svg>
          </span>
          <input type="password" placeholder="Password" class="input-field" />
        </div>
      </div>

      <button class="login-button" @click="router.push({ name: 'dashboard' })">
        Login Now
      </button>
    </div>

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

@media (max-width: 1200px) {
  .login-form-container {
    flex: 2;
  }
  .image-container {
    flex: 1;
  }
}

@media (max-width: 992px) {
  .login-form-container {
    flex: 3;
  }
  .image-container {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  .login-form-container {
    flex: 1;
    height: 100vh;
    width: 100%;
    padding: 1.5rem;
  }
  .image-container {
    display: none;
  }
}
</style>
