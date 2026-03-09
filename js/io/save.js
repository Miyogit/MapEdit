import { state } from "../core/state.js";

export function saveJSON()
{

    const data = {
        markers: state.markers
    };

    const json = JSON.stringify(data,null,2);

    downloadFile(json,"map.json","application/json");

}

export function saveCSV()
{

    let csv = "x,y,type\n";

    state.markers.forEach(marker=>{
        csv += `${marker.x},${marker.y},${marker.type}\n`;
    });

    downloadFile(csv,"map.csv","text/csv");

}

function downloadFile(content,filename,type)
{

    const blob = new Blob([content],{type:type});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}