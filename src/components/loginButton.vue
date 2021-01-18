<template>
    <button 
      class="btn btn-outline-light btn-login rounded-pill" 
      id="login-btn" 
      @click="fbLogin" 
    >{{loginProps.loginButtonText}}</button>
    
</template>

<script>
  import {computed, reactive, onMounted} from 'vue'
  import '../assets/FBSdk.js';
  import FB_SDK from '../assets/FBSdk.js';
  import{useStore} from 'vuex';

  
  export default{
    setup(){
      const store = useStore();

      const loginProps = reactive({
        loginStatus: computed(() => {
          console.log('btn status computed');
            return store.state.profile.loginStatus
          }),
        loginButtonText: computed(() => {
          console.log('btn text computed')
          if(store.state.profile.loginStatus==true){
            return 'LOGOUT'
          }else{
            return 'LOGIN'
          }
        })
      }) 

      onMounted(()=>{
        console.log('Login status when btn is Mounted: '+store.state.profile.loginStatus)
        if(store.state.profile.loginStatus==true){
          loginProps.loginStatus = true;
          loginProps.loginButtonText = 'LOGOUT';
        }else{
          loginProps.loginStatus = false;
          loginProps.loginButtonText = 'LOGIN';
        }
      })

      async function fbLogin(){
        console.log('btn has been triggered')
        console.log(store.state.profile.loginStatus)

        if(store.state.profile.loginStatus==true){
          console.log('start logout');
          let profile = await FB_SDK.FBlogout();
          await store.commit('storeProfile', profile);
          window.location.reload();
          store.commit('cleanCart');
          store.commit('updateActDisplay')
          // console.log('btn:' + loginProps.loginStatus)
          // console.log('store:' + store.state.profile.loginStatus);

        }else{
          console.log('start login');
          let profile = await FB_SDK.FBlogin();
          await store.commit('storeProfile', profile);
          window.location.reload();
          // console.log('btn:' + loginProps.loginStatus)
          // console.log('store:' + store.state.profile.loginStatus);
        }
      }

      return{
        loginProps,
        fbLogin,
      }

    }
  }
</script>

<style>

</style>
  