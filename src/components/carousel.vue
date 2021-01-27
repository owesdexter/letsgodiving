<template>
  <swiper
    :slides-per-view="1"
    :space-between="50">

    <!-- Slides -->
    <swiper-slide 
    style="width: 100%"
    v-for="(sourceArr, index) in slides.sourceArr" :key="index">
    <div>
        <figure class="w-100 position-relative">
          <img :src="sourceArr.imgURL" class="card-img d-block w-100 object-fit-cover object-position-center">
        </figure>
        <div class="card-text-box pr-3 pb-3 pb-md-2">
            <h2 class="text-h4 text-white text-right">{{sourceArr.title}}</h2>
            <p class="d-none d-md-block text-white text-right">{{sourceArr.disc}}</p>
        </div>
    </div>
    </swiper-slide>

  </swiper>
</template>

<script>
import {reactive} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/swiper.scss';
  import 'swiper/components/navigation/navigation.scss';
  import 'swiper/components/pagination/pagination.scss';
  import 'swiper/components/scrollbar/scrollbar.scss';
export default{
    
    setup(){
        const slides = reactive({
          sourceArr:[
            {
                title: '北部',
                disc: '潮境公園、鼻頭角、望海巷',
                imgURL: require('@/assets/imgs/North.png'),
            },
            {
                title: '中部',
                disc: '潛立方',
                imgURL: require('@/assets/imgs/Middle.png'),
            },
            {
                title: '南部',
                disc: '墾丁萬里桐、墾丁香蕉灣、墾丁出水口',
                imgURL: require('@/assets/imgs/South.png'),
            },
            {
                title: '東部',
                disc: '小野柳、三仙台、石梯坪',
                imgURL: require('@/assets/imgs/East.png'),
            },
            {
                title: '澎湖',
                disc: '薰衣草森林',
                imgURL: require('@/assets/imgs/Penghu.png'),
            },
            {
                title: '綠島',
                disc: '石朗、柴口、公館港、藍洞',
                imgURL: require('@/assets/imgs/Lyudao.png'),
            },
            {
                title: '蘭嶼',
                disc: '母雞岩、八代灣沈船、東清、潮池',
                imgURL: require('@/assets/imgs/Lanyu.png'),
            },
            {
                title: '小琉球',
                disc: '美人洞、厚石群礁、衫福沈船、大福漁港',
                imgURL: require('@/assets/imgs/Xiaoliuqiu.png'),
            },   
          ]
        })

        return{
          slides,
          Swiper,
          SwiperSlide,
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
}

</script>

<style lang="scss" scoped>
.swiper-container {
  width: 600px;
  height: 300px;
  @media (max-width: 576px){
    width: 100%;
    height: auto;
  }
}

.card-text-box{
  position: absolute;
  right:0;
  bottom:0;
}

</style>