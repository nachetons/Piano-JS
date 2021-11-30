import "../css/music-sheet.css";
import { playKey } from "./piano.js";
import { soundKey, soundPartiture } from "./index.js";
import {keys} from "./freqs.js";
import {duration} from "./duracionNota";




//export const musicSheet = "A1,C#3,B1,C4,F5,C3,A#2,C1";

export function readMusicSheet(musicSheet) {

    const musicSheetDOM = document.getElementById("music-sheet");
    musicSheetDOM.classList.add("music-sheet");
    const keys = musicSheet.split("\n");



    
    const arrayDuration = [];
    keys.forEach(key => {
        arrayDuration.push(key.split(",")[1]);


    });
    let durationstr = arrayDuration.toString();
    console.log(durationstr);

    durationstr = durationstr.replace(/1/g,3000);
    durationstr = durationstr.replace(/2/g,6000);
    durationstr = durationstr.replace(/3/g,12000);
    durationstr = durationstr.replace(/4/g,1500);
    durationstr = durationstr.replace(/5/g,750);

    durationstr = durationstr.split(",");

    console.log(durationstr);


    keys.forEach(key => {
        const keyDOM = document.createElement("li");
        keyDOM.classList.add("music-sheet-key");
        keyDOM.innerHTML = key;
        musicSheetDOM.appendChild(keyDOM);

    });




}

let actualKeyIndex = 0;

export function playMusicSheet(callback) {
    const musicSheetDOM = document.getElementById("music-sheet");
    const musicSheetKeysDOM = musicSheetDOM.childNodes;

        const musicSheetKeyDOM = musicSheetKeysDOM[actualKeyIndex];
        musicSheetKeyDOM.classList.add("play");
        const key = musicSheetKeyDOM.innerText;
        /* call function soundKey and pass variable key */

        const note = key.split(",")[0];
        const durationnote = key.split(",")[1];


        console.log(note);
        console.log(duration[durationnote]);
        if (note === "") {

            console.log("vacio");
        }else{
        //soundPartiture(keys[note], duration[durationnote]);
        soundKey(keys[note]);

        playKey(note, true);
        setTimeout(function () {
            playKey(note, false);
            musicSheetKeyDOM.classList.remove("play");
            
        },duration[durationnote]);
    }


     
    actualKeyIndex++;

        

      

        if (actualKeyIndex == musicSheetKeysDOM.length) {
            //clearInterval(interval);
            actualKeyIndex = 0;
            callback();
            clearTimeout(interval);
        }

        setTimeout(playMusicSheet, duration[durationnote],callback);

    return function stop() {
        //clearInterval(interval);
    };

}
