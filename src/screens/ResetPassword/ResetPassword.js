import React, {useEffect} from "react";

const ResetPasswordTest = () => {
  const getMobileOperatingSystem = (token) => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    console.log("here");

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    var token;

    if (/android/i.test(userAgent)) {
      console.log("is android");
      window.location.href = "unitydl://redirect?token=" + token;
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
    console.log("is not android");
    return "Web";
  };

  const getParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let token = params.token; // "some_value"
    // document.getElementById("device").innerHTML = g  etMobileOperatingSystem(token)
    console.log(token);
    console.log(getMobileOperatingSystem(token));
    // document.getElementById("device").innerHTML = getMobileOperatingSystem(token);
    
    window.location.href=`unitydl://redirect?token=${token}`
    // var a = document.getElementById("myLink");

    // a.setAttribute("href", "unitydl://redirect?token=" + token);
  };

  useEffect(()=>{
    getParam()
  },[])

  return (
    <div className="container-lg">
      {" "}
      <p id="device" className="text-white">Redirect</p>
      {/* <a id="myLink" href="#"> */}
        <h1 className="text-white">Reset your password</h1>
      {/* </a> */}
    </div>
  );
};
export default ResetPasswordTest;
