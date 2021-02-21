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
            return isNaN(store.state.profile.loginTime);
        }),
        loginButtonText: computed(() => {
          if(isNaN(store.state.profile.loginTime)){
            return 'LOGOUT'
          }else{
            return 'LOGIN'
          }
        })
      }) 

      async function fbLogin(){

        if(isNaN(store.state.profile.loginTime)){
          let logoutTime = new Date;
          store.state.profile.logoutTime = logoutTime.toString();
          store.dispatch('userLogout');

          let profile = await FB_SDK.FBlogout();
          store.commit('storeProfile', profile);
          document.location.reload();
          
        }else{
          let profile = await FB_SDK.FBlogin();
          store.dispatch('storeProfile', profile);
          store.dispatch('userLogin');
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
  