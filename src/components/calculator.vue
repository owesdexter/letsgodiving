<template>
  <ul class="pl-0">
      <li class="bonusSearch mb-3">
          <label for="bonus" class="text-md-m text-h5">折扣碼</label>
          <show-options @getOption="getBonusTitle" :bonusIndexArr="bonusIndexArr">優惠碼已加入</show-options>
      </li>
      <li class="d-flex justify-content-between align-items-center text-dark mb-3">
          <h5 class="text-md-m mb-0 font-weight-bold">車馬費小計</h5>
          <h5 class="text-md-m mb-0">NT$ {{items.subTotal}}</h5>
      </li>
      <li class="mb-3">
          <h5 class="mb-1 text-md-m font-weight-bold">使用折扣碼:</h5>
          <ul class="mb-2">
            <transition-group name="bonuslist" tag="ul">
              <li :key="index" v-for="(bonus, index) in selectedBonus"  
              class="bonuslist-item d-flex justify-content-between align-items-center text-dark ">
                <span>{{bonus.title}}</span>
                <div class="d-flex justify-content-end align-items-center">
                  <span>{{bonus.desc}}</span>
                  <button @click="removeBonus(index)" class="btn btn-link text-secondary"><i class="fas fa-times"></i></button>
                </div>
              </li>
            </transition-group>  
          </ul>
      </li>
      <li class="d-flex justify-content-between text-primary align-items-center">
          <h3 class="font-weight-bold h4-md h5-lg ">總金額</h3>
          <h3 class="font-weight-bold h4-md h5-lg ">NT {{items.totalExpense}}</h3>
      </li>
  </ul>
</template>

<script>
  import {computed, reactive, provide, ref} from 'vue';
  import {useStore} from 'vuex';
  import showOptions from './showOptions'

  export default {
    setup(){
      const store = useStore();
      const selectedBonus = ref([]);
      let bonusIndexArr = ref([]);
      
      const items = reactive({
        subTotal: computed(()=>{
          let sum = 0;
          for(let key in store.state.profile.cartKeyObj){
            sum += store.state.profile.cartKeyObj[key].registerFee;
          }
          return sum;
        }),

        totalExpense: computed(()=>{
          let currentSubTotal = items.subTotal;
          let currentSelectedBonus = selectedBonus.value;
          let saveMinus = 0;
          let currentProducts = 1;
          if(selectedBonus.value.length){
            for(let bonusObj of currentSelectedBonus){
              if(bonusObj.id == 0){
                saveMinus += bonusObj.discount;
              }else{
                currentProducts *= bonusObj.discount;
              }
            }
            let total = (currentSubTotal * currentProducts - saveMinus)
            if( total <=0 ){
              return 0
            }else{
              return total;
            }
          }else{
            return currentSubTotal;
          }
        }),

      });

      provide('optionSource', store.state.bonus)

      const getBonusTitle = bonusID=>{
        bonusIndexArr.value.push(bonusID);
        selectedBonus.value.push(store.state.bonus[bonusID]); 
        store.commit('storeBonus', bonusID);
      }

      const removeBonus = Index =>{
        selectedBonus.value.splice(Index, 1);
        bonusIndexArr.value.splice(Index, 1);
        store.commit('deleteBonus', Index);
      }

      return{
        items,
        getBonusTitle,
        selectedBonus,
        removeBonus,
        bonusIndexArr,
      }
    },
    components:{
      showOptions,
    }

  }
</script>

<style scope>

  .bonuslist-enter-active,
  .bonuslist-leave-active {
    transition: all 1s ease;
  }


  .bonuslist-enter-from,
  .bonuslist-leave-to {
    opacity: 0;
  }
</style>
