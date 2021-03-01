<template>
  <div class="to-top-btn-wrapper">
    <transition name="fade">
      <b-icon
        v-scroll-to="'#app'"
        icon="arrow-up-circle-fill"
        v-if="is_scroll"
        class="to-top-btn"
        :font-scale="3"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "scrollToTop",
  data() {
    return {
      is_scroll: false,
    };
  },
  methods: {
    check_scroll: function () {
      if (window.pageYOffset > 0) {
        this.is_scroll = true;
      } else {
        this.is_scroll = false;
      }
    },
  },
  mounted: function () {
    window.addEventListener("scroll", this.check_scroll);
  },
  destoryed: function () {
    window.removeEventListener("scroll", this.check_scroll);
  },
};
</script>

<style scoped>
.to-top-btn-wrapper {
  position: sticky;
  bottom: 10px;
  display: flex;
  justify-content: flex-end;
}

.to-top-btn:hover {
  cursor: pointer;
}

.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>