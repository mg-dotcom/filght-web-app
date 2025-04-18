import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Management from "@/views/management/Management.vue";
import ManagementSeat from "@/views/management/ManagementSeat.vue";
import ManagementAirline from "@/views/management/ManagementAirline.vue";
import ManagementFlight from "@/views/management/ManagementFlight.vue";
import ManagementMenu from "@/views/management/ManagementMenu.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/management",
      name: "management",
      component: Management,
      children: [
        {
          path: "menu",
          name: "management-menu",
          component: ManagementMenu,
        },
        {
          path: "seat",
          name: "management-seat",
          component: ManagementSeat,
        },
        {
          path: "airline",
          name: "management-airline",
          component: ManagementAirline,
        },
        {
          path: "flight",
          name: "management-flight",
          component: ManagementFlight,
        },
      ],
    },
  ],
});

export default router;
