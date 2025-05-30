<script setup>
import ModalAddAirline from "@/components/management-airline/ModalAddAirline.vue";
import { useAirlineStore } from "@/stores/airlineStore";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const airlineStore = useAirlineStore();
const router = useRouter();
const isShowModalAddAirline = ref(false);

onMounted(() => {
  airlineStore.loadAirlines();
  airlineStore.setSearchQuery("");
});

const addAirline = (newAirline) => {
  airlineStore.addAirline(newAirline);
  isShowModalAddAirline.value = false;
};

const showModalAddAirline = () => {
  isShowModalAddAirline.value = true;
};

const handleSearch = (event) => {
  airlineStore.setSearchQuery(event.target.value);
};
</script>

<template>
  <div class="management-airline">
    <header class="management-header">
      <div class="header-left">Airline management</div>
      <div class="header-right">
        <div class="controls">
          <div class="search-container">
            <div class="search-icon">
              <img src="/search-input.svg" alt="Searc Input Icon" />
            </div>
            <input
              type="text"
              placeholder="Search Admin"
              class="search-input"
              @input="handleSearch"
            />
          </div>

          <div class="status-selector">
            <button class="status-button" @click="showModalAddAirline">
              Add +
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="airline-cards">
      <div
        v-for="(airline, index) in airlineStore.getAllAirlines"
        :key="index"
        class="airline-card"
        :style="{
          backgroundColor: airline.airlineColor,
        }"
      >
        <!-- SECTION 1: Header -->
        <div class="card-section logo-section" style="grid-area: logo">
          <div class="airline-logo">
            <div
              class="pic"
              :style="`background-image: url(${airline.airlineImage})`"
            ></div>
          </div>
        </div>

        <div class="card-section title-section" style="grid-area: title">
          <div
            class="airline-title"
            @click="
              router.push({
                name: 'management-flight',
                params: { airlineID: airline.airlineID },
              })
            "
          >
            <h3>{{ airline.name }}</h3>
            <p>#{{ airline.airlineID }}</p>
          </div>
        </div>

        <div class="card-section status-section" style="grid-area: status">
          <select
            class="airline-status"
            v-model="airline.airlineStatus"
            @change="
              airlineStore.updateAirlineStatus(
                airline.airlineID,
                airline.airlineStatus
              )
            "
          >
            <option value="open">Open</option>
            <option value="temporarily-closed">Temporarily Closed</option>
          </select>
        </div>

        <div class="blank-space" style="grid-area: blank-space"></div>

        <!-- SECTION 2: Main Content -->
        <div class="card-section airline-main-content" style="grid-area: main">
          <div class="info-grid">
            <div class="info-item">
              <p class="info-label">Name</p>
              <p class="info-value">{{ airline.name_short }}</p>
            </div>
            <div class="info-item">
              <p class="info-label">Code</p>
              <p class="info-value">{{ airline.code }}</p>
            </div>
            <div class="info-item info-item-hq">
              <p class="info-label">Headquarters</p>
              <p class="info-value">{{ airline.headquarters }}</p>
            </div>
            <div class="info-item">
              <p class="info-label">Country</p>
              <p class="info-value">{{ airline.country }}</p>
            </div>
            <div class="info-item">
              <p class="info-label">Contact</p>
              <p class="info-value">
                {{ airline.contactPrefix + " " + airline.contactNumber }}
              </p>
            </div>
          </div>
        </div>

        <!-- SECTION 3: Icon Area -->
        <div class="card-section airline-icon-section" style="grid-area: icon">
          <div class="airline-plane-icon">
            <img
              v-if="airline.airlineStatus === 'open'"
              src="/management-pic/management-airline/airplane-active-icon.png"
              alt="Open Airline"
            />
            <div v-else-if="airline.airlineStatus === 'temporarily-closed'">
              <div class="status-closed">
                <p>Temporarily Close</p>
              </div>
              <img
                src="/management-pic/management-airline/airplane-inactive-icon.png"
                alt="Temporarily Closed Airline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalAddAirline
    :isShowModalAddAirline="isShowModalAddAirline"
    @close="isShowModalAddAirline = false"
    @addAirline="addAirline"
  ></ModalAddAirline>
