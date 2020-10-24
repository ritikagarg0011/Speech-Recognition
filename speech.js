let button = document.querySelector("button");
button.addEventListener("click", (e) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition; //SpeechRecognition is for mozilla and webkitSpeechRecognition is for chrome

  let recognition = new SpeechRecognition();
  recognition.interimResults = true; //interimResults gives good results

  let p = document.createElement("p");
  let words = document.querySelector(".words");
  words.appendChild(p);

  recognition.addEventListener("result", (e) => {
    button.innerHTML = "Speak";
    console.log(e); //check whether it is triggering or not, we will get an object
    console.log(e.results); //to get the results property of e object
    let transcript = [...e.results] //converting to an array to iterate the items
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    p.textContent = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement("p");
      words.appendChild(p);
    } else {
      console.log(transcript);
    }
  });
  recognition.addEventListener("end", recognition.start);
  recognition.start();
});
