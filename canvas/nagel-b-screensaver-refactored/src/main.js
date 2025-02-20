import { getRandomColor, getRandomInt } from "./utils.js";
import { drawRectangle, drawArc, drawLine } from "./canvas-utils.js";

let ctx;
let paused = false;
let canvas;
let createRectangles = true;
let createArcs = true;
let createLines = true;

const drawRandomRect = () => {
    drawRectangle(ctx, getRandomInt(0, 570), getRandomInt(0, 410), getRandomInt(25, 100), getRandomInt(25, 100), getRandomColor(), getRandomInt(1, 5), getRandomColor())
}

const drawRandomArc = () => {
    drawArc(ctx, getRandomInt(0, 570), getRandomInt(0, 410), getRandomInt(5, 25), getRandomColor(), getRandomInt(1, 5), getRandomColor());
}

const drawRandomLine = () => {
    drawLine(ctx, getRandomInt(0, 570), getRandomInt(0, 410), getRandomInt(0, 570), getRandomInt(0, 410), getRandomInt(1, 5), getRandomColor());
}

const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);

    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(5, 15);
        let color = getRandomColor();
        drawArc(ctx, x, y, radius, color);
    }
}

const setupUI = () => {
    document.querySelector("#btn-pause").onclick = () => { paused = true; };
    document.querySelector("#btn-play").onclick = () => { if (paused) { paused = false; update(); } };

    document.querySelector("#btn-clear").onclick = () => { ctx.clearRect(0, 0, 1000, 1000); };

    canvas.onclick = canvasClicked;

    document.querySelector("#cb-rectangles").onclick = (e) => { createRectangles = e.target.checked };
    document.querySelector("#cb-arcs").onclick = (e) => { createArcs = e.target.checked };
    document.querySelector("#cb-lines").onclick = (e) => { createLines = e.target.checked };
}

const update = () => {
    if (paused) return;
    requestAnimationFrame(update);
    if (createRectangles)
        drawRandomRect();
    if (createArcs)
        drawRandomArc();
    if (createLines)
        drawRandomLine();
}

const init = () => {
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!

    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");

    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");

    //background
    drawRectangle(ctx, 20, 20, 600, 440, "red");

    // rect
    drawRectangle(ctx, 120, 120, 400, 300, "yellow", 10, "magenta");

    // lines
    drawLine(ctx, 20, 20, 620, 460, 10, "green");
    drawLine(ctx, 620, 20, 20, 460, 10, "green");
    drawLine(ctx, 20, 400, 620, 400, 20, "green");

    // arc
    drawArc(ctx, 320, 240, 50, "blue", 10, "navy");

    // semi-circle arc
    drawArc(ctx, 320, 240, 25, "aqua", 5, "gray", 0, Math.PI);

    //eyes
    drawArc(ctx, 300, 220, 10, "white", 5, "gray");
    drawArc(ctx, 340, 220, 10, "white", 5, "gray");

    setupUI();
    update();
}

init();