</template>

<style scoped>
.management-airline {
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
}

/* ส่วนของ airline card */
.airline-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.airline-card {
  display: grid;
  grid-template-columns: 135px 1fr 200px;
  grid-template-rows: auto auto;
  grid-template-areas:
    "logo title status"
    "blank-space main icon";
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

/* ส่วนของ common section */
.card-section {
  position: relative;
}

.title-section {
  border-right: 3px dashed var(--c-soft-blue);
}

.title-section::after {
  content: "";
  position: absolute;
  top: -12px;
  right: -14px;
  width: 25px;
  height: 25px;
  background-color: var(--c-soft-blue);
  border-radius: 50%;
}

.blank-space {
  background-color: white;
}

.airline-main-content {
  border-right: 3px dashed var(--c-soft-blue);
  position: relative;
}

/* ส่วนของ SECTION 1: Header styling */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.title-section {
  display: flex;
  align-items: center;
  height: 60px;
  color: white;
}

.status-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.airline-logo {
  border-radius: 50%;
  position: relative;
  bottom: -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: 3px solid white;
  overflow: hidden;
  flex-shrink: 0;
  z-index: 2;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.airline-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.airline-title:hover {
  color: #dfe0e1; /* A bit gray color */
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease, text-decoration 0.3s ease;
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
  border: 1px solid var(--c-navy-light);
  border-radius: 8px;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-navy);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.airline-status:hover {
  border-color: var(--c-navy);
  box-shadow: 0 4px 8px rgba(57, 116, 153, 0.2);
}

.airline-status:focus {
  outline: none;
  border-color: var(--c-navy);
  box-shadow: 0 0 5px rgba(57, 116, 153, 0.3);
}

.airline-status option {
  font-size: 14px;
  color: var(--c-navy);
  background-color: white;
}

/* ส่วนของ SECTION 2: Main Content styling */
.airline-main-content {
  padding: 15px 0;
  background-color: white;
  position: relative;
  z-index: 1;
  min-height: 120px;
}

.airline-main-content::after {
  content: "";
  position: absolute;
  bottom: -12px;
  right: -14px;
  width: 25px;
  height: 25px;
  background-color: var(--c-soft-blue);
  border-radius: 50%;
}

.info-item-hq {
  grid-column: 3;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px 25px;
  max-width: 700px; /* ปรับค่านี้ตามที่ต้องการ */
}

.info-item {
  margin-bottom: 5px;
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

/* ส่วนของ SECTION 3: Icon Area styling */
.airline-icon-section {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.airline-plane-icon {
  padding: 20px;
  background-color: #f0f0f4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.status-closed {
  background-color: var(--c-blue-tint);
  padding: 5px 10px;
  position: absolute;
  border-radius: 8px;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  white-space: nowrap;
}

.status-closed p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
}

.airline-plane-icon img {
  width: 60px;
  height: 60px;
  color: #8c8c8c;
}

/* Control Section - Search and Buttons */

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 10px;
  width: 100%;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-left {
  flex: 1;
  font-size: 2.5rem;
  font-weight: 600;
}

.header-right {
  justify-content: flex-end;
}
.controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

/* Search Input Styling */
.search-container {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid var(--c-navy-light);
  border-radius: 24px;
  font-size: 14px;
}

.search-input::placeholder {
  color: var(--c-navy-light);
  opacity: 0.5;
}

.search-input:focus {
  outline: none;
  border-color: var(--c-navy);
  box-shadow: 0 0 5px rgba(57, 116, 153, 0.3);
  transition: all 0.3s ease;
}

/* Status Selector Button */
.status-selector {
  position: relative;
}

.status-button {
  padding: 10px 25px;
  border: 1px solid var(--c-navy-light);
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: var(--c-navy-light);
  transition: all 0.3s ease;
  font-weight: 500;
}

.status-button:hover {
  background-color: var(--c-navy-light);
  color: white;
}

@media (max-width: 768px) {
  .airline-card {
    grid-template-columns: 80px 1fr 100px;
    grid-template-areas:
      "logo title status"
      "blank-space main main";
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
