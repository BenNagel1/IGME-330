let words1 = [];
let words2 = [];
let words3 = [];

const babbleLoaded = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    const json = JSON.parse(e.target.responseText);

    words1 = json.words1;
    words2 = json.words2;
    words3 = json.words3;

    document.querySelector("#btn-gen-1").onclick = () => generate(1);
    document.querySelector("#btn-gen-5").onclick = () => generate(5);

    generate(1);
}

const loadBabble = () => {
    const url = "/data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => babbleLoaded(e);
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

import { randomWord } from "/src/utils.js";

const generate = (num) => {
    let output = "";
    for(let i = 0; i < num; i++)
    {
        output += `${randomWord(words1)} ${randomWord(words2)} ${randomWord(words3)}<br>`;
    }
    document.querySelector("#output").innerHTML = output;
}
    
window.onload = loadBabble();