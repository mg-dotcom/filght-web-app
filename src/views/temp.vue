<script setup></script>

<template>
  <!-- Main Content Area -->
  <div class="main-content">
    <!-- Bookings Section -->
    <div class="bookings-section">
      <div class="section-header">
        <h2>All Bookings</h2>
        <p>Overview of Recent Reservation</p>
        <button class="more-btn">MORE</button>
      </div>

      <div class="bookings-list">
        <div
          v-for="(booking, index) in bookings"
          :key="index"
          class="booking-item"
        >
          <div class="booking-airline">
            <span>{{ booking.airline }}</span>
            <div class="booking-details">
              <span class="date">{{ booking.date }}</span>
              <span class="seats">{{ booking.seats }}</span>
            </div>
          </div>

          <div class="flight-path">
            <div class="departure">
              <div class="time">{{ booking.departure.time }}</div>
              <div class="airport">{{ booking.departure.airport }}</div>
            </div>

            <div class="flight-line">
              <div class="dot"></div>
              <div class="line"></div>
              <div class="dot"></div>
              <div class="stops">{{ booking.stops }}</div>
            </div>

            <div class="arrival">
              <div class="time">{{ booking.arrival.time }}</div>
              <div class="airport">{{ booking.arrival.airport }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reservation Summary -->
    <div class="reservation-summary">
      <h2>Reservation Summary</h2>
      <div class="summary-header">
        <div>Now</div>
        <div class="ticket-sold">4,545 <span>Ticket Sold</span></div>
      </div>
      <div class="chart-placeholder"></div>
    </div>
  </div>

  <!-- Charts Section -->
  <div class="charts-section">
    <!-- Popular Airlines Chart -->
    <div class="airlines-chart">
      <h2>Popular Airlines</h2>
      <div class="chart-placeholder circular"></div>
      <div class="airlines-legend">
        <div
          v-for="(airline, index) in airlines"
          :key="index"
          class="legend-item"
        >
          <div
            class="color-box"
            :style="{ backgroundColor: airline.color }"
          ></div>
          <div class="airline-name">{{ airline.name }}</div>
          <div class="airline-percentage">{{ airline.percentage }}%</div>
        </div>
      </div>
    </div>

    <!-- Flights Schedule Chart -->
    <div class="schedule-chart">
      <h2>Flights Schedule</h2>
      <div class="chart-types">
        <div class="chart-type domestic">Domestic</div>
        <div class="chart-type international">International</div>
      </div>
      <div class="chart-placeholder"></div>
    </div>
  </div>
</template>

<style scoped></style>
