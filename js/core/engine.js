import { renderGrid } from "../render/gridRenderer.js";
import { renderMarkers } from "../render/markerRenderer.js";

let canvas;
let ctx;

export function initEngine(c, context)
{
    canvas = c;
    ctx = context;
}

export function redraw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);

    renderGrid(ctx, canvas);

    renderMarkers(ctx);
}