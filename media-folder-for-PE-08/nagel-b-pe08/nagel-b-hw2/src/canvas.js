/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import { drawParams } from './main.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;

//sprite class used for the surf boards
class EllipseSprite {
    constructor(x, y, width, height, fill, stroke, wave) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.wave = wave;
    }

    //updates position of the ellipse to match a wave's
    update(waveX, waveY) {
        this.x = waveX;
        this.y = waveY;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = 5;
        ctx.ellipse(this.x, this.y, this.width, this.height, Math.PI / 2, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

let sprites = [];

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "#1F214D" }, { percent: .5, color: "#BF3475" }, { percent: 1, color: "#EE6C45" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    //creates the 2 sprite instances (surf boards)
    sprites[0] = new EllipseSprite(100, 100, 25, 50, "red", "darkred", 20);
    sprites[1] = new EllipseSprite(100, 100, 25, 50, "lime", "green", 70);
}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 

    //toggles waveform/frequency data visualization
    if (drawParams.toggleWaveform)
        analyserNode.getByteTimeDomainData(audioData);
    else
        analyserNode.getByteFrequencyData(audioData);

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;

        //creates a pulsing sun based on the audio
        for (let i = 0; i < audioData.length; i++) {
            
            let percent = audioData[i] / 255;
            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 0, .34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 150, 0, .10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 250, 0, .5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 3, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }

        ctx.restore();
    }

    // 4 - draw bars
    if (params.showBars) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length * 2;
        let barHeight = 350;
        let topSpacing = 150;

        ctx.save();
        ctx.strokeStyle = `rgba(22, 105, 138, 0.5)`;
        ctx.lineWidth = 4;
        //loop through the data and draw
        for (let i = 0; i < audioData.length; i++) {
            //gradient for the water color
            ctx.fillStyle = `rgba(80, ${200 - i * 2}, 255, .8)`;

            ctx.fillRect(i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
            ctx.strokeRect(i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);

            //changes the x and y of the surf boards based on the wave they are on
            for (let sprite of sprites) {
                if (i == sprite.wave) {
                    sprite.update(i * (barWidth + barSpacing), topSpacing + 256 - audioData[i]);
                }
            }
        }
        ctx.restore();

        //draws the boards only if the wave they are on is visible
        for (let sprite of sprites) {
            if (sprite.y < 400)
                sprite.draw(ctx);
        }

        //draw beach (part of bars because it looks best with them on too)
        
        //gets average wave size
        let average = 0;
        for(let data of audioData){
            average += data;
        }
        average /= audioData.length;

        ctx.save();
        ctx.fillStyle = "#e1bf92";
        ctx.strokeStyle = "#b08d5f";
        ctx.lineWidth = 5;

        //only draws the beach if there are waves on the screen too
        if (average > 50)
            ctx.globalAlpha = 1;
        else
            ctx.globalAlpha = average / 50;
        ctx.beginPath();
        ctx.moveTo(-50, 375);
        ctx.bezierCurveTo(-50, 367, 100, 343, 190, 342);
        ctx.bezierCurveTo(250, 341, 400, 374, 500, 374);
        ctx.bezierCurveTo(730, 351, 750, 340, 850, 375);
        ctx.lineTo(850, 475);
        ctx.lineTo(-50, 475);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; //not using here

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < .05) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 0; // zero out the red and green and blue channels
            data[i] = 255; // make the red channel 100% red
            data[i + 1] = 255; // make the green channel 100% green
            data[i + 2] = 255; // make the blue channel 100% blue
        } // end if
        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red; // set red
            data[i + 1] = 255 - green; // set green
            data[i + 2] = 255 - blue; // set blue
        }
    } // end for

    //note we are stepping through *each* sub-pixel
    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue; //skip alpha
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }

    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
    //console.log(params.showInvert);
}

export { setupCanvas, draw };