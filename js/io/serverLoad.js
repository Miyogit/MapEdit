import { state } from "../core/state.js";
import { redraw } from "../core/engine.js";

export async function loadFromServer()
{
    const res = await fetch("data/json/map.json");

    const data = await res.json();

    state.markers = data.markers || [];

    redraw();
}