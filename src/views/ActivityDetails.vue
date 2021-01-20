<template>
  <h1 class="text-primary mb-3 h2-md">{{items.activity.details.title}}</h1>
  <h2 class="mb-2 mb-md-3 h3-md">主辦人</h2>
  <div class="host-profile-box d-flex p-2 p-md-3 mb-4 mb-md-5">
    <div>
      <img :src="`${items.activity.host.userPicURL}`" class="host-img text-center d-block mb-2" >
      <p class="text-center text-lg-m text-h5">{{items.activity.host.name}}</p>
    </div>
    <contact-info/>
  </div>
  
  <h2 class="mb-2 mb-md-3">活動資訊</h2>
  <act-details/>

  <div class="text-right mt-2">

    <router-link class="d-inline-block btn btn-outline-primary ml-1 ml-md-2" to="/result" tag="button">返回</router-link>
  </div>
</template>

<script>
  import {reactive, provide} from 'vue';
  import {useStore} from 'vuex';
  import {useRoute} from 'vue-router';
  import actDetails from '../components/actDetails'
  import contactInfo from '../components/contactInfo'
  export default {
    setup(){
      const store = useStore();
      const route = useRoute();
      const index = route.params.index;
      
      const items = reactive({
        activity: store.state.actDisplay[index],
        isLogin: store.state.profile.loginStatus,
      })

      provide('index',route.params.index)
      provide('isProvideAll', true)


      return{
        contactInfo,
        actDetails,
        items,
      }

    }
  }
</script>
<style scoped>
  .host-profile-box, .act-details-box{
    border-radius: 20px;
    background-color:rgb(35,212,240,0.1);
  }

  .act-descpt-box{
    max-width: 300px;
  }

  .icons{
    font-size: 2rem;
  }

  .former-forth-details{
    min-width: 250px;
  }

  @media (max-width: 768px){
    .icons{
      font-size: 24px;
    }
  }

</style>