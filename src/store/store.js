import { createStore } from 'vuex'
// import {useStore} from 'vuex';
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
/*----------------------------state----------------------------*/
  state: {
    activities: [],
    actDisplay: [],
    actForSearch: [],
    profile: {
      loginStatus: false,
      id:  '',
      name: '請先登入',
      userPicURL: '',
      link: '',
      cartIndexArr: [],
      cartArr: [],
    },
    searchConds:{
      selectedStartDate: '',
      selectedEndDate: '',
      selectedArea: '', 
    }
  },

/*----------------------------mutation----------------------------*/
  mutations: {
    getData: state => {
        axios.get('https://dss-v-profolio.firebaseio.com/activity.json')
            .then(res => {
                console.log("getData from DB")
                const resultArray = [];
                for (let key in res.data) {
                  resultArray.unshift(res.data[key]);
                }
                state.activities = resultArray;
              
            }).then(()=>{
                for (let key in state.activities){
                  state.activities[key].index = key;
                }
                state.actForSearch = state.activities;

                if(state.profile.loginStatus==false){
                  state.actDisplay = state.activities;
                }
            });
    },



    search: (state) =>{
      return new Promise( (resolve)=>{
        let searchResultByStart = [];
        console.log("selected start: " + state.searchConds.selectedStartDate)
        console.log("selected end: " + state.searchConds.selectedEndDate);
        console.log("selected area: " + state.searchConds.selectedArea)
        let selectedStart = Date.parse(state.searchConds.selectedStartDate);

        if(isNaN(selectedStart)){
          console.log("----------Without checking Start----------")
          resolve(state.activities)
        }else{
          console.log("----------Result after checking Start:----------")
          for (let activityVar1 of state.activities){
            if((selectedStart - Date.parse(activityVar1.details.date.start))<=0){
              console.log(activityVar1.details.title)
              searchResultByStart.push(activityVar1);
            }
          }
          resolve(searchResultByStart); 
        }

      }).then((searchResultByStart)=>{
        let selectedEnd = Date.parse(state.searchConds.selectedEndDate);
        let searchResultBySelectedDate = []
          if(isNaN(selectedEnd) || (searchResultByStart==null)){
            console.log("----------Without checking End----------")
            return searchResultByStart;
          }else{
            console.log("----------Result after checking End:---------")
            for (let activityVar2 of searchResultByStart){
              if((selectedEnd - Date.parse(activityVar2.details.date.end)) >=0){
                console.log(activityVar2.details.title)
                searchResultBySelectedDate.push(activityVar2);
              }
            }

            return searchResultBySelectedDate;
          }

      }).then((searchResultBySelectedDate) =>{
        store.commit('searchByArea', searchResultBySelectedDate)
      })
    },

    searchByArea: (state, targetArr) => {
      let actDisplayResult = []
      console.log("selected area: " + state.searchConds.selectedArea)
      if((state.searchConds.selectedArea=='') || (targetArr=='')){
        console.log("----------Without checking area----------")
        state.actForSearch = targetArr;

        console.log("")
        console.log("")
        return targetArr;

      }else{
        console.log("----------Result after checking Area:----------")
        for(let activityVar3 of targetArr){
          if(activityVar3.details.area == state.searchConds.selectedArea){
            console.log(activityVar3.details.title)
            actDisplayResult.push(activityVar3);
          }
        }
        state.actForSearch = actDisplayResult;

          console.log("")
          console.log("")
        return targetArr;
      }
    },


    storeSearchDate: (state, searchDate)=>{ 
      state.searchConds.selectedStartDate = searchDate.selectedStart;
      state.searchConds.selectedEndDate = searchDate.selectedEnd;
    },
  
    storeArea: (state, selectedArea)=>{ 
      return new Promise(()=>{
        console.log('storeArea: ' + selectedArea)
        state.searchConds.selectedArea = selectedArea;
      })
    },


  
    storeProfile: (state, payload) => {
      state.profile = payload;
      console.log('storeProfile');
      console.log('');
    },
  
    clearSearchConds: (state) => {
      console.log('clear search conditions')
      state.searchConds.selectedStartDate = '';
      state.searchConds.selectedEndDate = '';
      state.searchConds.selectedArea = '';
    },

    storetoCart: (state, index)=>{
      state.actDisplay[index].isAdded = true;
      state.profile.cartIndexArr.push(index);

      let value = state.actDisplay[index];
      state.profile.cartArr.push(value);
    },

    deleteFromCart: (state, index)=>{
      let i = state.profile.cartIndexArr.indexOf(index)
      let lengthOfArr = state.profile.cartIndexArr.length
      console.log('lengthofIndex: '+lengthOfArr)
      console.log('delete index: '+index)
      console.log('cartArrIndex: ' + state.profile.cartIndexArr)

      state.actDisplay[index].isAdded = false;

      if(i == (lengthOfArr-1)){
        state.profile.cartIndexArr.pop();
        state.profile.cartArr.pop();
      }else{
        state.profile.cartIndexArr.copyWithin(i,i+1);
        state.profile.cartIndexArr.pop();

        state.profile.cartArr.copyWithin(i,i+1);
        state.profile.cartArr.pop();
      }
    },

    
    createCartArr: (state, index) => {
      let value = state.actDisplay[index]
      state.profile.cartArr.push(value)
    },
    
    updateActDisplay: (state) => {
      state.actDisplay = state.activities;
    },

    cleanCart: (state) => {
      state.profile.cartArr=[];
      state.profile.cartIndexArr=[];
    },


  },



  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ],    
});


