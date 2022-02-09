import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/therapists',
    name: 'Therapists',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Therapists.vue'),
  },
  {
    path: '/therapist-appointments',
    name: 'Therapist define appointment slots',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/TherapistAppointments.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? '/' : '/frontend/',
  routes,
});

export default router;
