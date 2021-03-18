<template>
  <div :class="{ fadeIn: visible, hidden: !visible }" v-scroll="fadeIn">
    <a class="shop_img" :href="shop_data.urls.pc">
      <img :src="shop_data.photo.pc.l" alt="" />
    </a>
    <a class="shop_link" :href="shop_data.urls.pc">
      {{ shop_data.name }}
    </a>
    <span class="shop_info_head">カテゴリ</span>
    <span class="shop_info_content">
      {{ shop_data.genre.name }}
    </span>
    <span class="shop_info_head">予算</span>
    <span class="shop_info_content">
      {{ shop_data.budget.name }}
    </span>
    <span class="shop_info_head">最大人数</span>
    <span class="shop_info_content"> {{ shop_data.party_capacity }}人 </span>
    <span class="shop_info_head">コース</span>
    <span class="shop_info_content">
      <span
        class="course-info bg-warning"
        v-show="shop_data.free_drink.match(/あり/)"
      >
        飲み放題有
      </span>
      <span
        class="course-info bg-warning"
        variant="warning"
        v-show="shop_data.free_food.match(/あり/)"
        >食べ放題有</span
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "shopInfo",
  props: ["shop_data"],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    fadeIn: function () {
      if (!this.visible) {
        let top = this.$el.getBoundingClientRect().top;
        this.visible = top < window.innerHeight - 100;
      }
    },
  },
  mounted: function () {
    this.fadeIn();
  },
};
</script>

<style scoped>
.hidden {
  opacity: 0;
}

.fadeIn {
  transition: 0.5s;
  opacity: 1;
}

.shop_img {
  min-height: 24rem;
  grid-column: 1/4;
}

.shop_img img {
  border-radius: 5%;
  filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.3));
  transition: 0.2s;
}

.shop_img img:hover {
  transform: scale(1.05, 1.05);
}

.shop_link {
  grid-column: 1/4;
  margin-top: 1rem;
}

.shop_info_head {
  grid-column: 2/3;
  text-align: left;
}
.shop_info_content {
  text-align: left;
}

.course-info {
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border-radius: 3px;
  font-size: 1.2rem;
}
.course-info:hover {
  cursor: default;
}

@media screen and (max-width: 746px) {
  .shop_img {
    min-height: auto;
  }
}
</style>