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
          version    : 'v9.0'
      });
      window.FB.AppEvents.logPageView();   
      resolve('resolve done');
    };
  })  
}

var userProfile ={};
function profileChange(res, resolve){
  console.log('profilechange')
  if (res.status === 'connected') {
    window.FB.api("/me", "GET", { fields: 'id, name, picture, link' }, function (response) {
        if (response.error) {
          console.log(response);
        } else {
          userProfile.loginStatus = true;
          userProfile.id =  response.id;
          userProfile.name = response.name;
          userProfile.userPicURL = response.picture.data.url;
          userProfile.link = 'https://www.facebook.com/juzhong.chen';
          userProfile.cartIndexArr = [];
          userProfile.cartArr = [];
          console.log('Loggined');
          resolve(userProfile);
        }
    });
  }else{
    userProfile.loginStatus = false;
    userProfile.id =  '';
    userProfile.name = '請先登入';
    userProfile.userPicURL = '';
    userProfile.link = '';
    userProfile.cartIndexArr = [];
    userProfile.cartArr = [];
    console.log('Unloggined');
    resolve(userProfile);
  }
}

// function checkLoginStatus(){
//   return new Promise( (resolve)=>{
//     setTimeout(()=>{
//       window.FB.getLoginStatus(function(res) {
//           profileChange(res, resolve)
//           console.log('check: '+res.status)
//       });
//     },500)
//   });
// }

function FBlogin(){
  return new Promise( (resolve)=>{
    window.FB.login(function(res){
      profileChange(res, resolve)
    });
  });
}

function FBlogout(){
  return new Promise( (resolve)=>{
    window.FB.getLoginStatus(function(res) {
      if(res.status!=='connect'){
        window.FB.logout(function(res){
          profileChange(res, resolve)
        });
      }
    });
  })
}

function test(){
  var nullProps = null			// null string
  console.log((nullProps==null))
  console.log((nullProps==''))
  console.log( !nullProps)
    console.log(typeof(nullProps))
    console.log(!typeof(nullProps)) 
    console.log(isNaN(nullProps))
}

var fbSDKMethods = {
  initFbSdk,
  // checkLoginStatus,
  FBlogin,
  FBlogout,
  test
};

export default fbSDKMethods;




