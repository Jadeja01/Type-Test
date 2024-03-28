let errors=document.querySelector("#errors");
let time=document.querySelector("#time");
let accuracy=document.querySelector("#accuracy");
let wpm=document.querySelector("#wpm");
let cpm=document.querySelector("#cpm");
let wpmclass=document.querySelector(".wpm");
let cpmclass=document.querySelector(".cpm");
let genText=document.querySelector(".gentext");
let textarea=document.querySelector("#textarea");
let restart=document.querySelector("#restart");

let TIME_LEFT=60;
let time_left=TIME_LEFT;
let timeElapsed=0;
let index=0;
let current_quote = "";
let writeText;
let characterTyped=0;
let errs=0;
let total_errors=0;
let timer=null;

const random_quotes=["A DREAM written down with a date becomes a GOAL.","So This Is My Life.","I try to be strong - then intelligent!","A musician must make music, an artist must paint, a poet must write, if he is to be ultimately at peace with himself. What a man can be, he must be"];

function updateQuote(){
    genText.textContent = null;
    current_quote=random_quotes[index];
    current_quote.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        genText.appendChild(charSpan);
      });

    if(index<random_quotes.length - 1){
        index++;
    }
    else{
        index=0;
    }  
}

function captureText(){
    wroteText=textarea.value;
    wroteText_array=wroteText.split("");
    characterTyped++;
    errs = 0;

    quoteSpanArray = genText.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = wroteText_array[index];

    // character not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct character
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");

      // incorrect character
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      // increment number of errors
      errs++;
    }
  });

  errors.textContent=total_errors+errs;
  let correctCharacters = characterTyped - (total_errors + errs);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy.textContent = Math.round(accuracyVal)+"%";

  if(current_quote.length ==wroteText.length){
    updateQuote();
    textarea.value=null;
  }
}

function startGame(){
  resetvalue();
    updateQuote();
    clearInterval(timer);
    timer=setInterval(() => {
      timetaken();
    }, 1000);
}

function timetaken() {
  if(time_left>0){
    time_left--;
    timeElapsed++;
    time.textContent=time_left+"s";

  }
  else{
    finishGame();
  }
}

function finishGame(){
  clearInterval(timer);
  restart.style.display = "block";
  textarea.disabled=true
  cpmVal = Math.round((characterTyped / timeElapsed) * 60);
  wpmVal = Math.round((characterTyped / 5 / timeElapsed) * 60);
  cpm.textContent = cpmVal;
  wpm.textContent = wpmVal;
  cpm.style.display = "block";
  cpmclass.style.display = "grid";
  wpmclass.style.display = "grid";
  wpmclass.style.placeItems = "center";
  cpmclass.style.placeItems = "center";
  wpm.style.display = "block";
}
function resetvalue(){
  errs=0;
  accuracyVal=100+'%'
  errors.textContent=errs;
  accuracy.textContent=accuracyVal;
  total_errors=0;
  textarea.disabled=false;
  time_left=TIME_LEFT;
  time.textContent=time_left +"s";
  textarea.value="";
  genText.textContent="Click below textarea to start testing...";
  time_left=TIME_LEFT;
  restart.style.display = "none";
  cpm.style.display = "none";
  wpm.style.display = "none";
  cpmclass.style.display = "none";
  wpmclass.style.display = "none";
}












































