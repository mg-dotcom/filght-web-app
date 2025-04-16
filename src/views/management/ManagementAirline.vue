<script setup>
import { airlines } from "@/data/management-airline.js";
</script>

<template>
  <div class="management-airline">
    <div class="airline-cards">
      <div
        v-for="(airline, index) in airlines"
        :key="index"
        class="airline-card"
      >
        <!-- SECTION 1: Header -->
        <div class="card-section logo-section" style="grid-area: logo">
          <div class="airline-logo">
            <img
              src="/management-pic/management-airline/airplane-header-icon.png"
              alt="Airline Logo"
            />
          </div>
        </div>

        <div class="card-section title-section" style="grid-area: title">
          <div class="airline-title">
            <h3>{{ airline.name }}</h3>
            <p>#{{ airline.id }}</p>
          </div>
        </div>

        <div class="card-section status-section" style="grid-area: status">
          <div class="airline-status">
            <span
              :class="{
                'status-active': airline.status === 'Active',
                'status-closed': airline.status === 'Temporarily Closed',
              }"
            >
              {{ airline.status }}
            </span>
          </div>
        </div>

        <!-- Blank space in the grid -->
        <div class="blank-space" style="grid-area: blank-space"></div>

        <!-- SECTION 2: Main Content -->
        <div class="card-section airline-main-content" style="grid-area: main">
          <div class="info-grid">
            <div class="info-item">
              <p class="info-label">Name</p>
              <p class="info-value">{{ airline.name.split(" ")[0] }}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Country</p>
              <p class="info-value">{{ airline.country }}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Code</p>
              <p class="info-value">{{ airline.code }}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Contact</p>
              <p class="info-value">{{ airline.contact }}</p>
            </div>

            <div class="info-item info-item-hq">
              <p class="info-label">Headquarters</p>
              <p class="info-value">{{ airline.headquarters }}</p>
            </div>
          </div>
        </div>

        <!-- SECTION 3: Icon Area -->
        <div class="card-section airline-icon-section" style="grid-area: icon">
          <div class="airline-plane-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.management-airline {
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
}

.airline-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.airline-card {
  display: grid;
  grid-template-columns: 100px 1fr 120px;
  grid-template-rows: auto auto;
  grid-template-areas:
    "logo title status"
    "blank-space main icon";
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Common section styling */
.card-section {
  position: relative;
}

/* Blank space styling */
.blank-space {
  background-color: white;
}

/* SECTION 1: Header styling */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffaf40;
  height: 60px;
}

.title-section {
  display: flex;
  align-items: center;
  background-color: #ffaf40;
  height: 60px;
  color: white;
}

.status-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
  background-color: #ffaf40;
  height: 60px;
}

.airline-logo {
  border: 3px solid white;
  background-color: #ffaf40;
  border-radius: 50%;
  position: relative;
  bottom: -12px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  z-index: 2;
}

.airline-logo img {
  width: 45px;
  height: 45px;
}

.airline-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.airline-title h3 {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.airline-title p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.airline-status {
  background-color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  color: #2c9e6a;
}

.status-closed {
  color: #e74c3c;
}

/* SECTION 2: Main Content styling */
.airline-main-content {
  padding: 25px 15px 15px 15px;
  background-color: white;
  position: relative;
  z-index: 1;
  min-height: 120px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 25px;
}

.info-item {
  margin-bottom: 5px;
}

.info-item-hq {
  grid-column: 1 / span 2;
}

.info-label {
  color: #8c8c8c;
  font-size: 12px;
  margin: 0 0 5px 0;
}

.info-value {
  font-size: 14px;
  margin: 0;
  font-weight: 500;
}

/* SECTION 3: Icon Area styling */
.airline-icon-section {
  position: relative;
  background-color: white;
  border-left: 1px dashed #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.airline-plane-icon {
  width: 80px;
  height: 80px;
  background-color: #f0f0f4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.airline-plane-icon svg {
  width: 40px;
  height: 40px;
  color: #8c8c8c;
}

@media (max-width: 768px) {
  .airline-card {
    grid-template-columns: 80px 1fr 100px;
    grid-template-areas:
      "logo title status"
      "blank-space main main";
  }

  .airline-main-content {
    padding-right: 15px;
  }

  .airline-icon-section {
    display: none;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .info-item-hq {
    grid-column: 1;
  }
}
</style>
