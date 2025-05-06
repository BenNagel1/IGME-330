/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

//imports
import { fetchData } from "./dataFetcher";
import * as audio from './audio';
import * as utils from './utils';
import * as canvas from './canvas';

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
        (trackData: Record<string, { trackName: string }>) => {
            const tracks = trackData;
            const trackNames = Object.values(tracks).map(track => track.trackName);
            const dataList = document.querySelector('#data-list');
            if (dataList) {
                dataList.innerHTML = `<ul>${trackNames.map(w => `<li>${w}</li>`).join("")}</ul>`;
            }
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
    const fsButton = document.querySelector("#btn-fullscreen") as HTMLButtonElement;

    // add .onclick event to button
    fsButton.onclick = e => {
        //console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    // add .onclick event to button
    const playButton = document.querySelector("#btn-play") as HTMLButtonElement | null;

    if (playButton) {
        playButton.onclick = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;

            // Check if context is suspended (autoplay policy)
            if (audio.audioCtx.state === "suspended") {
                audio.audioCtx.resume();
            }

            if (target.dataset.playing === "no") {
                // If track is currently paused, play it
                audio.playCurrentSound();
                target.dataset.playing = "yes"; // our CSS will set the text to "Pause"
            } else {
                // If track is currently playing, pause it
                audio.pauseCurrentSound();
                target.dataset.playing = "no"; // our CSS will set the text to "Play"
            }
        };
    }


    //C - hookup volume slider and label
    let volumeSlider = document.querySelector("#slider-volume") as HTMLInputElement;
    let volumeLabel = document.querySelector("#label-volume");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        const target = e.target as HTMLInputElement;
        //set the gain
        audio.setVolume(target.value);
        //update value of label to match initial value of slider
        volumeLabel.innerHTML = Math.round((Number(target.value) / 2) * 100).toString();
    }

    //set value of label to match initial value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    //D - hookup track <select>
    let trackSelect = document.querySelector("#select-track") as HTMLSelectElement;
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        const target = e.target as HTMLSelectElement;
        audio.loadSoundFile(target.value);
        //pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    }

    //sets checked state to state of drawParams
    // Set checked states
    (document.querySelector("#cb-gradient") as HTMLInputElement).checked = drawParams.showGradient;
    (document.querySelector("#cb-bars") as HTMLInputElement).checked = drawParams.showBars;
    (document.querySelector("#cb-circles") as HTMLInputElement).checked = drawParams.showCircles;
    (document.querySelector("#cb-noise") as HTMLInputElement).checked = drawParams.showNoise;
    (document.querySelector("#cb-invert") as HTMLInputElement).checked = drawParams.showInvert;
    (document.querySelector("#cb-emboss") as HTMLInputElement).checked = drawParams.showEmboss;
    (document.querySelector("#cb-lowshelf") as HTMLInputElement).checked = drawParams.toggleLowshelf;
    (document.querySelector("#cb-highshelf") as HTMLInputElement).checked = drawParams.toggleHighshelf;
    (document.querySelector("#cb-waveform") as HTMLInputElement).checked = drawParams.toggleWaveform;

    // Event handlers
    (document.querySelector("#cb-gradient") as HTMLInputElement).addEventListener("change", e => {
        drawParams.showGradient = (e.target as HTMLInputElement).checked;
    });
    (document.querySelector("#cb-bars") as HTMLInputElement).addEventListener("change", e => {
        drawParams.showBars = (e.target as HTMLInputElement).checked;
    });
    (document.querySelector("#cb-circles") as HTMLInputElement).addEventListener("change", e => {
        drawParams.showCircles = (e.target as HTMLInputElement).checked;
    });
    (document.querySelector("#cb-noise") as HTMLInputElement).addEventListener("change", e => {
        drawParams.showNoise = (e.target as HTMLInputElement).checked;
    });
    (document.querySelector("#cb-invert") as HTMLInputElement).addEventListener("change", e => {
        drawParams.showInvert = (e.target as HTMLInputElement).checked;
    });
    (document.querySelector("#cb-emboss") as HTMLInputElement).addEventListener("change", e => {
        drawParams.showEmboss = (e.target as HTMLInputElement).checked;
    });
    (document.querySelector("#cb-lowshelf") as HTMLInputElement).addEventListener("change", e => {
        drawParams.toggleLowshelf = (e.target as HTMLInputElement).checked;
        toggleLowshelf();
    });
    (document.querySelector("#cb-highshelf") as HTMLInputElement).addEventListener("change", e => {
        drawParams.toggleHighshelf = (e.target as HTMLInputElement).checked;
        toggleHighshelf();
    });
    (document.querySelector("#cb-waveform") as HTMLInputElement).addEventListener("change", e => {
        drawParams.toggleWaveform = (e.target as HTMLInputElement).checked;
    });

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