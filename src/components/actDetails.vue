<template>
  <div class="act-details-box p-2 p-md-3">
    <div class="d-flex justify-content-between">      
      <p class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">event_note</span>{{items.activity.details.date.start}} ~ {{items.activity.details.date.end}}</p>
      <like-btn/>
    </div>  
    <div class="d-flex flex-column flex-md-row justify-content-between">
      <ul class="latter-fifth-details pl-0">
        <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">map</span>{{items.activity.details.area}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3"><span class="material-icons align-text-bottom h5-md text-h4 d-inline-block mr-2">perm_identity</span>{{items.activity.details.num}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3" v-if="isProvideAll"><span class="material-icons align-text-bottom h5-md text-h4">attach_money</span>{{items.activity.details.fee}}</li>
        <li class="text-dark text-left text-lg-m text-h5 mb-3" v-if="isProvideAll"><span class="material-icons align-text-bottom h5-md text-h4">room</span>{{items.activity.details.location}}</li>
      </ul>

      <div class="act-descpt-box d-flex flex-column mb-3 ml-0 ml-md-2 ml-xl-3" v-if="isProvideAll">
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
      const isProvideAll = inject('isProvideAll', false);
      const index = inject('index')
      
      const items = reactive({
        activity: store.state.actDisplay[index],
        isProvideAll: false,
        // isAdded: store.state.actDisplay[index].isAdded,
        isLogin: store.state.profile.loginStatus,
      })

      // const add = ()=>{
      //   if (items.isLogin){
      //     if(!items.isAdded){  
      //       // console.log('add index:'+index);
      //       store.commit('storetoCart',index)
      //     }else{
      //       // console.log('del index:'+ index);
      //       store.commit('deleteFromCart',index)
      //     }
      //     // console.log('isAdded: '+items.isAdded)
      //     items.isAdded = !items.isAdded;
      //   }else{
      //     window.alert('Please login first');
      //   } 
        
      // }

      return{
        items,
        likeBtn,
        isProvideAll,
        // add,
      }
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