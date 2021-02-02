<template>
    <header class="banner d-flex flex-column justify-content-center align-items-center">
      <div class="container container-md container-lg container-xl">
        <div class="d-flex justify-content-center ">
          <div class="hero-text-box d-flex flex-column justify-content-center">
            <h1 class="title text-white">Let's go diving</h1>
            <search-bar/>
          </div>  
        </div>
      </div>
    </header>
    <section class="caresoul">
      <div class="container container-md container-lg container-xl">
        <div class="row d-flex flex-column align-items-center ">
          <div class="col-12 col-md-10 ">
            <div class="w-100 d-flex flex-column align-items-center ">
              <h2 class="mb-4">想潛哪裡呢?</h2>
              <carousel/>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script>
  import {onMounted} from 'vue'
  import {useStore} from 'vuex'
  import searchBar from '../components/searchBar'
  import carousel from '../components/carousel'
  export default{
    setup(){

      const store = useStore();
      onMounted(()=>{
        store.commit('clearSearchConds')
      })

      return{
      }
    },

    components:{
      searchBar,
      carousel,
    }
  }

</script>

<style>
.banner{
  margin-bottom: 60px;
}

.title{
  font-size: 4rem;
  font-family: 'Caveat', cursive;
}

.hero-text-box{
    margin-top: 70px;
}
</style>