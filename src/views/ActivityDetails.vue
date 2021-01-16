<template>
  <h1 class="text-primary mb-3 h2-md">{{items.activity.details.title}}</h1>
  <h2 class="mb-2 mb-md-3 h3-md">主辦人</h2>
  <div class="host-profile-box d-flex p-2 p-md-3 mb-4 mb-md-5">
    <div>
      <img :src="`${items.activity.host.userPicURL}`" class="host-img text-center d-block mb-2" >
      <p class="text-center text-lg-m text-h5">{{items.activity.host.name}}</p>
    </div>
    <contact-info/>
    <!-- <div class="contact-info w-100">
      <ul class="pl-0 ml-3 ml-md-4 ml-xl-5">
        <li class="mb-2 mb-md-3 h6-md text-lg-m text-h5">PADI freediver</li>
        <li class="mb-2 mb-md-3 text-lg-m text-h5"><a href="tel:+886928039477" class="text-lg-m text-h5">+886 928039477</a></li>
        <li class="mb-2 text-lg-m text-h5"><a href="mailto:owesdexter2011@gmail" class="text-lg-m text-h5">owesdexter2011@gmail.com</a></li>
      </ul>
      <ul class="socail-media d-flex justify-content-end pl-0">
        <li><a :href="`${items.activity.host.link}`"><i class="fab fa-facebook icons"></i></a></li>
        <li class="ml-2 ml-md-3 ml-xl-4"><a href="https://www.instagram.com/owesdexter2011/"><i class="fab fa-instagram icons"></i></a></li>
        <li class="ml-2 ml-md-3 ml-xl-4"><a href="#"><i class="fab fa-line icons"></i></a></li>
      </ul>
    </div> -->
  </div>
  <h2 class="mb-2 mb-md-3">活動資訊</h2>
  <act-details/>
  <!-- <div class="act-details-box d-flex flex-column flex-md-row justify-content-between p-2 p-md-3">
    <ul class="former-forth-details pl-0">
      <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">event_note</span>{{items.activity.details.date.start}} ~ {{items.activity.details.date.end}}</li>
      <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">map</span>{{items.activity.details.area}}</li>
      <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">perm_identity</span>{{items.activity.details.num}}</li>
      <li class="text-dark text-left text-lg-m text-h5 mb-3" ><span class="material-icons align-text-bottom h5-md text-h4">attach_money</span>{{items.activity.details.fee}}</li>
      <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4">room</span>{{items.activity.details.location}}</li>
    </ul>
    <div class="act-descpt-box mb-3 ml-0 ml-md-2 ml-xl-3">
      <span class="text-dark text-left ">{{items.activity.details.description}}</span>
    </div>
  </div> -->
  <div class="text-right mt-2">
    <!-- <button class="btn btn-link" :class="{disabled: items.isLogin}" @click="join">
      <span class="material-icons align-middle text-h3" :class="{'text-danger': items.isadded}">shopping_cart</span>
    </button> -->
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
        isAdded: store.state.actDisplay.isAdded,
      })

      provide('index',route.params.index)
      provide('isProvideAll', true)
      
      const join = ()=>{
        items.isadded = !items.isAdded;
        store.commit('storetoCart',index)
      }

      return{
        contactInfo,
        actDetails,
        join,
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