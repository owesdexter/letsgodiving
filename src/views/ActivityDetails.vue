<template>
  <h1 class="text-primary mb-3 h2-md">{{items.sourceActObj.details.title}}</h1>
  <h2 class="mb-2 mb-md-3 h3-md">主辦人</h2>
  <div class="host-profile-box d-flex p-2 p-md-3 mb-4 mb-md-5">
    <fb-profile/>
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
  import contactInfo from '../components/contactInfo';
  import fbProfile from "../components/fbProfile"
  export default {
    props:{
      
    },
    setup(){
      const store = useStore();
      const route = useRoute();
      const actID = route.params.actID;
      
      const items = reactive({
        sourceActObj: store.state.userActObj[actID],
        isLogin: isNaN(store.state.profile.loginTime),
      })

      provide('isDetails', true);
      provide('actID', actID);
      provide('sourceActObj', items.sourceActObj);
      provide('profile', items.sourceActObj.host);



      return{
        items,
      }

    },
    components:{
      actDetails,
      contactInfo,
      fbProfile,
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