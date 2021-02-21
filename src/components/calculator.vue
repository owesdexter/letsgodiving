<template>
  <ul class="pl-0">
      <li class="bonusSearch">
          <label for="bonus" class="text-m">折扣碼</label>
          <show-options @getOption="getBonusTitle" :bonusIndexArr="bonusIndexArr">優惠碼已加入</show-options>
      </li>
      <li class="d-flex justify-content-between align-items-center text-dark">
          <p>車馬費小計</p>
          <p>NT$ {{items.subTotal}}</p>
      </li>
      <li>
          <p class="mb-1">使用折扣碼:</p>
          <ul>
            <li :key="index" v-for="(bonus, index) in selectedBonus"  
            class="d-flex justify-content-between align-items-center text-dark">
              <span>{{bonus.title}}</span>
              <div class="d-flex justify-content-end align-items-center">
                <span>{{bonus.desc}}</span>
                <button @click="removeBonus(index)" class="btn btn-link text-secondary"><i class="fas fa-times"></i></button>
              </div>
            </li>
          </ul>
      </li>
      <li class="d-flex justify-content-between text-primary align-items-center">
          <h3 class="font-weight-bold h5-lg h4-md">總金額</h3>
          <h3 class="font-weight-bold h5-lg h4-md">NT {{items.totalExpense}}</h3>
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

      const getBonusTitle = (bonusIndex)=>{
        bonusIndexArr.value.push(bonusIndex);
        selectedBonus.value.push(store.state.bonus[bonusIndex]);  
      }

      const removeBonus = index =>{
        selectedBonus.value.splice(index, 1)
        bonusIndexArr.value.splice(index, 1)
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

<style>
  .buyer-info{
    background-color:rgb(35,212,240,0.1);
  }
  .buyer-info .contact-info ul{
    margin: 0 !important;
  }
</style>
