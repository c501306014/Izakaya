<template>
  <div id="app">
    <div class="scroll-hint-top" v-show="is_scrollableUp"></div>
    <myheader />

    <router-view />

    <!-- <router-link to="/">Go To page1</router-link> -->

    <myfooter />
    <div class="scroll-hint-bottom" v-show="is_scrollableDown"></div>
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
  data() {
    return {
      is_scrollableUp: false,
      is_scrollableDown: false,
    };
  },
  methods: {
    check_scrollableUp: function () {
      if (pageYOffset > 0) {
        this.is_scrollableUp = true;
      } else {
        this.is_scrollableUp = false;
      }
    },
    check_scrollableDown: function () {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const pageMostBottom = scrollHeight - innerHeight;
      const scrollTop = pageYOffset || document.documentElement.scrollTop;
      if (scrollTop < pageMostBottom) {
        this.is_scrollableDown = true;
      } else {
        this.is_scrollableDown = false;
      }
    },
  },
  created() {
    addEventListener("scroll", this.check_scrollableUp);
    addEventListener("scroll", this.check_scrollableDown);
  },
  destoryed() {
    removeEventListener("scroll", this.check_scrollableUp);
    removeEventListener("scroll", this.check_scrollableDown);
  },
};
</script>

<style>
html {
  font-size: 62.5%;
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

.visible {
  opacity: 1;
}

.scroll-hint-top {
  position: fixed;
  top: 0;
  height: 24px;
  width: 100vw;
  background-color: white;
  background-size: 100% 50px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));

  background-repeat: no-repeat;
  z-index: 1;
}

.scroll-hint-bottom {
  position: fixed;
  bottom: 0;
  height: 24px;
  width: 100vw;
  background-color: white;

  background-size: 100% 50px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  background-repeat: no-repeat;
  z-index: 1;
}
</style>
