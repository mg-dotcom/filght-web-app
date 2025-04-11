<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="app-container">
    <Sidebar class="sidebar" />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;
  padding: 20px;
  color: var(--c-light-navy);
  overflow-y: auto;
}
</style>
