import { GRID_SIZE } from "../config.js";
import { state } from "../core/state.js";

export function renderGrid(ctx,canvas)
{

    ctx.strokeStyle = "#ccc";

    for(let x=0;x<=canvas.width;x+=GRID_SIZE)
    {
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }

    for(let y=0;y<=canvas.height;y+=GRID_SIZE)
    {
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }

    if(state.selectedCell)
    {
        ctx.fillStyle="rgba(0,0,255,0.3)";

        ctx.fillRect(
            state.selectedCell.x*GRID_SIZE,
            state.selectedCell.y*GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE
        );
    }

}