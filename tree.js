const MAX_DEPTH = 12;

const canvas = document.querySelector('#canvas');

const toRad = (angDeg) => angDeg * Math.PI / 180;

function randomInt(min, max) {
    const c = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - c) + c);
}

function draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    branch(ctx, canvas.width / 2, canvas.height, -90, 12, 180);
}

function branch(context, startX, startY, angle, depth, length) {
    if (depth === 0) return;

    const r = randomInt(-10, 10)

    const endX = startX + length * Math.cos(toRad(angle + r));
    const endY = startY + length * Math.sin(toRad(angle + r));

    const c = 255 - Math.ceil(255 * (depth / MAX_DEPTH));
    context.beginPath();
    context.lineWidth = depth / 3;
    context.strokeStyle = `rgb(${c}, 150, 0)`
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

    branch(context, endX, endY, angle - 20, depth - 1, length * 0.75);
    branch(context, endX, endY, angle + 20, depth - 1, length * 0.75);
}


if (!canvas.getContext) {
    alert("Canvas não disponível!")
} else {
    draw(canvas.getContext('2d'));
}
