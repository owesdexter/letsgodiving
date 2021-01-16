<template>
  <div class="result container container-md container-lg container-xl mt-3 mt-md-5 mb-3 mb-md-5">
    <h2>共 {{items.actArraysLength}} 潛:</h2>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="act-box d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center shadow bg-white rounded mb-2 mb-md-4 p-2 p-md-3" 
          :key="activity.index" v-for="(activity, index) in items.actResource" 
          :class="[isRight(index) ? 'right' : 'left']">

          <div class="d-flex p-3 p-md-4">
            <div class="host-photo text-center">
              <img :src="`${activity.host.userPicURL}`" class="host-img">
              <p>{{activity.host.name}}</p>
            </div>

            <ul class="act-details" >
              <h3 class="text-primary text-left mb-3">{{activity.details.title}}</h3>
              <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.start}} ~ {{activity.details.date.end}}</li>
              <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">map</span>{{activity.details.area}}</li>
              <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">perm_identity</span>{{activity.details.num}}</li>
            </ul>
          </div>
          <h2 class="font-weight-bold">NT$ {{activity.details.fee}}</h2>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <form class="d-flex flex-column justify-content-between">
          <div class="buyer-info shadow rounded mb-3 mb-md-4 p-2">
            <div class="d-flex flex-column align-items-center">
              <img :src="`${items.profile.userPicURL}`" class="host-img text-center d-block mb-2" >
              <p class="text-center text-lg-m text-h5">{{items.profile.name}}</p>
            </div>
            <contact-info />
          </div>
          <ul class="totalprice pl-0">
            <li class="d-flex justify-content-between text-dark align-items-center">
              <p>車馬費小計</p>
              <p>NT$ {{items.totalFee}}</p>
            </li>
            <li class="d-flex justify-content-between text-dark align-items-center">
              <h3 class="font-weight-bold">總金額</h3>
              <h3 class="font-weight-bold">NT {{items.totalFee}}</h3>
            </li>
          </ul>
        </form>
          <button class="btn btn-primary w-100">下一步</button>
        

      </div>
    </div>
  </div>
   
</template>

<script>
  import {computed, reactive, provide, onMounted} from 'vue'
  import {useStore} from 'vuex';
  import contactInfo from '../components/contactInfo';
  export default {
    setup(){
      const store = useStore();
      const items = reactive({
        actResource: computed(() => store.state.profile.cartArr),
        actArraysLength: computed(() => store.state.profile.cartArr.length),
        profile: computed(() =>store.state.profile),
        index: 0,
        totalFee: 0,
      })

      const isRight = (i) => i % 2;

      onMounted(()=>{
        // var v1 = parseInt(items.totalFee);
        for(let act of items.actResource){
          items.totalFee+=act.details.fee;
        }
        items.totalFee = parseInt(items.totalFee)
        console.log(items.totalFee)
      });

      provide('index',items.index);

      return{
        contactInfo,
        isRight,
        items,
      }
    },

  }
</script>

<style>
  .buyer-info{
    background-color:rgb(35,212,240,0.1);
  }
  .buyer-info .contact-info ul{
    margin: 0 !important;
  }
</style>
