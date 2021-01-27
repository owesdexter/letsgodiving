<template>
  <div class="result container container-md container-lg container-xl mt-3 mt-md-5 mb-5">
    <div class="row d-flex">
      <div class="searchsidebar col-12 col-md-4">
        <search-side-bar/>
      </div>
      <div class="sidebar col-12 col-md-8">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import searchSideBar from '../components/searchSidebar'


  export default {
    setup(){
      return{
        searchSideBar,
      }
    }
  }
</script>

<style>
  .result .datepicker input{
    background-color: white;
    width: 100%;
  }

  .result .btn-search{
    width: 100%;
  }
</style>
