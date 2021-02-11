<template>
  <div class="result container container-md container-lg container-xl mt-3 mt-md-5 mb-3 mb-md-5">
    <h2>共 <span class="font-weight-bold">{{items.actArraysLength}}</span> 潛:</h2>
    <div class="row">
      <div class="col-12 col-md-8">
          <activities/>
      </div>

      <div class="col-12 col-md-4">
        <div class="d-flex flex-column justify-content-between">
          <user-info/>
          <calculator/>
          
          <!-- <ul class="pl-0">
            <li class="d-flex justify-content-between text-dark align-items-center">
              <p>車馬費小計</p>
              <p>NT$ {{items.totalFee}}</p>
            </li>
            <li class="d-flex justify-content-between text-dark align-items-center">
              <h3 class="font-weight-bold h5-lg h4-md">總金額</h3>
              <h3 class="font-weight-bold h5-lg h4-md">NT {{items.totalFee}}</h3>
            </li>
          </ul> -->
        </div>
          <button class="btn btn-primary w-100">下一步</button>
      </div>

    </div>
  </div>
   
</template>

<script>
  import {computed, reactive, provide, onUpdated} from 'vue';
  import {useStore} from 'vuex';
  import activities from '../components/activities';
  import userInfo from '../components/userInfo';
  import calculator from '../components/calculator'
  export default {
    setup(){
      const store = useStore();

      const items = reactive({
        cartIndexArr: computed(() => store.state.profile.cartIndexArr),
        actArraysLength: computed(() => Object.keys(store.state.profile.cartIndexArr).length),
        totalFee: 0,
        sourceActArr: computed(() => {
          let result = [];
          for(let keyinObj in store.state.profile.cartIndexArr){
            result.push(store.state.userActObj[keyinObj]);
          }
          return result;
        }),
      });

      onUpdated(()=>{
        for(let keyValue of items.cartIndexArr){
          let v1 = parseInt(keyValue.details.fee);
          if(!v1){
            v1=0;
          }
          items.totalFee = (v1 + parseInt(items.totalFee))
        }

      });

      provide('index', items.index);
      provide('isDetails', false);
      // provide('sourceActArr', items.sourceActArr);
      provide('sourceActArr', items.sourceActArr);
      // provide('profile', store.state.profile);


      return{
        items,
        // contactInfo,
        // fbProfile,
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
  /* .buyer-info{
    background-color:rgb(35,212,240,0.1);
  }
  .buyer-info .contact-info ul{
    margin: 0 !important;
  } */
</style>
