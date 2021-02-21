<template>
  <div class="cart-page result container container-md container-lg container-xl mt-3 mt-md-5 mb-3 mb-md-5">
    <h2>共 <span class="font-weight-bold">{{items.actArraysLength}}</span> 潛:</h2>
    <div class="row">
      <div class="col-12 col-md-8">
          <activities :sourceActArr="items.sourceActArr"/>
      </div>

      <div class="col-12 col-md-4">
        <div class="user-info-container d-flex flex-column justify-content-between shadow rounded mb-3 mb-md-4 p-2 p-lg-1 p-xl-2">
          <user-info/>
        </div>
        <calculator/>
        <button class="btn btn-primary w-100">送出</button>
      </div>
      
    </div>
  </div>
</template>

<script>
  import {computed, reactive, provide} from 'vue';
  import {useStore} from 'vuex';
  import activities from '../components/activities';
  import userInfo from '../components/userInfo';
  import calculator from '../components/calculator'
  export default {
    setup(){
      const store = useStore();

      const items = reactive({
        actArraysLength: computed(() => Object.keys(store.state.profile.cartKeyObj).length),
        totalFee: 0,
        sourceActArr: computed(() => {
          let result = [];
          for(let keyinObj in store.state.profile.cartKeyObj){
            result.push(store.state.userActObj[keyinObj]);
          }
          return result;
        }),
      });

      provide('index', items.index);
      provide('isDetails', false);

      return{
        items,
      }
    },

    components:{
      activities,
      userInfo,
      calculator,
    }
  }
</script>

<style>
  .cart-page .user-info-container{
      background-color:rgb(35,212,240,0.1);
  }
  .cart-page .user-info-container .contact-info ul{
      margin: 0 !important;
  }
</style>
