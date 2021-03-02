import { createStore } from 'vuex'
import {apigetUser, apiUserRegister, apigetAct, getFBToken, getUserFBData} from '../assets/axiosAPI.js';
import createPersistedState from 'vuex-persistedstate';



export const store = createStore({
/*----------------------------state----------------------------*/
  state: {
    DBActObj: {},
    DBActsArr: [],
    userActObj: {},
    searchActArr: [],
    isLogining: false,
    profile: {
      id: '',
      name: '未登入',
      userPicURL: require('@/assets/imgs/unloggined.png'),
      loginTime: false,
      logoutTime: false,
      cartKeyObj: {},
      order:{},
      link: '',
      license: '',
      phone:'',
      email:'',
    },
    selectedBonus: [],
    searchConds:{
      selectedStartDate: '',
      selectedEndDate: '',
      selectedArea: '', 
    },
    bonus:[
      {
        id: 0,
        title: 'letsGoDiving50',
        desc: '- NT$ 50',
        discount: 50,
      },
      {
        id: 1,
        title: 'letsgodiving888',
        desc: '-20%',
        discount: 0.8,
      },
      { 
        id: 2,
        title: 'awesomeDexter',
        desc: '-50%',
        discount: 0.5,
      },
      { 
        id: 3,
        title: 'handsomeDexter',
        desc: '-100%',
        discount: 0,
      },
      { 
        id: 4,
        title: 'dexterIsUgly',
        desc: '+100%',
        discount: 2,
      },
    ],
  },

/*----------------------------mutation----------------------------*/
  mutations: {
    getData: state => {
      apigetAct()
        .then(res => { 
            const resultArray = [];
            let DBKeys = Object.keys(res.data);
            let n = DBKeys.length;
            let DBActsArrKeys = []
            state.DBActObj = JSON.parse(JSON.stringify(res.data));
            
            for (let key of DBKeys){
              state.DBActObj[key].actID = key;
            }

            // for unLogined user
            if(!isNaN(state.profile.loginTime)){
              state.userActObj = JSON.parse(JSON.stringify(state.DBActObj));
            }

            for (let key in state.DBActObj) {
              resultArray.unshift(state.DBActObj[key]);
              DBActsArrKeys.unshift(key);
            }
            state.DBActsArr = [...resultArray];
            for (let i=0; i<n; i++){
              state.DBActsArr[i].actID = DBActsArrKeys[i];
            }

            state.searchActArr = [...state.DBActsArr];

            console.log("gotData from DB")

        })
    },

    getUserData: state =>{
      console.log('start download user data')
      apigetUser(state.profile.id).then( res =>{
        let finalLoginStatus = {};

        if(isNaN(res.data)){
          Object.keys(res.data).forEach( key =>{
            finalLoginStatus = res.data[key];
          })
          
          // Download cart items
          if(!finalLoginStatus.cartKeyObj){
            state.profile.cartKeyObj = {};
          }else{
            state.profile.cartKeyObj = JSON.parse(JSON.stringify(finalLoginStatus.cartKeyObj));
          }
          
        }else{
          console.log('first login')
        }
        return state.profile
      })
    },

    

    search: state =>{
      return new Promise( (resolve)=>{
        let searchResultByStart = [];
        let selectedStart = Date.parse(state.searchConds.selectedStartDate);

        if(isNaN(selectedStart)){
          resolve(state.DBActsArr)
        }else{
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
            return searchResultByStart;
          }else{
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
      if((state.searchConds.selectedArea=='') || (targetArr=='')){
        state.searchActArr = targetArr;
        return targetArr;

      }else{
        for(let activityVar3 of targetArr){
          if(activityVar3.details.area == state.searchConds.selectedArea){
            console.log(activityVar3.details.title)
            userActObjResult.push(activityVar3);
          }
        }
        state.searchActArr = userActObjResult;
        return targetArr;
      }
    },

    storeSearchDate: (state, searchDate)=>{ 
      state.searchConds.selectedStartDate = searchDate.selectedStart;
      state.searchConds.selectedEndDate = searchDate.selectedEnd;
    },
  
    storeArea: (state, selectedArea)=>{ 
      return new Promise(()=>{
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
      state.profile.cartKeyObj[actID] = {};
      state.profile.cartKeyObj[actID].attendNum = 1;
      state.profile.cartKeyObj[actID].registerFee = state.userActObj[actID].details.fee;
    },

    deleteFromCart: (state, actID)=>{
      state.userActObj[actID].isAdded = false;
      delete state.profile.cartKeyObj[actID];
    },

    storeBonus: (state, bonusID)=>{
      state.selectedBonus.push(state.bonus[bonusID]);
    },

    deleteBonus: (state, index)=>{
      state.selectedBonus.splice(index, 1);
    },

    addAttendee: (state, actID) =>{
      state.profile.cartKeyObj[actID].attendNum++;
      state.profile.cartKeyObj[actID].registerFee = state.userActObj[actID].details.fee * state.profile.cartKeyObj[actID].attendNum;
    },

    minusAttendee: (state, actID) =>{
      state.profile.cartKeyObj[actID].attendNum--;
      state.profile.cartKeyObj[actID].registerFee = state.userActObj[actID].details.fee * state.profile.cartKeyObj[actID].attendNum;
    },

    updateLikeBtn: state => {
      let isEmptyCart = ()=>{
        if(Object.keys(state.profile.cartKeyObj).length  == 0){
          return true
        }else{
          return false
        }
      }
      
      setTimeout(()=>{
        if(!isEmptyCart()){
          for(let userActKey in state.profile.cartKeyObj){
            state.userActObj[userActKey].isAdded = true;
          }
        }else{
          state.profile.cartKeyObj = {};
        }
      }, 1000)

      console.log('updateLikeBtn')

    },

    makeOrder:(state, orderID) => {
      state.profile.order[orderID] ={attendActs:{}, orderBonus:[]};
      state.profile.order[orderID].attendActs = JSON.parse(JSON.stringify(state.profile.cartKeyObj));
      state.profile.order[orderID].orderBonus = state.selectedBonus;
      console.log('makeOrder');
    },

    // updateAct:(state, orderID)=>{
    //   for(let actID in state.profile.order[orderID].attendActs){
    //     let newNum = state.DBActObj[actID].details.num - state.profile.order[orderID].attendActs[actID].attendNum
    //     let numlocation = actID + '/details'
    //     apipatchAct(numlocation, {num: newNum});
    //   }
    //   console.log('updateAct')
    // },

    storeProfile: (state, profile) => {
      state.profile = Object.assign({}, profile);
      console.log('storeProfile');
    },

    resetProfile: state => {
      state.profile.id =  '';
      state.profile.name = '請先登入';
      state.profile.userPicURL = require('@/assets/imgs/unloggined.png');
      state.profile.link = '';
      state.profile.loginTime = false;
      state.profile.logoutTime = false;
      state.profile.cartKeyObj = {};
      state.profile.order = {};
    },

    uploadUser: state => {
      let logoutTime = new Date;
      state.profile.logoutTime = logoutTime.toString();
      if(!isNaN(state.profile.loginTime )){
        state.profile.id = ( '999' + Date.parse(logoutTime) )
      }
      apiUserRegister(state.profile.id, state.profile);
      console.log('user uploaded')
    },
    
    
    resetUserActObj: state => {
      state.userActObj = JSON.parse(JSON.stringify(state.DBActObj));
      console.log('resetUserActObj')
    },

    cleanCart: (state) => {
      state.profile.cartKeyObj={};
      console.log('cleanCart')
    },

    storeLogoutTime: (state, payload) => {
      state.profile.logoutTime = payload;
    },


    unLogining: (state)=>{
      state.isLogining = false;
    },

    Logining: (state)=>{
      state.isLogining = true;
    },

  },

/*----------------------------action----------------------------*/
  actions: {
    userLogin: ({dispatch}, code)=>{
      console.log('userLogin');
      return new Promise(resolve=>{
        getFBToken(code).then(res =>{
          let profile = getUserFBData(res.data.access_token).then(res =>{
            let now = new Date;
            let userProfile = {}
            userProfile.id = res.data.id;
            userProfile.name = res.data.name;
            userProfile.userPicURL = res.data.picture.data.url;
            userProfile.link = '';
            userProfile.loginTime = now.toString();
            userProfile.logoutTime = false;
            userProfile.cartKeyObj = {};
            userProfile.order = {};
            return userProfile;
          })
        return profile
        }).then(profile=>{
          dispatch('storeProfile', profile);
        }).then(()=>{
          dispatch('resetUserActObj')
        }).then(()=>{
          dispatch('getUserData')
        }).then(()=>{
          dispatch('updateLikeBtn')
          resolve();
        }).catch((err)=>{
          console.log(err);
        })
      });
    },
      

    userLogout: async ({dispatch})=>{
      console.log('start logout process');
      await dispatch('uploadUser');
      await dispatch('resetUserActObj');
      await dispatch('resetProfile');
      document.location.reload();
    },

    submitOrder: async ({dispatch})=>{
      let now = new Date();
      let orderID = Date.parse(now);
      console.log('submitOrder');
      await dispatch('makeOrder', orderID);
      await dispatch('cleanCart');
      await dispatch('uploadUser');
      await dispatch('getData');
      // await dispatch('updateAct', orderID);
      await dispatch('resetUserActObj');
      // window.location.reload();
    },

    uploadUser: ({commit})=>{
      return new Promise(resolve=>{
        commit('uploadUser');
        resolve();
      })
    },

    getUserData: ({commit})=>{
      return new Promise(resolve=>{
        commit('getUserData');
        resolve()
      })
    },

    storeProfile: ({commit}, payload)=>{
      return new Promise(resolve=>{
        commit('storeProfile', payload);
        resolve()
      })
    },

    resetProfile: ({commit})=>{
      return new Promise(()=>{
        commit('resetProfile');
      })
    },

    resetAllData: async({dispatch})=>{
      await dispatch('getData')
      await dispatch('updateLikeBtn')
    },

    resetUserActObj: ({commit})=>{
      return new Promise(resolve=>{
        commit('resetUserActObj');
        resolve();
      })
    },

    updateLikeBtn: ({commit})=>{
      return new Promise(resolve=>{
        commit('updateLikeBtn');
        resolve();
      })
    },

    cleanCart: ({commit}, payload)=>{
      return new Promise( resolve =>{
        commit('cleanCart', payload);
        resolve();
      })
    },

    storeLogoutTime: ({commit}, payload)=>{
      return new Promise( resolve =>{
        commit('storeLogoutTime', payload)
        resolve();
      })
    },

    makeOrder: ({commit}, orderID)=>{
      return new Promise( resolve =>{
        commit('makeOrder', orderID)
        resolve();
      })
    },

    getData: ({commit})=>{
      return new Promise( resolve=>{
        commit('getData');
        resolve()
      })
    },

    updateAct: ({commit}, orderID)=>{
      return new Promise( ()=>{
        commit('updateAct', orderID);
      })
    },

    Logining: ({commit})=>{
      return new Promise( resolve =>{
        commit('Logining');
        resolve()
      })
    },

    unLogining: ({commit})=>{
      return new Promise( resolve =>{
        commit('unLogining');
        resolve()
      })
    },

    

  },

  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ] 

})


