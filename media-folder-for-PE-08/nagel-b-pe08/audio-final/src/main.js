/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import { fetchData } from "./dataFetcher.js";
import * as audio from './audio.js';
import * as utils from './utils.js';
import * as canvas from './canvas.js';

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false,
    toggleLowshelf: false,
    toggleHighshelf: false
};

let title;
let tracks;
let bassValue;
let trebleValue;

fetchData('./data/av-data.json', (titleData) => title = titleData, (trackData) => tracks = trackData, (bassData) => bassValue = bassData, (trebleData) => trebleValue = trebleData);

const init = () => {
    document.title = title;
    document.querySelector("#title").innerHTML = title;

    const trackNames = Object.values(tracks).map(track => track.trackName);
    
    document.querySelector('#data-list').innerHTML = `<ul>${trackNames.map(w => `<li>${w}</li>`).join("")}</ul>`;
    
    audio.setupWebaudio(DEFAULTS.sound1);
    //console.log("init called");
    //console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "./media/New Adventure Theme.mp3"
});

const setupUI = (canvasElement) => {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#btn-fullscreen");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    // add .onclick event to button
    const playButton = document.querySelector("#btn-play");

    playButton.onclick = e => {
        //console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        //check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        //console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (e.target.dataset.playing == "no") {
            //if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; // our CSS will set the text to "Pause"
        }
        //if track is currently playing, pause it
        else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; // our CSS will set the text to "Play"
        }
    }

    //C - hookup volume slider and label
    let volumeSlider = document.querySelector("#slider-volume");
    let volumeLabel = document.querySelector("#label-volume");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        //set the gain
        audio.setVolume(e.target.value);
        //update value of label to match initial value of slider
        volumeLabel.innerHTML = Math.round((e.target.value / 2) * 100);
    }

    //set value of label to match initial value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    //D - hookup track <select>
    let trackSelect = document.querySelector("#select-track");
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        //pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    }

    //sets checked state to state of drawParams
    document.querySelector("#cb-gradient").checked = drawParams.showGradient;
    document.querySelector("#cb-bars").checked = drawParams.showBars;
    document.querySelector("#cb-circles").checked = drawParams.showCircles;
    document.querySelector("#cb-noise").checked = drawParams.showNoise;
    document.querySelector("#cb-invert").checked = drawParams.showInvert;
    document.querySelector("#cb-emboss").checked = drawParams.showEmboss;
    document.querySelector("#cb-lowshelf").checked = drawParams.toggleLowshelf;
    document.querySelector("#cb-highshelf").checked = drawParams.toggleHighshelf;

    //changes drawParams to state of checkbox on click
    document.querySelector("#cb-gradient").onclick = (e) => { drawParams.showGradient = e.target.checked };
    document.querySelector("#cb-bars").onclick = (e) => { drawParams.showBars = e.target.checked };
    document.querySelector("#cb-circles").onclick = (e) => { drawParams.showCircles = e.target.checked };
    document.querySelector("#cb-noise").onclick = (e) => { drawParams.showNoise = e.target.checked };
    document.querySelector("#cb-invert").onclick = (e) => { drawParams.showInvert = e.target.checked };
    document.querySelector("#cb-emboss").onclick = (e) => { drawParams.showEmboss = e.target.checked };
    document.querySelector("#cb-lowshelf").onclick = (e) => { drawParams.toggleLowshelf = e.target.checked; toggleLowshelf(); };
    document.querySelector("#cb-highshelf").onclick = (e) => { drawParams.toggleHighshelf = e.target.checked; toggleHighshelf(); };
} // end setupUI


const toggleLowshelf = () => {
    
    if(drawParams.toggleLowshelf){
        audio.lowBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
        audio.lowBiquadFilter.gain.setValueAtTime(bassValue, audio.audioCtx.currentTime);
    }else{
        audio.lowBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
    }
}

const toggleHighshelf = () => {
    
    if(drawParams.toggleHighshelf){
        audio.highBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
        audio.highBiquadFilter.gain.setValueAtTime(trebleValue, audio.audioCtx.currentTime);
    }else{
        audio.highBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
    }
}

const loop = () => {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    setTimeout(loop, 1000 / 60);

    canvas.draw(drawParams);


    /*
    // 1) create a byte array (values of 0-255) to hold the audio data
    // normally, we do this once when the program starts up, NOT every frame
    let audioData = new Uint8Array(audio.analyserNode.fftSize/2);
    
    // 2) populate the array of audio data *by reference* (i.e. by its address)
    audio.analyserNode.getByteFrequencyData(audioData);
    
    // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
        console.log(audioData);
        
        console.log("-----Audio Stats-----");
        let totalLoudness =  audioData.reduce((total,num) => total + num);
        let averageLoudness =  totalLoudness/(audio.analyserNode.fftSize/2);
        let minLoudness =  Math.min(...audioData); // ooh - the ES6 spread operator is handy!
        let maxLoudness =  Math.max(...audioData); // ditto!
        // Now look at loudness in a specific bin
        // 22050 kHz divided by 128 bins = 172.23 kHz per bin
        // the 12th element in array represents loudness at 2.067 kHz
        let loudnessAt2K = audioData[11]; 
        console.log(`averageLoudness = ${averageLoudness}`);
        console.log(`minLoudness = ${minLoudness}`);
        console.log(`maxLoudness = ${maxLoudness}`);
        console.log(`loudnessAt2K = ${loudnessAt2K}`);
        console.log("---------------------");
    */
}

export { init };