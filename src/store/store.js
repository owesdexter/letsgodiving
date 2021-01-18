import { createStore } from 'vuex'
// import {useStore} from 'vuex';
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: {
    activities: [],
    actDisplay: [],
    profile: {},
    selectedStartDate: '',
    selectedEndDate: '',
    selectedArea: '',
    localData:{
      profile:{},
      cartIndexArr:[],
      cartArr:[],
    },
  },

  getters: {
    activities: state =>{
      return state.activities;
    },
    actDisplay: state =>{
      return state.activities;
    },
    cartArr: state =>{
      return state.cartArr;
    } 

  },

  mutations: {
    getData: state => {
        axios.get('https://dss-v-profolio.firebaseio.com/activity.json')
            .then(res => {
                console.log("getData")

                const resultArray = [];
                for (let key in res.data) {
                    resultArray.unshift(res.data[key]);
                }
                
                state.activities = resultArray;
                // state.actDisplay = resultArray;
            });
    },

    Search: (state) =>{
      return new Promise( (resolve)=>{
        let searchResultByStart = [];
        console.log("selected start: " + state.selectedStartDate)
        console.log("selected end: " + state.selectedEndDate);
        console.log("selected area: " + state.selectedArea)
        let selectedStart = Date.parse(state.selectedStartDate);

        if(isNaN(selectedStart)){
          console.log("----------Without checking Start----------")
          resolve(state.activities)
        }else{
          console.log("----------Result after checking Start:----------")
          // let selectedStart = Date.parse(state.selectedStartDate);
          // console.log(selectedStart)
          for (let activityVar1 of state.activities){
            if((selectedStart - Date.parse(activityVar1.details.date.start))<=0){
              console.log(activityVar1.details.title)
              searchResultByStart.push(activityVar1);
            }
          }
          // if (searchResultByStart==[]){
          //   reject(console.log("No result"))
          // }
          resolve(searchResultByStart); 
        }
      }).then((searchResultByStart)=>{
        // console.log(searchResultByStart)
        // console.log(searchResultByStart[searchResultByStart.length-1].details.title)
        let selectedEnd = Date.parse(state.selectedEndDate);
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
                // console.log(searchResultBySelectedDate.details.title)
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
      if((state.selectedArea=='') || (targetArr=='')){
        console.log("----------Without checking area----------")
        state.actDisplay = targetArr;
        console.log("")
        console.log("")
        return targetArr;

      }else{
        console.log("----------Result after checking Area:----------")
        for(let activityVar3 of targetArr){
          if(activityVar3.details.area == state.selectedArea){
            console.log(activityVar3.details.title)
            actDisplayResult.push(activityVar3);
          }
        }
        state.actDisplay = actDisplayResult;
          console.log("")
          console.log("")
        return targetArr;
      }
    },






    storeStartDate: (state, selectedStartDate)=>{ 
      state.selectedStartDate = selectedStartDate;
    },
  
    storeEndDate: (state, selectedEndDate)=>{ 
      state.selectedEndDate = selectedEndDate;
    },
  
    storeArea: (state, selectedArea)=>{ 
      state.selectedArea = selectedArea;
    },
  
    storeProfile: (state, payload) => {
      state.profile = payload;
      console.log('storeProfile');
      console.log('');
    },
  
    clearSearchConds: (state) => {
      state.selectedStartDate = '';
      state.selectedEndDate = '';
      state.selectedArea = '';
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

    
    createCartArr(state, index) {
      let value = state.actDisplay[index]
      state.profile.cartArr.push(value)
    },
    
    updateActDisplay(state){
      state.actDisplay = state.activities;
    },

    cleanCart(state){
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




    
  


  // actions: {
  //   getData: ({commit}) => {
  //     commit('getData');
  //   },
  //   searchByStartDate: ({commit},payload) => {
  //     commit('searchByStartDate',payload);
  //   },

  //   clearProfile: ({commit}) =>{
  //     commit('clearProfile');
  //   }

  // },


