import { state } from "../core/state.js";
import { GRID_SIZE } from "../config.js";

export function renderMarkers(ctx)
{

    state.markers.forEach(marker=>{

        if(marker.type==="enemy")
        {
            ctx.fillStyle="red";
        }

        if(marker.type==="treasure")
        {
            ctx.fillStyle="yellow";
        }

        if(marker.type==="npc")
        {
            ctx.fillStyle="blue";
        }

        const px = marker.x*GRID_SIZE + GRID_SIZE/2;
        const py = marker.y*GRID_SIZE + GRID_SIZE/2;

        ctx.beginPath();
        ctx.arc(px,py,6,0,Math.PI*2);
        ctx.fill();

    });

}