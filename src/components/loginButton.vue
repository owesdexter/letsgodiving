<template>
    <button 
      class="btn btn-outline-light btn-login rounded-pill" 
      id="login-btn" 
      @click="fbLogin" 
    >{{loginProps.loginButtonText}}</button>
    
</template>

<script>
  import {computed, reactive} from 'vue'
  import '../assets/FBSdk.js';
  import FB_SDK from '../assets/FBSdk.js';
  import{useStore} from 'vuex';

  
  export default{
    setup(){
      const store = useStore();

      const loginProps = reactive({
        loginStatus: computed(() => {
            return store.state.profile.loginStatus
          }),
        loginButtonText: computed(() => {
          if(store.state.profile.loginStatus==true){
            return 'LOGOUT'
          }else{
            return 'LOGIN'
          }
        })
      }) 

      async function fbLogin(){
        if(store.state.profile.loginStatus==true){
          console.log('start logout');
          let profile = await FB_SDK.FBlogout();
          await store.commit('storeProfile', profile);
          store.commit('updateActDisplay')
          await store.commit('cleanCart');
          document.location.reload();

        }else{
          console.log('start login');
          let profile = await FB_SDK.FBlogin();
          await store.commit('storeProfile', profile);
          await store.commit('updateActDisplay')
          document.location.reload();
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
  