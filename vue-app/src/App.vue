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
html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}
body {
  font-size: 1.6rem;
  letter-spacing: 0.05em;
}

* {
  padding: 0;
  margin: 0;
}

a,
p,
li,
label,
input[type="text"],
input[type="search"] {
  font-size: 1.6rem;
}

p {
  padding-left: 1.5em;
}

#app {
  font-family: ten-mincho, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  min-height: 100vh;
  padding-bottom: 12.8rem;
  position: relative;
}

.container {
  text-align: left;
  max-width: 120rem;
}

.custom-select,
.btn {
  font-size: 1.6rem !important;
}
</style>
