<template>
  <div v-if="is_loading">
    <img src="../assets/images/loading.gif" />&nbsp;<span v-text="text"></span>
  </div>
</template>

<script>
export default {
  name: "myLoading",
  props: ["text", "is_loading"],
};
</script>

<style scoped>
span {
  font-size: 1.6rem;
}
</style>