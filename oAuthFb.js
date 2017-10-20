//init
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '151288025473527',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });

    FB.AppEvents.logPageView();
    FB.getLoginStatus((res) => {
      if (res.status === 'connected') {
        document.getElementById('loginFB').empty();
      } else if (res.status === 'not_authorized') {
        // document.getElementById('status').innerHTML = 'we are not logged in';
      } else {
        // document.getElementById('status').innerHTML = 'you are not logged into Facebook';
      }
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   function login() {
     FB.login(function(res) {
      //  console.log(res);
       if (res.status === 'connected') {
         document.getElementById('status').innerHTML = 'we are connected';
       } else if (res.status === 'not_authorized') {
        //  document.getElementById('status').innerHTML = 'we are not logged in';
       } else {
        //  document.getElementById('status').innerHTML = 'you are not logged into Facebook';
       }
     });
   }

   function info() {
     FB.api('/me', 'GET', {fields: 'first_name, last_name, name, id, picture.width(150).height(150)'}, function(response) {
        document.getElementById('info').innerHTML = `Hello ${response.name}`;
        document.getElementById('image').innerHTML = "<img src='" + response.picture.data.url + "'>";
      });
   }
