import { initEngine, redraw } from "./core/engine.js";
import { initMouse } from "./input/mouse.js";
import { initKeyboard } from "./input/keyboard.js";
import { saveJSON, saveCSV } from "./io/save.js";
import { loadJSON } from "./io/load.js";
import { loadFromServer } from "./io/serverLoad.js";

async function start()
{
    const canvas = document.getElementById("map");
    const ctx = canvas.getContext("2d");

    initEngine(canvas, ctx);

    initMouse(canvas);
    initKeyboard(canvas);

    // サーバーから前回データをロード
    await loadFromServer();

    redraw();

    // 保存ボタン
    document.getElementById("saveJson").onclick = saveJSON;
    document.getElementById("saveCsv").onclick = saveCSV;

    // JSONロード
    const loadButton = document.getElementById("loadJson");
    const fileLoader = document.getElementById("fileLoader");

    loadButton.onclick = () => {
        fileLoader.click();
    };

    fileLoader.onchange = (e) => {
        const file = e.target.files[0];
        loadJSON(file);
    };
}

// アプリ起動
start();