function initFbSdk (){ 
  return new Promise ((resolve) => {
    (function (d,s,id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
      window.FB.init({
          appId      : '248738799749062',
          cookie     : true,
          xfbml      : true,
          version    : 'v9.0',
      });
      window.FB.AppEvents.logPageView();   
      console.log('initFbSdk')
      resolve('resolve done');
    };
  })  
}

var userProfile ={};
function profileChange(res, resolve){
  console.log('profilechange')
  if (res.status === 'connected') {
    window.FB.api("/me", "GET", { fields: 'id, name, picture' }, function (response) {
      if (response.error) {
        console.log(response);
      } else {
          let now = new Date;
          userProfile.id =  response.id;
          userProfile.name = response.name;
          userProfile.userPicURL = response.picture.data.url;
          userProfile.link = '';
          userProfile.loginTime = now.toString();
          userProfile.logoutTime = false;
          userProfile.cartIndexArr = {};
          console.log('FBlogin')
          resolve(userProfile);
        }
    });
  }else{
    userProfile.id =  '';
    userProfile.name = '請先登入';
    userProfile.userPicURL = require('@/assets/imgs/unloggined.png');
    userProfile.link = '';
    userProfile.loginTime = false;
    userProfile.logoutTime = false;
    userProfile.cartIndexArr = {};
    console.log('FBlogout');
    resolve(userProfile);
  }
}


function FBlogin(){
  return new Promise( (resolve)=>{
    window.FB.login(function(res){
      profileChange(res, resolve);
    });
  });
}


function FBlogout(){
  return new Promise( resolve =>{
    window.FB.getLoginStatus(function(res) {
      console.log(res.data)
      // if(res.status=='connected'){
        window.FB.logout(function(res){
          profileChange(res, resolve);
        });
      // }
    });
  })
}



var fbSDKMethods = {
  initFbSdk,
  profileChange,
  FBlogin,
  FBlogout,
  // manualLogin,
};

export default fbSDKMethods;




