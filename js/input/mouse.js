import { GRID_SIZE } from "../config.js";
import { state } from "../core/state.js";
import { redraw } from "../core/engine.js";
import { createMarker } from "../map/marker.js";
import { saveToServer } from "../io/serverSave.js";

export function initMouse(canvas)
{

    canvas.addEventListener("click",(event)=>{

        const rect = canvas.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const gridX = Math.floor(mouseX / GRID_SIZE);
        const gridY = Math.floor(mouseY / GRID_SIZE);

        // 選択マス
        state.selectedCell = {x:gridX,y:gridY};

        // マーカー作成
        const marker = createMarker(gridX,gridY,state.currentMarkerType);

        // stateに追加
        state.markers.push(marker);

        state.undoStack.push({
            action:"add",
            marker: marker
        });

        state.redoStack = [];

        console.log("Marker added:",gridX,gridY);

        redraw();

        saveToServer();

    });

    canvas.addEventListener("contextmenu",(e)=>{

        e.preventDefault();

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gx = Math.floor(x/GRID_SIZE);
        const gy = Math.floor(y/GRID_SIZE);
;

        // マーカー削除
        const removed = state.markers.find(m => m.x===gx && m.y===gy);
        if(removed)
        {
            console.log("Delete:",gx,gy)

            state.markers = state.markers.filter(m => !(m.x===gx && m.y===gy));

            state.undoStack.push({
                action:"remove",
                marker: removed
            });

            state.redoStack = [];
       
            redraw();

            saveToServer();
        }


    });

    window.addEventListener("keydown",(e)=>{

        if(e.key==="1")
        {
            state.currentMarkerType="enemy";
            console.log("mode: enemy");
        }

        if(e.key==="2")
        {
            state.currentMarkerType="treasure";
            console.log("mode: treasure");
        }

        if(e.key==="3")
        {
            state.currentMarkerType="npc";
            console.log("mode: npc");
        }

    });
}

