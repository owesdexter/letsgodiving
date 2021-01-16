<template>
  <div class="fb-profile d-flex flex-column align-items-center">
    <img :src="`${profile.userPicURL}`" class="host-img d-block mb-2" v-if="showHostImg">
    <p class="text-center text-lg-m text-h5">{{profile.name}}</p>
  </div>
</template>

<script>
  import{inject, onMounted} from 'vue';

  export default{
    setup(){
      
      const profile = inject('profile');
      const showHostImg = inject('showHostImg');

      onMounted(profile => {
       console.log(profile);
       console.log(showHostImg)
      })

      return{
        profile,
        showHostImg
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

  .host-page .unloggined-img{
    object-position: center 0%;
  }

</style>