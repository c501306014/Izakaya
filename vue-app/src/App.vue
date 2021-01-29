<template>
  <div id="app">
    <myheader />
    <router-view />
    <!-- <router-link to="/">Go To page1</router-link> -->
    <myfooter />
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
import myfooter from "@/components/footer.vue";

export default {
  name: "App",
  components: {
    myheader,
    myfooter,
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
