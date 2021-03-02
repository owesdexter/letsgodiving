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
      selectedBonus: [],
      link: '',
      license: '',
      phone:'',
      email:'',
    },
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
      state.profile.selectedBonus.push(state.bonus[bonusID]);
    },

    deleteBonus: (state, index)=>{
      state.profile.selectedBonus.splice(index, 1);
    },

    addAttendee: (state, actID) =>{
      state.profile.cartKeyObj[actID].attendNum++;
      state.profile.cartKeyObj[actID].registerFee = state.userActObj[actID].details.fee * state.profile.cartKeyObj[actID].attendNum;
    },

    minusAttendee: (state, actID) =>{
      state.profile.cartKeyObj[actID].attendNum--;
      state.profile.cartKeyObj[actID].registerFee = state.userActObj[actID].details.fee * state.profile.cartKeyObj[actID].attendNum;
    },

    updateCart: (state) => {
      if(state.profile.cartKeyObj){
        for(let userActKey in state.profile.cartKeyObj){
          state.userActObj[userActKey].isAdded = true;
        }
      }else{
        state.profile.cartKeyObj = {};
      }
      console.log('cart is updated')
      console.log(state.userActObj);
    },

    makeOrder:(state) => {
      let now = new Date();
      let orderID = Date.parse(now);
      state.profile.order[orderID].attendActs = JSON.parse(JSON.stringify(state.profile.cartKeyObj));
      state.profile.order[orderID].selectedBonus = state.profile.selectedBonus;
      console.log('makeOrder');
    },

    storeProfile: (state, profile) => {
      state.profile = Object.assign({}, profile);
      console.log('storeProfile');
      console.log(state.userActObj);
    },

    uploadUser: state => {
      let logoutTime = new Date;
      state.profile.logoutTime = logoutTime.toString();
      if(!isNaN(state.profile.id)){
        state.profile.id = ( '999' + Date.parse(logoutTime) )
      }
      apiUserRegister(state.profile.id, state.profile);
      console.log('user uploaded')
    },
    
    resetUserActObj: state => {
      state.userActObj = JSON.parse(JSON.stringify(state.DBActObj));
      // for (let key in state.userActObj){
      //   state.userActObj[key].actID = key;
      // }
      console.log('resetUserActObj')
    },

    cleanCart: (state) => {
      state.profile.cartKeyObj={};
    },

    storeLogoutTime: (state, payload) => {
      state.profile.logoutTime = payload;
    },

    unLogining: (state)=>{
      state.isLogining = false;
    },

    Logining: (state)=>{
      state.isLogining = true;
    }

  },

/*----------------------------action----------------------------*/
  actions: {
    userLogin: ({dispatch, state}, code)=>{
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
          console.log(state.userActObj);
          dispatch('resetUserActObj')
        }).then(()=>{
          console.log(state.userActObj);
          dispatch('getUserData')

        }).then(()=>{

          dispatch('updateCart')
          console.log(state.userActObj);
          resolve();
        }).catch((err)=>{
          console.log(err);
        })
      });
    },

    userLogout: ({dispatch})=>{
      console.log('start logout process');
      return dispatch('uploadUser').then(()=>{
        dispatch('resetUserActObj');
      }).then(()=>{
        let userProfile = {}
        userProfile.id =  '';
        userProfile.name = '請先登入';
        userProfile.userPicURL = require('@/assets/imgs/unloggined.png');
        userProfile.link = '';
        userProfile.loginTime = false;
        userProfile.logoutTime = false;
        userProfile.cartKeyObj = {};
        userProfile.order = {};
        return userProfile;
      }).then(profile=>{
        dispatch('storeProfile', profile);
      }).then(()=>{
        document.location.reload();
      })
    },

    submitOrder: async ({dispatch})=>{
      console.log('submitOrder');
      await dispatch('makeOrder');
      await dispatch('cleanCart');
      await dispatch('uploadUser');
    },

    uploadUser: ({commit}, profile)=>{
      return new Promise(resolve=>{
        commit('uploadUser', profile);
        resolve();
      })
    },

    getUserData: ({state})=>{
      console.log('start download user data')
      return new Promise((resolve)=>{
        apigetUser(state.profile.id).then( res =>{
          let finalLoginStatus = {};
          if(isNaN(res.data)){
            Object.keys(res.data).forEach( key =>{
              finalLoginStatus = res.data[key];
            })
            if(!finalLoginStatus.cartKeyObj){
              state.profile.cartKeyObj = {};
              
            }else{
              state.profile.cartKeyObj = JSON.parse(JSON.stringify(finalLoginStatus.cartKeyObj));
            }
            resolve();
          }else{
            resolve()
          }
        }).catch((err)=>{
          console.log(err)
          resolve()
        })
      })
    },

    // reloadUserActObj: async ({dispatch})=>{
    //   await dispatch('getData')
    //   await dispatch('resetUserActObj')
    // },

    resetAllData: async({dispatch})=>{
      await dispatch('getData')
      await dispatch('updateCart')
    },

    storeProfile: ({commit}, payload)=>{
      return new Promise(()=>{
        commit('storeProfile', payload);
      })
    },

    resetUserActObj: ({commit}, payload)=>{
      return new Promise(resolve=>{
        commit('resetUserActObj', payload);
        resolve();
      })
    },

    updateCart: ({commit})=>{
      return new Promise(()=>{
        commit('updateCart');
      })
    },

    cleanCart: ({commit}, payload)=>{
      return new Promise(()=>{
        commit('cleanCart', payload);
      })
    },

    storeLogoutTime: ({commit}, payload)=>{
      return new Promise( resolve =>{
        commit('storeLogoutTime', payload)
        resolve();
      })
    },

    makeOrder: ({commit})=>{
      return new Promise( resolve =>{
        commit('makeOrder')
        resolve();
      })
    },

    getData: ({commit})=>{
      return new Promise( ()=>{
        commit('getData');
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


