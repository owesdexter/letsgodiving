<template>
    <div class="shadow bg-white rounded mb-3 mb-md-4" 
      :key="keyValue" v-for="(activity, keyValue) in sourceActArr" >
      <div class="d-flex flex-column flex-xl-row align-items-center justify-content-between p-2 p-md-3 "> 
        <div class="cart-details d-flex">

          <fb-profile :sourceProfile="activity.host"/>

          <ul class="act-details ml-2 ml-md-3 ml-lg-4" >
            <li>
              <router-link 
                :to="'/activitydetails/' + `${activity.actID}`">
                <h4 class="act-details-title">{{activity.details.title}}</h4>
              </router-link>
            </li>
            <li class="act-details-items"><span class="act-details-icon material-icons ">event_note</span>{{activity.details.date.start}} ~ {{activity.details.date.end}}</li>
            <div class="d-flex d-xl-block">
              <li class="act-details-items mb-1 mb-xl-2"><span class="act-details-icon material-icons">map</span>{{activity.details.area}}</li>
              <li class="act-details-items mb-1 mb-xl-2"><span class="act-details-icon material-icons">perm_identity</span>{{activity.details.num}}</li>
            </div>
          </ul>

        </div>

        <hr class="d-block d-xl-none my-1" size="20px" width="100%" color="#002760">
        
        <div class="act-fee-box px-2">
          <act-fee :actID="activity.actID" :actFee="activity.details.fee"/>
        </div>
        
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

<style lang="scss" scoped>
  .act-fee-box{
    width: 300px;
    padding: 0rem 1rem;
    @media(max-width: 1200px){
      width: 100%;
    }
  }

  .cart-details{
    width: 440px;
    @media(max-width: 1200px){
      width: 100%;
    }
  }
</style>
