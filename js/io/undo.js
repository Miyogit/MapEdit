import { state } from "../core/state.js";
import { redraw } from "../core/engine.js";

export function undo()
{
    const op = state.undoStack.pop();

    if(!op) return;

    if(op.action==="add")
    {
        state.markers = state.markers.filter(
            m => !(m.x===op.marker.x && m.y===op.marker.y)
        );
    }

    if(op.action==="remove")
    {
        state.markers.push(op.marker);
    }

    state.redoStack.push(op);

    redraw();
}