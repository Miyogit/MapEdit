import { GRID_SIZE } from "../config.js";
import { state } from "../core/state.js";
import { redraw } from "../core/engine.js";
import { createMarker } from "../map/marker.js";
import { saveToServer } from "../io/serverSave.js";

export function initMouse(canvas)
{

    // 右クリック or 中クリックでドラッグ
    canvas.addEventListener("mousedown", (e) => {

        if (e.button === 1 || e.button === 2) // 中 or 右
        {
            
            console.log("DragOn");
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    canvas.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        state.offsetX += dx;
        state.offsetY += dy;

        lastX = e.clientX;
        lastY = e.clientY;

        redraw();
    });

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    });

    canvas.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // 右クリックメニュー禁止
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());

    canvas.addEventListener("click",(event)=>{

    const rect = canvas.getBoundingClientRect();

    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;

    // 👇 ここが追加ポイント（ズーム＋パン対応）
    const worldX = (screenX - state.offsetX) / state.zoom;
    const worldY = (screenY - state.offsetY) / state.zoom;

    const gridX = Math.floor(worldX / GRID_SIZE);
    const gridY = Math.floor(worldY / GRID_SIZE);

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

        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;

        // カメラ逆変換
        const worldX = (screenX - state.offsetX) / state.zoom;
        const worldY = (screenY - state.offsetY) / state.zoom;

        const gx = Math.floor(worldX / GRID_SIZE);
        const gy = Math.floor(worldY / GRID_SIZE);


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

    // ズームインアウト
    canvas.addEventListener("wheel", (e) => {

        e.preventDefault();

        const zoomSpeed = 0.1;


        console.log("state.zoom_before:", state.zoom);
        if (e.deltaY < 0)
        {
            state.zoom += zoomSpeed;
        }
        else
        {
            state.zoom -= zoomSpeed;
        }
        console.log("state.zoom_after:", state.zoom);

        if (state.zoom < 0.2) state.zoom = 0.2;
        if (state.zoom > 5) state.zoom = 5;

        redraw();

    });
}

