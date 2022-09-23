<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      immediate: true, //和floor组件保持一致
      // 就算数据改变了会被立即监视到，但此时v-for还没完成，所以还是不能new实例
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>
