import axios from 'axios';

//redirect URL
// const redirectURL = 'https://sheltered-cove-28264.herokuapp.com/register';
const redirectURL = 'https://localhost:8080/register'

// User api
const userConfig = axios.create({
  baseURL: 'https://dss-v-profolio.firebaseio.com/users/'
});

// Activities api
const activityConfig = axios.create({
  baseURL: 'https://dss-v-profolio.firebaseio.com/activity'
});

//FB Graph API
const checkToken = axios.create({
  baseURL: 'graph.facebook.com/debug_token?'
    +'input_token='
});


// User api
export const apigetUser = userID => userConfig.get(`${userID}.json`);
export const apiUserRegister = (userID, data) => userConfig.post(`${userID}.json`, data);



// Activities api
export const apigetAct = () => activityConfig.get('.json');
export const apipostAct = act => activityConfig.post('.json', act);
export const apipatchAct = (actID, data) => activityConfig.patch(`${actID}.json`, data);


//FB Graph API
// Get access_token
export const getFBToken = code => {
  return new Promise(resolve=>{
    let requestURL = 'https://graph.facebook.com/v9.0/oauth/access_token?'
      +'client_id=248738799749062'
      +'&redirect_uri=' + redirectURL
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


// check access_token
export const checkFBToken = (inputToken, accessToken) => checkToken.get(inputToken +'&'+ accessToken);

