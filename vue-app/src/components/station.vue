<template>
  <b-form-group
    id="input-station"
    class="col-md-6"
    label="駅名"
    label-for="station-name"
  >
    <b-form-input
      id="station-name"
      v-model="localParam"
      type="text"
      placeholder="駅名を入力してください"
      required
    >
    </b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: "inputStation",
  props: {
    value: {
      type: String,
      requrired: true,
      default: "",
    },
  },
  computed: {
    localParam: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>