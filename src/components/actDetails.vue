<template>
  <div class="act-details-box p-2 p-md-3">
    <div class="d-flex justify-content-between">      
      <p class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">event_note</span>{{items.activity.details.date.start}} ~ {{items.activity.details.date.end}}</p>
      <like-btn/>
    </div>
      
    <div class="d-flex flex-column flex-md-row justify-content-between">
      <ul class="latter-fifth-details pl-0">
        <li class="text-dark text-left mb-3" v-if="!isDetails"><span class="material-icons align-text-bottom d-inline-block mr-2">event_note</span>{{activity.details.date.start}} ~ {{items.activity.details.date.end}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">map</span>{{items.activity.details.area}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">perm_identity</span>{{items.activity.details.num}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3" v-if="isDetails"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">attach_money</span>{{items.activity.details.fee}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3" v-if="isDetails"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">room</span>{{items.activity.details.location}}</li>
      </ul>

      <div class="act-descpt-box d-flex flex-column mb-3 ml-0 ml-md-2 ml-xl-3" v-if="isDetails">
        <span class="text-dark text-left" >{{items.activity.details.description}}</span>
      </div>

    </div>
  </div>
</template>

<script>
  import {reactive, inject} from 'vue';
  import {useStore} from 'vuex';
  import likeBtn from './likeBtn'
  export default {
    setup(){
      const store = useStore();
      const isDetails = inject('isDetails', false);
      const sourceActObj = inject('sourceActObj');
      // const actID = inject('actID')
      
      const items = reactive({
        activity: sourceActObj,
        isDetails: false,
        isLogin: isNaN(store.state.profile.loginTime),
      })

      return{
        items,
        isDetails,

      }
    },

    components:{
      likeBtn,
    }

  }
</script>
<style lang="scss" scoped>

  .act-descpt-box{
    max-width: 329px;
    @media (max-width: 768px){
      width: 230px;
    }
    @media (max-width: 576px){
      width: 100%;
    }
  }

  .latter-forth-details{
    min-width: 250px;
  }


</style>