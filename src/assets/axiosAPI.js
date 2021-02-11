import axios from 'axios';

// User api
const userConfig = axios.create({
  baseURL: 'https://dss-v-profolio.firebaseio.com/users/'
});

// Activities api
const activityConfig = axios.create({
  baseURL: 'https://dss-v-profolio.firebaseio.com/activity'
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


