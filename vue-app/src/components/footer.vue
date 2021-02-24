<template>
  <div class="footer-wrapper">
    <footer class="page-footer bg-warning">
      <p>©2021 Kuniyuki Funasaka</p>
      <p>
        Powered by
        <a href="http://webservice.recruit.co.jp/"
          >ホットペッパー Webサービス</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "myfooter",
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

footer {
  width: 100%;
  padding: 1rem 0;
  position: absolute;
  bottom: 0;
}
p {
  margin: 1rem auto;
  padding: 0;
}
</style>