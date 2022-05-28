window.addEventListener("mouseup", handleSelection);

var selectedText;

function handleSelection() {
  selectedText = window.getSelection().toString().replace(/\s/g, "");
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  let msg =
    selectedText && selectedText.length > 0
      ? selectedText
      : "_TextNotSelected_";
  sendResponse({ swor: msg });
}







window.addEventListener("onload", handleSelection2());

var selectedText2;

async function handleSelection2() {
  console.log("SOCORRO");
  selectedText2 = window.getSelection().toString().replace(".*", "");
  await pf();

}

async function pf(){
  console.log("oi");
  var myHeaders2 = new Headers();
  myHeaders2.append("Content-Type", "application/json");

  var raw2 = JSON.stringify({
    "txt": "algum ser humano arrombado sendo a mão no interfone aqui de casa! FDP"
  });

  var requestOptions2 = {
    method: 'POST',
    headers: myHeaders2,
    body: raw2,
    redirect: 'follow'
  };

  var retainData;
   await fetch("https://100tistas.duckdns.org/", requestOptions2)
     //.then(response => response)
     .then(result2 => console.log(result2.text().then(data2 => console.log(data2.response.element))))
     .catch(error2 => console.log('error', error2));

var newRetain = retainData;

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage2(message2, sender2, sendResponse2) {
  let msg2 =
    selectedText2 && selectedText2.length > 0
      ? selectedText2
      : "TextNotSelected";
  sendResponse2({ swor2: msg2 });
}
}