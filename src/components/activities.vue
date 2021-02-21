<template>
    <div class="act-box shadow bg-white rounded mb-2 mb-md-4" 
      :key="keyValue" v-for="(activity, keyValue) in sourceActArr" >
      <div
          class="d-flex p-2 p-md-3 align-items-center justify-content-between">    
        
        <div class="d-flex justify-content-between">
          <fb-profile :sourceProfile="activity.host"/>

          <ul class="act-details ml-3 ml-md-4" >
            <li>
              <router-link 
                :to="'/activitydetails/' + `${activity.actID}`">
                <h5 class="text-primary text-left font-weight-bold mb-2">{{activity.details.title}}</h5>
              </router-link>
            </li>
            <li class="text-dark text-left mb-1"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.start}}</li>
            <li class="text-dark text-left mb-1"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.end}}</li>
            <li class="text-dark text-left mb-1"><span class="material-icons align-text-bottom d-inline-block mr-2">map</span>{{activity.details.area}}</li>
            <li class="text-dark text-left mb-1"><span class="material-icons align-text-bottom d-inline-block mr-2">perm_identity</span>{{activity.details.num}}</li>
          </ul>

        </div>

        <act-fee :actID="activity.actID" :actFee="activity.details.fee"/>
        
      </div>
      
    </div>
   
</template>

<script>

  import actFee from './actFee';
  import fbProfile from "./fbProfile"

  export default {
    props:{
      sourceActArr:{
        type: Array,
      }
    },

    components:{
      actFee,
      fbProfile,
    }
  }
</script>
