<template>
  <div class="align-items-center p-2">
    <img :src="`${profile.userPicURL}`" class="host-img d-block mb-2">
    <h5 class="profile-name text-center text-md-s text-lg-m">{{profile.name}}</h5>
  </div>
</template>

<script>
  import {inject} from 'vue';
  export default{
    props:{
      sourceProfile: {
        type: Object,
      }
    }, 
    setup(props){
      const profile = inject('profile', props.sourceProfile);
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

</style>