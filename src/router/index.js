import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Management from "@/views/management/Management.vue";
import ManagementSeat from "@/views/management/ManagementSeat.vue";

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
          path: "seat",
          name: "management-seat",
          component: ManagementSeat,
        },
      ],
    },
  ],
});

export default router;
