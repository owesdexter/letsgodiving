<template>
  <div class="d-flex position-relative justify-content-between text-align-center">
    <ul class="d-flex text-align-center align-items-center">
      <li><button @click="add" class="btn btn-link" :class="{disabled: items.isUpToMax}"><i class="fas fa-plus"></i></button></li>
      <li class="text-dark">{{items.attendNum}}</li>
      <li><button @click="minus" class="btn btn-link"><i class="fas fa-minus"></i></button></li>
    </ul>
    <h4 class="font-weight-bold text-right text-dark text-lg-m h5-md mt-2">
          NT$ {{items.totalActFee}}
    </h4>
    <span class="uptomax-text text-danger" v-if="items.isUpToMax">要超出人數啦!!</span>
  </div>
</template>

<script>
  import {computed, reactive} from 'vue'
  import {useStore} from 'vuex';

  export default {
    props:{
      actID: {
        type: String,
        required: true,
      }, 
      actFee: {
        type: Number,
        required: true,
      }
    },
    setup(props){
      const store = useStore();

      const items = reactive({
        attendNum: computed(()=> parseInt(store.state.profile.cartKeyObj[props.actID].attendNum)),
        totalActFee: computed(()=> parseInt(store.state.profile.cartKeyObj[props.actID].registerFee)),
        isUpToMax: computed(()=>{
          let max = store.state.userActObj[props.actID].details.num;
          if(store.state.profile.cartKeyObj[props.actID]!==undefined){
            if(store.state.profile.cartKeyObj[props.actID].attendNum >= max){
              return true
            }
          }
        })
      });

      const add = () =>{
        if(!items.isUpToMax){
          store.commit('addAttendee', props.actID);
        }
      };

      const minus = () =>{
        store.commit('minusAttendee', props.actID);
        let currentNum = store.state.profile.cartKeyObj[props.actID].attendNum;
        if(currentNum < 1){
          store.commit('deleteFromCart', props.actID)
        }
      };

      return{
        items,
        add,
        minus,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .uptomax-text{
    position: absolute;
    top: 2.5rem;
    left: 0.5rem;
  }
</style>
