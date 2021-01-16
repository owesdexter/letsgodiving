<template>
    <h2>找到 {{arr.actArraysLength}} 項活動:</h2>
    <div class="act-box shadow bg-white rounded mb-2 mb-md-4" 
      :key="activity.index" v-for="(activity, index) in arr.actDisplay" 
      :class="[isRight(index) ? 'right' : 'left']">

      <router-link 
          :to="'/activitydetails/' + `${index}`" 
          class="details-btn btn btn-light d-flex p-2 p-md-3">

        <div class="host-photo text-center">
          <img :src="`${activity.host.userPicURL}`" class="host-img">
          <p>{{activity.host.name}}</p>
        </div>
        <!-- <act-details/> -->

        <ul class="act-details" >
          <h3 class="text-primary text-left mb-3">{{activity.details.title}}</h3>
          <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.start}} ~ {{activity.details.date.end}}</li>
          <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">map</span>{{activity.details.area}}</li>
          <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">perm_identity</span>{{activity.details.num}}</li>
        </ul>
      </router-link>
      
    </div>
   
</template>

<script>
  import {computed, reactive} from 'vue'
  import {useStore} from 'vuex';
  // import actDetails from '../components/actDetails';
  export default {
    setup(){
      const store = useStore();
      const arr = reactive({
        // indexValue: '',
        actDisplay: computed(() => store.state.actDisplay),
        actArraysLength: computed(() => store.state.actDisplay.length)
      })
      
      const isRight = (i) => i % 2;

      // const isProvideAll = false;
      // provide['index', arr.indexValue];
      // provide['isProvideAll', isProvideAll];

      return{
        // actDetails,
        isRight,
        arr,
      }
    },

  }
</script>

<style scoped>

</style>
