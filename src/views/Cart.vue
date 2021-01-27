<template>
  <div class="result container container-md container-lg container-xl mt-3 mt-md-5 mb-3 mb-md-5">
    <h2>共 <span class="font-weight-bold">{{items.actArraysLength}}</span> 潛:</h2>
    <div class="row">
      <div class="col-12 col-md-8">
        <activities/>
      </div>

      <div class="col-12 col-md-4">
        <form class="d-flex flex-column justify-content-between">
          <div class="buyer-info shadow rounded mb-3 mb-md-4 p-2 p-lg-1 p-xl-2">
            <host-fb-profile  class="d-flex flex-column align-items-center"/>
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
  import hostFbProfile from'../components/hostFbProfile';
  import contactInfo from '../components/contactInfo';
  import activities from '../components/activities';
  export default {
    setup(){
      const store = useStore();
      const items = reactive({
        sourceActArr: computed(() => store.state.profile.cartArr),
        actArraysLength: computed(() => store.state.profile.cartArr.length),
        profile: computed(() =>store.state.profile),
        index: 0,
        totalFee: 0,
      })

      const isRight = (i) => i % 2;

      onMounted(()=>{
        // var i =1;
        for(let act of items.sourceActArr){
          let v1 = parseInt(act.details.fee);
          if(!v1){
            v1=0;
          }
          items.totalFee = (v1+parseInt(items.totalFee))
        }
      });

      provide('index', items.index);
      provide('sourceActArr', items.sourceActArr)

      return{
        activities,
        contactInfo,
        isRight,
        items,
        hostFbProfile,
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
