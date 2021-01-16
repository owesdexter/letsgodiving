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
</template>

<script>
  import {onMounted} from 'vue'
  import {useStore} from 'vuex'
  import searchBar from '../components/searchBar'
  export default{
    setup(){

      const store = useStore();
      onMounted(()=>{
        console.log("clear")
        store.commit('clearSearchConds')
      })

      return{
      }
    },

    components:{
      searchBar
    }
  }

</script>

<style>
.title{
  font-size: 4rem;
  font-family: 'Caveat', cursive;
}

.hero-text-box{
    margin-top: 70px;
}
</style>