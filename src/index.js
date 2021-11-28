import "../css/main.css";
import "../css/key.scss";
import "../css/octave.css";
import "../css/piano.css";
import { createPiano, octaveSelection, octaveSelected } from "./piano.js";
import { readMusicSheet, playMusicSheet } from "./music-sheet.js";

const pianoDOM = createPiano();

document.getElementById("piano").appendChild(pianoDOM);
octaveSelection(octaveSelected);

const play = document.getElementById("play");
play.disabled = true;

const pause = document.getElementById("pause");
const stop = document.getElementById("stop");

const file = document.getElementById("file");

let stopfn = function () {

};

play.onclick = function (event) {
    play.disabled = true;
    pause.style.visibility = "visible";
    pause.disabled = false;
    stop.style.visibility = "visible";
    stop.disabled = false;
    file.disabled = true;
    file.style.visibility = "hidden";
    stopfn = playMusicSheet(function () {
        play.disabled = false;
        pause.style.visibility = "hidden";
    });
    event.preventDefault();
}

pause.onclick = function (event) {
    play.disabled = false;
    pause.disabled = true;
    file.disabled = false;
    file.style.visibility = "visible";
    stopfn();
    event.preventDefault();
}


stop.onclick = function (event) {
    play.disabled = false;
    pause.disabled = true;
    file.disabled = false;
    file.style.visibility = "visible";
    stopfn();
}


file.addEventListener("click", clearFiles, false);
function clearFiles() {
document.getElementById("file").value = "";
document.getElementById("music-sheet").innerHTML = "";
play.disabled = true;

}




file.addEventListener("change", handleFiles, false);

function handleFiles() {
    

    const fileList = this.files; /* now you can work with the file list */
    stopfn();

    if (fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            readMusicSheet(contents);
            play.disabled = false;
        };
        reader.readAsText(file);
    }else{
        play.disabled = true;
    }
        

}

/* read keys from freqs.js */
/*keys.find(key => key.note === note);*/


export function soundKey(note) {


    
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var now = audioContext.currentTime;
    let mainGainNode = audioContext.createGain();
    let osc = audioContext.createOscillator();


    //mainGainNode.gain.value = 4;
    osc.type = "sine";
    osc.frequency.value = note;


    mainGainNode.gain.setValueAtTime(0, now);
    mainGainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    osc.start(now);
    mainGainNode.gain.exponentialRampToValueAtTime(0.001, now + 1);
    osc.stop(now + 1);

    //mainGainNode.gain.linearRampToValueAtTime(0, now);
    //mainGainNode.gain.linearRampToValueAtTime(.6, now + .1);
    //mainGainNode.gain.linearRampToValueAtTime(0, now + 1);


    //mainGainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.5);
    osc.connect(mainGainNode);
    
    
    //osc.frequency.value = 51.913087197493142;
    mainGainNode.connect(audioContext.destination);
    //osc.start(0);
    
    setTimeout(function () {
        osc.stop();
    }, 1500)
}
