function captureFPAuth() {
  var port;
  var urlStr = "";

  urlStr = "http://localhost:11100/rd/capture";

  getJSONCapture(urlStr, function (err, data) {
    if (err != null) {
      alert("Something went wrong: " + err);
    } else {
      alert("Response:-" + String(data));
    }
  });
}
var getJSONCapture = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("CAPTURE", url, true);
  xhr.responseType = "text"; //json
  var InputXml = `<PidOptions> <Opts fCount\"1\" fType=\"0\" iCount=\"0\"  pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\"
   posh=\"UNKNOWN\" env=\"S\" wadh=\"\" /> <Demo></Demo> <CustOpts> <Paramname=\"ValidationKey\" value=\"\" /> </CustOpts> </PidOptions>`;
  xhr.onload = function () {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send(InputXml);
};
captureFPAuth();
