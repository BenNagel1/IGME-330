/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

//imports
import { fetchData } from "./dataFetcher.js";
import * as audio from './audio.js';
import * as utils from './utils.js';
import * as canvas from './canvas.js';

//parameters from the checkboxes
const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false,
    toggleLowshelf: false,
    toggleHighshelf: false,
    toggleWaveform: false
};

//used to store the data from the json file
let title;
let tracks;
let bassValue;
let trebleValue;

const init = () => {

    //fetches, stores, and uses the data from the json file
    fetchData('./data/av-data.json',
        (titleData) => {
            title = titleData
            document.title = title;
            document.querySelector("#title").innerHTML = title;
        },
        (trackData) => {
            tracks = trackData
            const trackNames = Object.values(tracks).map(track => track.trackName);
            document.querySelector('#data-list').innerHTML = `<ul>${trackNames.map(w => `<li>${w}</li>`).join("")}</ul>`;
        },
        (bassData) => {
            bassValue = bassData
        },
        (trebleData) => {
            trebleValue = trebleData
        });

    audio.setupWebaudio(DEFAULTS.sound1);
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
        //console.log("goFullscreen() called");
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
    document.querySelector("#cb-waveform").checked = drawParams.toggleWaveform;

    //changes drawParams to state of checkbox on click
    document.querySelector("#cb-gradient").onclick = (e) => { drawParams.showGradient = e.target.checked };
    document.querySelector("#cb-bars").onclick = (e) => { drawParams.showBars = e.target.checked };
    document.querySelector("#cb-circles").onclick = (e) => { drawParams.showCircles = e.target.checked };
    document.querySelector("#cb-noise").onclick = (e) => { drawParams.showNoise = e.target.checked };
    document.querySelector("#cb-invert").onclick = (e) => { drawParams.showInvert = e.target.checked };
    document.querySelector("#cb-emboss").onclick = (e) => { drawParams.showEmboss = e.target.checked };
    document.querySelector("#cb-lowshelf").onclick = (e) => { drawParams.toggleLowshelf = e.target.checked; toggleLowshelf(); };
    document.querySelector("#cb-highshelf").onclick = (e) => { drawParams.toggleHighshelf = e.target.checked; toggleHighshelf(); };
    document.querySelector("#cb-waveform").onclick = (e) => { drawParams.toggleWaveform = e.target.checked };
} // end setupUI


//turns on/off the bass filter
const toggleLowshelf = () => {

    if (drawParams.toggleLowshelf) {
        audio.lowBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
        audio.lowBiquadFilter.gain.setValueAtTime(bassValue, audio.audioCtx.currentTime);
    } else {
        audio.lowBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
    }
}

//turns on/off the treble filter
const toggleHighshelf = () => {

    if (drawParams.toggleHighshelf) {
        audio.highBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
        audio.highBiquadFilter.gain.setValueAtTime(trebleValue, audio.audioCtx.currentTime);
    } else {
        audio.highBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
    }
}

//loops the draw method at 60fps
const loop = () => {
    setTimeout(loop, 1000 / 60);
    canvas.draw(drawParams);
}

export { init, drawParams };