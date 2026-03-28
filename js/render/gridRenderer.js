import { GRID_SIZE } from "../config.js";
import { state } from "../core/state.js";

export function renderGrid(ctx)
{
    const width = 2000;
    const height = 2000;

    ctx.beginPath();

    for(let x = 0; x < width; x += GRID_SIZE)
    {
        ctx.moveTo(x,0);
        ctx.lineTo(x,height);
    }

    for(let y = 0; y < height; y += GRID_SIZE)
    {
        ctx.moveTo(0,y);
        ctx.lineTo(width,y);
    }

    ctx.stroke();
}