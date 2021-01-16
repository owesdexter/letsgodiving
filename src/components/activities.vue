<template>
    <h2>找到 {{arr.actArraysLength}} 項活動:</h2>
    <div class="act-box shadow bg-white rounded mb-2 mb-md-4" 
      :key="activity.index" v-for="(activity, index) in arr.resourceArr" 
      :class="[isOdd(index) ? 'Odd' : 'couple']">
        <div class="host-photo text-center">
          <img :src="`${activity.host.userPicURL}`" class="host-img">
          <p>{{activity.host.name}}</p>
        </div>

        <ul class="act-details" >
          <h3 class="text-primary text-left mb-3">{{activity.details.title}}</h3>
          <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.start}} ~ {{activity.details.date.end}}</li>
          <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">map</span>{{activity.details.area}}</li>
          <li class="text-dark text-left mb-3"><span class="material-icons align-text-bottom d-inline-block mr-2">perm_identity</span>{{activity.details.num}}</li>
        </ul>
          <li class="text-dark text-left text-lg-m text-h5 mb-3" v-if="isProvideAll"><span class="material-icons align-text-bottom h5-md text-h4">attach_money</span>{{items.activity.details.fee}}</li>
    </div>
   
</template>

<script>
  import {reactive, inject} from 'vue'
  import {useStore} from 'vuex';

  export default {
    setup(){
      
      const store = useStore();
      const arr = reactive({
        resourceArr: [],
        actArraysLength: '',
      })
      const toStoreIndex = inject('toStoreIndex');
      const resourceArr = inject('resourceArr')

      const isOdd = (i) => {
        if(toStoreIndex==true) {
          store.state.actDisplay[i].index = i;
        }
        if(i/2 !==0){
          return true;
        }else{
          return false;
        }
      };

      return{
        resourceArr,
        isOdd,
        arr,
      }
    },

  }
</script>

<style scoped>

</style>
