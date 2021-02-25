<template>
  <div class="cart-page result container container-md container-lg container-xl mt-3 mt-md-5 mb-2 mb-md-4">
    <h2>共 <span class="font-weight-bold">{{items.actArraysLength}}</span> 潛:</h2>
    <div class="row">
      <div class="col-12 col-md-8 mb-4 mb-md-0">
          <activities :sourceActArr="items.sourceActArr"/>
      </div>

      <div class="col-12 col-md-4">
        <div class="mb-1 mb-md-3">
          <div class="user-info-container d-flex flex-column justify-content-between shadow rounded mb-3 mb-md-3 mb-xl-5 p-2 p-lg-1 p-xl-2">
            <user-info/>
          </div>
          <calculator/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="row justify-content-between">
          <div class="col-4">
            <button class="cart-route-btn btn btn-outline-primary w-100" @click="backward">返回</button>
          </div>
          <div class="col-4">
            <button class="cart-route-btn btn btn-primary w-100"
              :class="{disabled: !items.isLogin}"  
              @click="submitOrder">
              送出
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {computed, reactive, provide} from 'vue';
  import {useStore} from 'vuex';
  import {useRouter} from 'vue-router';
  import activities from '../components/activities';
  import userInfo from '../components/userInfo';
  import calculator from '../components/calculator'
  export default {
    setup(){
      const store = useStore();
      const router = useRouter();

      const items = reactive({
        totalFee: 0,
        isLogin: isNaN(store.state.profile.loginTime),
        actArraysLength: computed(() => {
          let n = (()=>{
            for(let key in store.state.profile.cartKeyObj){
              return true;
            }
              return false;
          })();

          if(n){
            return Object.keys(store.state.profile.cartKeyObj).length
          }else{
            return 0;
          }
        }),

        sourceActArr: computed(() => {
          let result = [];
          for(let keyinObj in store.state.profile.cartKeyObj){
            result.push(store.state.userActObj[keyinObj]);
          }
          return result;
        }),
      });

      const backward = ()=>{
        router.go(-1);
      }

      const submitOrder = ()=>{
        if(items.isLogin==true){
          let now = new Date();
          let orderID = Date.parse(now);
          store.state.profile.order[orderID] = JSON.parse(JSON.stringify(store.state.profile.cartKeyObj));
          store.dispatch('submitOrder');
          router.push({ path: '/result' });
        }else{
          window.alert('請先登入');
        }
      }

      provide('index', items.index);
      provide('isDetails', false);

      return{
        items,
        submitOrder,
        backward
      }
    },

    components:{
      activities,
      userInfo,
      calculator,
    }
  }
</script>

<style lang="scss">
  .cart-page .user-info-container{
      background-color:rgb(35,212,240,0.1);
  }
  .cart-page .user-info-container .contact-info ul{
      margin: 0 !important;
  }

  // .cart-page .cart-route-btn{
  //   width: 350px;
  //   @media(max-width: ){
  //     width: 
  //   }
  // }
</style>
