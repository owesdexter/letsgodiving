<template>
    <button class="btn-marker bg-transparent border-0" :class="{disabled: !items.isLogin}" @click="add">
      <i class="far fa-bookmark align-middle text-h3" v-if="!items.activity.isAdded"></i>
      <i class="fas fa-bookmark align-middle text-h3" v-if="items.activity.isAdded" :class="{'text-primary': items.activity.isAdded}" ></i>
    </button>
</template>

<script>
  import {reactive, inject} from 'vue';
  import {useStore} from 'vuex';
  export default {
    setup(){
      const store = useStore();
      const index = inject('index')
      
      const items = reactive({
        activity: store.state.actDisplay[index],
        isAdded: store.state.actDisplay[index].isAdded,
        isLogin: store.state.profile.loginStatus,
      })

      const add = ()=>{
        if (items.isLogin){
          if(!items.isAdded){  
            store.commit('storetoCart',index)
          }else{
            store.commit('deleteFromCart',index)
          }
          items.isAdded = !items.isAdded;
        }else{
          window.alert('請先登入');
        } 
        
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
