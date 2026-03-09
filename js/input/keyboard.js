import { state } from "../core/state.js";
import { undo } from "../io/undo.js";
import { redo } from "../io/redo.js";

export function initKeyboard(canvas)
{

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

        if(e.ctrlKey && e.key==="z")
        {
            undo();
        }

        if(e.ctrlKey && e.key==="y")
        {
            redo();
        }
    });
}

