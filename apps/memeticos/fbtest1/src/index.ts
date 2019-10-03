const w = window as any
// function checkLoginState () {
//   FB.getLoginStatus(function(response) {
//     // statusChangeCallback(response);
//   });
// }

  w.fbAsyncInit = function() {
    FB.init({
      appId      : '2246202458836277',
      cookie     : true,
      xfbml      : true,
      version    : 'v4.0'
    });
      
    FB.AppEvents.logPageView();   

  };

      export function login() {
        return new Promise(resolve=>{
FB.getLoginStatus(function(response) {
  response.status==='connected' && resolve()
  if(response.status==='not_authorized'){
    FB.login(response=>{
      console.log(response);
 resolve(response)
    })
  }
  // console.log(response);
  
  // document.getElementById('log')!.innerHTML = JSON.stringify(response)
    // statusChangeCallback(response);
});
        })
      }
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0]as any
     if (d.getElementById(id)) {return;}
     js = d.createElement(s) as any
     js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));