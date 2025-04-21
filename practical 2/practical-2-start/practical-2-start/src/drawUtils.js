export function drawShape(ctx, shape, size, rotation) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    // save the current transformation matrix.
    ctx.save();
    
    // shift (move) the canvas drawing matrix so that we will begin drawing at the center 
    // point of the canvas using the constants above.
    ctx.translate(centerX, centerY);
    
    // rotate the canvas drawing matrix so that it uses the rotation value passed in.
    ctx.rotate(rotation);

    // begin a new path.
    ctx.beginPath();

    switch (shape) {
        case 'line':
            // draw a line so that it is as long as the size value passed in.
            // it should be centered on the origin point so that it will rotate like 
            // a propellor.
            ctx.moveTo(0, -size/2);
            ctx.lineTo(0, size/2);

            break;
        case 'square':
            // use rect to draw a square so that it will rotate around it's center point
            ctx.rect(-size/2, -size/2, size, size);

            break;
        case 'triangle':
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(size / 2, size / 2);
            ctx.lineTo(-size / 2, size / 2);
            break;
    }
    // close the path.
    ctx.closePath();

    ctx.stroke();
    // restore the previous transformation matrix.
    ctx.restore();
}
