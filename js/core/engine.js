import { renderGrid } from "../render/gridRenderer.js";
import { renderMarkers } from "../render/markerRenderer.js";
import { state } from "./state.js";

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

    // スケール変更.
    ctx.save();

    ctx.translate(state.offsetX, state.offsetY);
    ctx.scale(state.zoom, state.zoom);

    // 描画.
    renderGrid(ctx);
    renderMarkers(ctx);

    // 保存.
    ctx.restore();
}