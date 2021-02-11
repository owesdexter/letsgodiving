import { createStore } from 'vuex'
import {apigetUser, apiUserRegister, apigetAct} from '../assets/axiosAPI.js';
import createPersistedState from 'vuex-persistedstate';

export const store = createStore({
/*----------------------------state----------------------------*/
  state: {
    DBActObj: {},
    DBActsArr: [],
    userActObj: {},
    searchActArr: [],
    profile: {
      id:  '',
      name: '請先登入',
      userPicURL: require('@/assets/imgs/unloggined.png'),
      loginTime: false,
      logoutTime: false,
      cartIndexArr: {},
      link: '',
      phone:'',
      email:'',
    },
    searchConds:{
      selectedStartDate: '',
      selectedEndDate: '',
      selectedArea: '', 
    },
    bonus:{
      LetsGoDiving50:{
        desc: '- NT$ 50',
        discount: '-50',
      },
      letsgodiving888:{
        desc: '-20%',
        discount: '*0.8',
      },
      AwesomeDexter:{
        desc: '-50%',
        discount: '*0.5',
      },
      HandsomeDexter:{
        desc: '-100%',
        discount: '*0',
      },
      DexterIsUgly:{
        desc: '+100%',
        discount: '*2',
      },
    }
  },

/*----------------------------mutation----------------------------*/
  mutations: {
    getData: state => {
      apigetAct()
        .then(res => {
            console.log("getData from DB")
            const resultArray = [];
            let DBKeys = Object.keys(res.data);
            let n = DBKeys.length;
            state.DBActObj = JSON.parse(JSON.stringify(res.data));

            for (let key in state.DBActObj) {
              resultArray.unshift(state.DBActObj[key]);
              DBKeys.push(key);
            }
            state.DBActsArr = [...resultArray];

            for (let i=0; i<n; i++){
              state.DBActsArr[i].actID = DBKeys[n-1-i];
            }
            

            if(state.profile.loginTime==''){
              state.userActObj = JSON.parse(JSON.stringify(state.DBActObj));
            }

          })
          .then(()=>{   
            state.searchActArr = [...state.DBActsArr];
            // console.log(state.DBActsArr)
            // console.log(state.userActObj)
            // console.log(state.searchActArr)
        });
    },

    search: state =>{
      return new Promise( (resolve)=>{
        let searchResultByStart = [];
        // console.log("selected start: " + state.searchConds.selectedStartDate)
        // console.log("selected end: " + state.searchConds.selectedEndDate);
        // console.log("selected area: " + state.searchConds.selectedArea)
        let selectedStart = Date.parse(state.searchConds.selectedStartDate);

        if(isNaN(selectedStart)){
          console.log("----------Without checking Start----------")
          resolve(state.DBActsArr)
        }else{
          console.log("----------Result after checking Start:----------")
          for (let activityVar1 of state.DBActsArr){
            if((selectedStart - Date.parse(activityVar1.details.date.start))<=0){
              console.log(activityVar1.details.title)
              searchResultByStart.push(activityVar1);
            }
          }
          resolve(searchResultByStart); 
        }

      }).then((searchResultByStart)=>{
        let selectedEnd = Date.parse(state.searchConds.selectedEndDate);
        let searchResultBySelectedDate = [];
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
      let userActObjResult = []
      console.log("selected area: " + state.searchConds.selectedArea)
      if((state.searchConds.selectedArea=='') || (targetArr=='')){
        console.log("----------Without checking area----------")
        state.searchActArr = targetArr;

        console.log("")
        console.log("")
        return targetArr;

      }else{
        console.log("----------Result after checking Area:----------")
        for(let activityVar3 of targetArr){
          if(activityVar3.details.area == state.searchConds.selectedArea){
            console.log(activityVar3.details.title)
            userActObjResult.push(activityVar3);
          }
        }
        state.searchActArr = userActObjResult;

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
  
    clearSearchConds: (state) => {
      console.log('clear search conditions')
      state.searchConds.selectedStartDate = '';
      state.searchConds.selectedEndDate = '';
      state.searchConds.selectedArea = '';
    },

    storetoCart: (state, actID)=>{
      state.userActObj[actID].isAdded = true;
      state.profile.cartIndexArr[actID] = {};
      state.profile.cartIndexArr[actID].attendNum = 1;
      state.profile.cartIndexArr[actID].registerFee = state.userActObj[actID].details.fee;
      // state.profile.cartIndexArr.push(actID);
      // state.profile.cartIndexArr[actID].fee = state.userActObj[actID].details.fee;
    },

    deleteFromCart: (state, actID)=>{
      state.userActObj[actID].isAdded = false;

      // let i = state.profile.cartIndexArr.indexOf(actID)
      // let lengthOfArr = state.profile.cartIndexArr.length

      delete state.profile.cartIndexArr[actID];

      // if(i == (lengthOfArr-1)){
      //   state.profile.cartIndexArr.pop();
      // }else{
      //   state.profile.cartIndexArr.copyWithin(i,i+1);
      //   state.profile.cartIndexArr.pop();
      // }
    },

    addAttendee: (state, actID) =>{
      state.profile.cartIndexArr[actID].attendNum++;
      state.profile.cartIndexArr[actID].registerFee = state.userActObj[actID].details.fee * state.profile.cartIndexArr[actID].attendNum;
    },

    minusAttendee: (state, actID) =>{
      state.profile.cartIndexArr[actID].attendNum--;
      state.profile.cartIndexArr[actID].registerFee = state.userActObj[actID].details.fee * state.profile.cartIndexArr[actID].attendNum;
    },

    updateCart: (state) => {
      if(state.profile.cartIndexArr){
        for(let userActKey in state.profile.cartIndexArr){
          console.log(state.userActObj)
          state.userActObj[userActKey].isAdded = true;
        }
      }else{
        state.profile.cartIndexArr = [];
      }
    },

    storeProfile: (state, profile) => {
      state.profile = Object.assign({}, profile);
      console.log('storeProfile');
    },

    uploadUser: state => {
      apiUserRegister(state.profile.id, state.profile);
    },
    
    resetUserActObj: (state) => {
      state.userActObj = JSON.parse(JSON.stringify(state.DBActObj));
      console.log('reset actForUser')
    },

    cleanCart: (state) => {
      state.profile.cartIndexArr=[];
    },

    storeLogoutTime: (state, payload) => {
      state.profile.logoutTime = payload;
    }

  },

/*----------------------------action----------------------------*/

  actions: {
    userLogin: ({dispatch})=>{
      console.log('start login process');
      return dispatch('getUserData')
      .then(()=>{
        dispatch('resetUserActObj')
      }).then(()=>{
        dispatch('updateCart')
      }).then(()=>{
        document.location.reload();
      })
    },

    userLogout: ({dispatch})=>{
      console.log('start logout process');
      return dispatch('uploadUser').then(()=>{
        dispatch('resetuserActObj')
      })
    },

    uploadUser: ({commit}, profile)=>{
      return new Promise(()=>{
        commit('uploadUser', profile);
      })
    },

    getUserData: ({state})=>{
      console.log('start download user data')
      return new Promise((resolve)=>{
        apigetUser(state.profile.id).then( res =>{

          let finalLoginStatus = {};
          
          Object.keys(res.data).forEach( key =>{
            finalLoginStatus = res.data[key];
          })

          // console.log(finalLoginStatus)
          // console.log(finalLoginStatus.cartIndexArr)
          // console.log(!finalLoginStatus.cartIndexArr)

          if(!finalLoginStatus.cartIndexArr){
            // console.log('here')
            state.profile.cartIndexArr = {};
          }else{
            state.profile.cartIndexArr = JSON.parse(JSON.stringify(finalLoginStatus.cartIndexArr));
          }

          // console.log(state.profile)
          resolve();

        }).catch((res)=>{
          console.log(res)
          resolve()
        })

      })
    },

    storeProfile: ({commit}, payload)=>{
      return new Promise(()=>{
        commit('storeProfile', payload);
      })
    },

    resetUserActObj: ({commit}, payload)=>{
      return new Promise(()=>{
        commit('resetuserActObj', payload);
      })
    },

    updateCart: ({commit}, payload)=>{
      return new Promise(()=>{
        commit('updateCart', payload);
      })
    },

    storeLogoutTime: ({commit}, payload)=>{
      return new Promise( ()=>{
        commit('storeLogoutTime', payload)
      })
    },

  },


  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ],    

});


