<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- Footer在Home、Search显示的，在登录、注册时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>