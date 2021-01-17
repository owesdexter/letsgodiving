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
        loginStatus: computed(() => store.state.profile.loginStatus),
        loginButtonText: '',
      }) 

      onMounted(()=>{
        console.log('btn mounted')
        if(loginProps.loginStatus==false){
          loginProps.loginButtonText = 'LOGIN'
        }else{
          loginProps.loginButtonText = 'LOGOUT'
        }
      })

      async function fbLogin(){
        if(loginProps.loginStatus==false){
          console.log('start login');
          let profile = await FB_SDK.FBlogin();
          await store.commit('storeProfile', profile);
          window.location.reload();
          // store.commit('updateActDisplay');
        }else{
          let profile = await FB_SDK.FBlogout();
          console.log('start logout');
          await store.commit('storeProfile', profile);
          store.commit('cleanCart');
          window.location.reload();
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
  