<template>
    <div class="searchbar-container d-flex flex-column flex-md-row justify-content-between align-items-md-center">
      <form class="form-searchbar d-flex flex-column flex-md-row justify-content-between">
          <div class="area-box form-group">
            <label for="area" class="text-primary h5"><span class="material-icons mr-1 align-text-bottom">place</span>潛哪?</label>
            <select class="area-select form-control text-primary" id="area" v-model="searchConds.area">
              <option value="null" selected disabled hidden>{{searchConds.defaultarea}}</option>
              <option value="北部" selected>北部</option>
              <option value="中部" >中部</option>
              <option value="南部" >南部</option>
              <option value="東部" >東部</option>
              <option value="澎湖" >澎湖</option>
              <option value="綠島" >綠島</option>
              <option value="蘭嶼" >蘭嶼</option>
              <option value="小琉球" >小琉球</option>
            </select>
          </div>

          <div class="datepicker ml-0 ml-md-3">
            <label for="startDate" class="text-primary h5"><span class="material-icons mr-1 align-text-bottom">event_note</span>從</label>
            <datepicker-lite :value-attr="searchConds.defaultStartDate" @value-changed="searchConds.changeStart"/>
          </div>
            
          <div class="datepicker ml-0 ml-md-3">
            <label for="endDate" class="text-primary h5"><span class="material-icons mr-1 align-text-bottom">event_note</span>到</label>
            <datepicker-lite :value-attr="searchConds.defaultEndDate" @value-changed="searchConds.changeEnd"/>
          </div>
      </form>
      <button class="btn-search btn btn-primary ml-0 ml-md-2 mt-4 mb-4 mb-md-9125" @click="Search">
        <span class="material-icons">search</span>
      </button>
    </div>
</template>

<script>
  import {reactive, computed } from 'vue';
  import {useStore} from 'vuex';
  import DatepickerLite from "vue3-datepicker-lite";
  import{useRouter} from 'vue-router'
  
  export default{
    setup(){
      const store = useStore();
      const router = useRouter();

      const searchConds = reactive({
        defaultStartDate: computed(() => store.state.selectedStartDate),
        defaultEndDate: computed(() => store.state.selectedEndDate),
        defaultarea: computed(() => store.state.selectedArea),

        area: '',
        selectedStart: '',
        selectedEnd: '',

        changeStart: (Start) => {
          searchConds.selectedStart = Start;
        },

        changeEnd: (End) => {
          searchConds.selectedEnd = End;
        }

      })

      const Search = async()=>{
        await store.commit('storeStartDate', searchConds.selectedStart)
        store.commit('storeEndDate', searchConds.selectedEnd);
        await store.commit('storeArea', searchConds.area); 
        store.commit('Search')
        router.push({ path: '/result' });
      }

      return{
        searchConds,
        Search,
      }
    },

    components:{
      DatepickerLite,

    }
  }

</script>


<style>
.searchbar-container{
  width: 100%;
  background-color: rgb(108, 168, 228,0.4);
  padding: 0.5rem 2rem 0 2rem;
  border-radius: 10px;
}


.datepicker input{
  background-color: white;
  text-align: center;
  line-height: 2.25;
  border: 0px;
  border-radius: 5px;
  width: 150px;
}

.area-select{
  border: 0;
  height: 28px;
}

.btn-search{
  height: 35px;
}

label{
  font-weight: 600;
  font-size: 1.25rem;
}

@media (max-width: 768px){
  .datepicker input{
    width: 150px;
  };
}

@media (max-width: 576px){
  .datepicker input{
    width: 237.8px;
  };
}

</style>
 
