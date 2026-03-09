import { state } from "../core/state.js";
import { redraw } from "../core/engine.js";

export function redo()
{
    const op = state.redoStack.pop();

    if(!op) return;

    if(op.action==="add")
    {
        state.markers.push(op.marker);
    }

    if(op.action==="remove")
    {
        state.markers = state.markers.filter(
            m => !(m.x===op.marker.x && m.y===op.marker.y)
        );
    }

    state.undoStack.push(op);

    redraw();
}