<template>
    <button 
      class="btn btn-outline-light btn-login rounded-pill" 
      id="login-btn" 
      @click="fbLogin" 
      :class="{disabled: isLogining}"
    >{{loginProps.loginButtonText}}</button>
    
</template>

<script>
  import {computed, reactive, ref} from 'vue'
  import {useRouter} from 'vue-router'
  import{useStore} from 'vuex';


  export default{
    setup(){
      const store = useStore();
      const router = useRouter();
      let isLogining = ref(store.state.isLogining)

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
          // Logout
          router.push({ path: '' })
          store.dispatch('userLogout');
          
        }else{
          // Login
          let now = new Date();
          let statement = Date.parse(now) + 248738799749062;
          window.location.href = "https://www.facebook.com/v9.0/dialog/oauth/?"
            +"client_id=248738799749062"
            +"&redirect_uri=https://sheltered-cove-28264.herokuapp.com/register"
            +"&state=" 
            + statement;
          isLogining.value = true;
        }
      }

      

      return{
        loginProps,
        fbLogin,
        isLogining,
      }

    }
  }
</script>

<style>

</style>
  