import { state } from "../core/state.js";

export async function saveToServer()
{
    const data = {
        markers: state.markers
    };

    await fetch("save_map.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });
}