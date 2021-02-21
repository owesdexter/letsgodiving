<template>
    <button class="btn-marker bg-transparent border-0" :class="{disabled: !items.isLogin}" @click="add">
      <i class="far fa-bookmark align-middle text-h3" v-if="!items.isAdded"></i>
      <i class="fas fa-bookmark align-middle text-h3" v-if="items.isAdded" :class="{'text-primary': items.isAdded}" ></i>
    </button>
</template>

<script>
  import {reactive, inject} from 'vue';
  import {useStore} from 'vuex';
  export default {

    setup(){
      const store = useStore();
      const actID = inject('actID')
      
      const items = reactive({
        activity: store.state.userActObj[actID],
        isAdded: store.state.userActObj[actID].isAdded,
        isLogin: true,
        // isLogin: isNaN(store.state.profile.loginTime),
      })

      const add = ()=>{
        // if (items.isLogin){
          if(!items.isAdded){  
            store.commit('storetoCart', actID)
          }else{
            store.commit('deleteFromCart', actID)
          }
          items.isAdded = !items.isAdded;
        // }else{
        //   window.alert('請先登入');
        // } 
      }

      return{
        items,
        add,
      }
    }
  }
</script>

<style scoped>

</style>
