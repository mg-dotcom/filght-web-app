import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Management from "@/views/management/Management.vue";
import ManagementSeat from "@/views/management/ManagementSeat.vue";
import ManagementAirline from "@/views/management/ManagementAirline.vue";
import ManagementFlight from "@/views/management/ManagementFlight.vue";
import ManagementMenu from "@/views/management/ManagementMenu.vue";
import ManagementPassenger from "@/views/management/ManagementPassenger.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { layout: false },
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
          path: "airline",
          name: "management-airline",
          component: ManagementAirline,
        },
        {
          path: ":airlineID/flight",
          name: "management-flight",
          component: ManagementFlight,
        },
        {
          path: ":airlineID/flight/:flightID/seat",
          name: "management-seat",
          component: ManagementSeat,
        },
        {
          path: ":airlineID/flight/:flightID/passenger",
          name: "management-passenger",
          component: ManagementPassenger,
        },
      ],
    },
  ],
});

export default router;
