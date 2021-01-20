<template>
  <div class="align-items-center p-2">
    <img :src="`${profile.userPicURL}`" class="host-img d-block mb-2" v-if="profile.loginStatus">
    <img src="@/assets/imgs/unloggined.png" class="host-img unloggined-img d-block mb-2" v-if="!profile.loginStatus">
    <h3 class="text-center text-lg-m">{{profile.name}}</h3>
  </div>
</template>

<script>
  import {computed} from 'vue';
  import {useStore} from 'vuex';

  export default{
    setup(){
      const store = useStore();
      const profile = computed(()=>{
        return store.state.profile;
      })

      return{
        profile,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .host-img{
      object-fit: cover;
      width: 75px;
      
    border-radius: 50%;
    @media (max-width: 576px){
      width: 50px;
      height: 50px;
    }
  };

  .unloggined-img{
    object-position: center 10%;
  }

  // .fb-profile{
  //   width: 100px;
  // }


</style>