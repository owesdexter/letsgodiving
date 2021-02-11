<template>
  <ul class="pl-0">
      <li class="form-group d-flex justify-content-between text-dark align-items-center">
          <!-- <label type="text" for="bonus">折扣碼</label>
          <input name="bonus" id="bonus" class="form-control" type="text" maxlength="15" :input="addBonusCode">
          <show-options @click="updateBonus"/> -->
          <show-options :getOption="items.selectedOption"/>
      </li>
      <li class="d-flex justify-content-between text-dark align-items-center">
          <p>車馬費小計</p>
          <p>NT$ {{items.totalRegisterFee}}</p>
      </li>
      <li>使用折扣碼:</li>
      <li>
          <p>{{items.selectedOption}}</p>
          <!-- <ul>
            <li :key="code" v-for="code in bonusCodes"  class="d-flex justify-content-between text-dark align-items-center">
              <p>{{code}}</p>
              <p> - NT$ {{items.bonus}}</p>
            </li>
          </ul> -->
      </li>
      <li class="d-flex justify-content-between text-primary align-items-center">
          <h3 class="font-weight-bold h5-lg h4-md">總金額</h3>
          <h3 class="font-weight-bold h5-lg h4-md">NT {{items.totalExpense}}</h3>
      </li>
  </ul>
</template>

<script>
  import {computed, reactive, provide} from 'vue';
  import {useStore} from 'vuex';
  import showOptions from './showOptions'

  export default {
    setup(){
      const store = useStore();

      const items = reactive({
        totalRegisterFee: computed(()=>{
          let sum = 0;
          for(let key in store.state.profile.userActObj){
            sum +=store.state.profile.cartIndexArr[key].registerFee;
          }
          return sum;
        }),

        bonus: '',

        // totalExpense: computed( sourceActArr => {
        //   for(let act of sourceActArr){
        //     let v1 = parseInt(act.details.fee);
        //     if(!v1){
        //       v1=0;
        //     }
        //     return (v1 + parseInt(items.totalExpense))
        //   }
        // })

        totalExpense: computed(()=>(items.totalRegisterFee - items.bonus)),
        selectedOption: '',

      });

      provide('optionSource', store.state.bonus)

      // onUpdated(()=>{
      //   name = items.selectedOption;
      // })


      return{
        items,
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
