import { state } from "../core/state.js";
import { redraw } from "../core/engine.js";

export function loadJSON(file)
{
    const reader = new FileReader();

    reader.onload = function(event)
    {
        const data = JSON.parse(event.target.result);

        state.markers = data.markers || [];

        redraw();
    };

    reader.readAsText(file);
}