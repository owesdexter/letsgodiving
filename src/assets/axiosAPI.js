import axios from 'axios';

// User api
const userConfig = axios.create({
  baseURL: 'https://dss-v-profolio.firebaseio.com/users/'
});

// Activities api
const activityConfig = axios.create({
  baseURL: 'https://dss-v-profolio.firebaseio.com/activity'
});

//FB Graph API
// const getToken = axios.create({
//   baseURL: ;
// });

const checkToken = axios.create({
  baseURL: 'graph.facebook.com/debug_token?'
    +'input_token='
});


// User api
export const apigetUser = userID => userConfig.get(`${userID}.json`);
export const apiUserRegister = (userID, data) => userConfig.post(`${userID}.json`, data);
// export const apiUserLogin = data => userConfig.post('/signOut', data);
// export const apiUserLogout = data => userConfig.post('/signOut', data);


// Activities api
export const apigetAct = () => activityConfig.get('.json');
export const apipostAct = act => activityConfig.post('.json', act);
export const apipatchAct = (actID, key, data) => activityConfig.patch(`${actID}/`+`${key}`, data);


//FB Graph API
// Get access_token
export const getFBToken = code => {
  return new Promise(resolve=>{
    let requestURL = 'https://graph.facebook.com/v9.0/oauth/access_token?'
      +'client_id=248738799749062'
      +'&redirect_uri=https://sheltered-cove-28264.herokuapp.com/register'
      +'&client_secret=fbfa2d392849e1a1fd7dd8164e40ba83&'
    +code;
    resolve(axios.get(requestURL))
  })
}

export const getUserFBData = accessToken =>{
  return new Promise(resolve=>{
    let requestURL = 'https://graph.facebook.com/me?'
      + 'fields=id,name,picture'
      + '&access_token=' + accessToken
    resolve(axios.get(requestURL))
  })
}

// Use graph API
// export const getUserFBData = accessToken => FBGraphAPI.get(accessToken);

// check access_token
export const checkFBToken = (inputToken, accessToken) => checkToken.get(inputToken +'&'+ accessToken);

