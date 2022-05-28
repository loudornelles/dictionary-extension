let query = { active: true, currentWindow: true };

chrome.tabs.query(query, gotTabs);
function gotTabs(tabs) {
  let msg = {
    txt: "hello from popup",
  };

  chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
    if (!response) {
      document.getElementById("phonetic").innerHTML = "Bem-Vindo!";
      document.getElementById("example").innerHTML =
        "Selecione sua palavra.";
    } else if (response.swor === "_TextNotSelected_") {
      document.getElementById("error").innerHTML = "Selecione uma palavra!";
    } else {
      let swo = response.swor;
      swo = swo.replace(/[^a-zA-Z ]/g, "");
      dictionary(swo);
    }
  });
}

let wordef,
  word,
  phonetic,
  pos,
  defin,
  example,
  index = 0,
  indlimit;

async function dictionary(query) {
  let url = `http://localhost:3333/v2/${query}`;
  let response = await fetch(url);
  wordef = await response.json();
  if (wordef && !wordef.title) {
    indlimit = wordef[0].meanings.length;
    word = query;
    phonetic = wordef[0].partOfSpeech ? wordef[0].partOfSpeech : "";
    index = 0;

    setValues();

    if (indlimit > 1) {
      document
        .getElementById("navigatecontainer")
        .classList.remove("hidenavigator");
    }
  } else if (wordef.title) {
    document.getElementById("error").innerHTML = "⚠  " + wordef.title;
  }
}

document.getElementById("prev").addEventListener("click", handlePrevious);
document.getElementById("next").addEventListener("click", handleNext);

function handlePrevious() {
  index = index - 1;
  if (index < 0) index = indlimit - 1;
  setValues();
}

function handleNext() {
  index = index + 1;
  if (index >= indlimit) index = 0;
  setValues();
}

function setValues() {
  pos = wordef[0].partOfSpeech;
  defin = wordef[0].meanings[index];
  example = wordef[0].etymology
    ? wordef[0].etymology
    : null;

  document.getElementById(
    "word"
  ).innerHTML = `${word}`;
  document.getElementById("phonetic").innerHTML = `${phonetic}  (${pos})`;
  document.getElementById("definition").innerHTML = defin;
  if (example) {
    document.getElementById("example").innerHTML = `Example: ${example}`;
  } else {
    document.getElementById("example").innerHTML = "";
  }
}
