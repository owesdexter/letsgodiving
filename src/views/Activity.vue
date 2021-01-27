<template>
  <h2>找到 <span class="font-weight-bold">{{arr.actArraysLength}} </span> 項活動:</h2>
  <div class="act-box shadow bg-white rounded mb-2 mb-md-4" 
    :key="activity.index" v-for="(activity) in arr.sourceActArr" >

    <router-link 
        :to="'/activitydetails/' + `${activity.index}`" 
        class="details-btn btn btn-light d-flex p-2 p-md-3">

      <div class="host-photo text-center">
        <img :src="`${activity.host.userPicURL}`" class="host-img">
        <p>{{activity.host.name}}</p>
      </div>

      <ul class="act-details ml-3 ml-md-4" >
        <h4 class="text-primary text-left font-weight-bold mb-3">{{activity.details.title}}</h4>
        <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.start}} ~ {{activity.details.date.end}}</li>
        <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">map</span>{{activity.details.area}}</li>
        <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">perm_identity</span>{{activity.details.num}}</li>
      </ul>
      
    </router-link>
    
  </div>
   
</template>

<script>
  import {computed, reactive,} from 'vue'
  import {useStore} from 'vuex';


  export default {
    setup(){
      const store = useStore();
      const arr = reactive({
        sourceActArr: computed(() => store.state.actForSearch),
        actArraysLength: computed(() => store.state.actForSearch.length),
      })

      return{
        arr,
      }
    },
  }
</script>
