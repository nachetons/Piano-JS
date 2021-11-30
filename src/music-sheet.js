import "../css/music-sheet.css";
import { playKey } from "./piano.js";
import { soundKey, soundPartiture } from "./index.js";
import { keys } from "./freqs.js";
import { duration } from "./duracionNota";




//export const musicSheet = "A1,C#3,B1,C4,F5,C3,A#2,C1";

export function readMusicSheet(musicSheet) {
    musicSheet = musicSheet.trim();
    const musicSheetDOM = document.getElementById("music-sheet");
    musicSheetDOM.classList.add("music-sheet");
    const keys = musicSheet.split("\n");






    keys.forEach(key => {
        const keyDOM = document.createElement("li");
        keyDOM.classList.add("music-sheet-key");
        keyDOM.innerHTML = key;
        musicSheetDOM.appendChild(keyDOM);

    });




}

let actualKeyIndex = 0;
var playPiano;
var playPiano2;


export function playMusicSheet(callback) {
    const musicSheetDOM = document.getElementById("music-sheet");
    const musicSheetKeysDOM = musicSheetDOM.childNodes;

    const musicSheetKeyDOM = musicSheetKeysDOM[actualKeyIndex];
    musicSheetKeyDOM.classList.add("play");
    const key = musicSheetKeyDOM.innerText;
    /* call function soundKey and pass variable key */
   


    if (key.includes('||') || key.includes('|')) {
        const acorde = key.split("||");
        acorde.forEach(acorde => {
            const note = acorde.split(",")[0];
            const durationnote = acorde.split(",")[1];
            soundPartiture(keys[note], duration[durationnote]);
            playKey(note, true);
            setTimeout(() => {
                playKey(note, false);
                musicSheetKeyDOM.classList.remove("play");
            }, duration[durationnote]);
            playPiano = setTimeout(playMusicSheet, duration[durationnote], callback);

        });
        clearTimeout(playPiano);
        clearTimeout(playPiano2);
        console.log(key);

        //soundKey(keys[acorde]);


    } else {

            const note = key.split(",")[0];
            const durationnote = key.split(",")[1];

            //soundPartiture(keys[note], duration[durationnote]);


            soundPartiture(keys[note], duration[durationnote]);

            playKey(note, true);
            playPiano = setTimeout(function () {
                playKey(note, false);
                musicSheetKeyDOM.classList.remove("play");

            }, duration[durationnote]);


            playPiano2 = setTimeout(playMusicSheet, duration[durationnote], callback);
        
    }

    actualKeyIndex++;


 
        
    if (actualKeyIndex >= musicSheetKeysDOM.length) {
        clearTimeout(playPiano);
        clearTimeout(playPiano2);
        actualKeyIndex = 0;
        playPiano = null;
        playPiano2 = null;
        callback();

    }



    return function stop() {
        //clearInterval(interval);
        clearTimeout(playPiano);
        clearTimeout(playPiano2);
        actualKeyIndex = 0;
        playPiano = null;
        playPiano2 = null;
        callback();




    };

}
