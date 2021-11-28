import { soundKey } from "./index.js";
import {keys} from "./freqs.js";
export const musicNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const allDOMKeys = {};

export function genPianoKeys() {
    let pianoKeys = [];

    for (let octave = 0; octave <= 8; octave++) {
        const octaveKeys = [];
        for (let musicNote of musicNotes) {
            octaveKeys.push(musicNote + octave);
        }
        if (octave == 0) {
            octaveKeys.splice(0, 9)
        }

        if (octave == 8) {
            octaveKeys.splice(1)
        }
        pianoKeys.push(octaveKeys);
    }
    return pianoKeys;
}


export let octaveSelected = 1;

const pianoKeyWhiteTemplate = document.createElement("li");
pianoKeyWhiteTemplate.classList.add("white", "key");

const pianoKeyBlackTemplate = document.createElement("li");
pianoKeyBlackTemplate.classList.add("black", "key");

function createPianoKey(key) {
    const pianoKeyDOM = key.includes("#") ?
        pianoKeyBlackTemplate.cloneNode() :
        pianoKeyWhiteTemplate.cloneNode();

    pianoKeyDOM.dataset.key = key;
    return pianoKeyDOM;
}

function createPianoOctave(octave) {
    const pianoOctave = document.createElement("ul");

    octave.forEach(key => {
        const pianoKey = createPianoKey(key);
        allDOMKeys[key] = pianoKey;
        pianoOctave.appendChild(pianoKey);
    });

    const pianoOctaveContainer = document.createElement("li");
    pianoOctaveContainer.classList.add("octave");
    pianoOctaveContainer.appendChild(pianoOctave);

    return pianoOctaveContainer;
}

export function createPiano() {
    const pianoDOM = document.createElement("ul");
    pianoDOM.classList.add("piano");

    pianoDOM.addEventListener("mousedown", function (event) {

        if (event.target.dataset.key) {
            console.log(event.target.dataset.key, "pressed");
            soundKey(keys[event.target.dataset.key]);


        }
    }, true);

    pianoDOM.addEventListener("mouseup", function (event) {
        if (event.target instanceof HTMLLIElement) {
            //console.log(event.target.dataset.key, "released");
        }
    }, true);


    document.addEventListener("keypress", function onEvent(event) {
        let binds = [1,2,3,4,5,6,7,8,9,0,"q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
        for (let i = 0; i < binds.length; i++) {
            if (event.key == binds[i]) {
                soundKey(keys.C3);

                  alert(binds[i]);
                

            }
        }
       /* if (event.key === "1") {
            alert("hola")
        }
        else if (event.key === "Enter") {
            soundKey(keys.A0);
        }*/
    });

    document.body.onkeydown = function (event) {
        if (event.key >= "0" && event.key <= "8") {
            octaveSelection(parseInt(event.key));
        } else {
            pulseKey(event, true);

        }
    }

    document.body.onkeyup = function (event) {
        pulseKey(event, false);
    }

    const pianoKeys = genPianoKeys();

    pianoKeys.map(createPianoOctave).forEach(function (pianoOctaveDOM) {
        pianoDOM.appendChild(pianoOctaveDOM);
    });

    return pianoDOM;
}

export function octaveSelection(octave) {
    const octavesDOM = document.getElementsByClassName("octave");

    octavesDOM[octaveSelected].classList.remove("selected");
    octavesDOM[octave].classList.add("selected");

    octaveSelected = octave;
}

function pulseKey(event, isDown) {
    const octave = octaveSelected;

    let musicNote = event.key.toUpperCase();
    if (event.shiftKey) {
        musicNote += "#";
    }

    if (!musicNotes.includes(musicNote)) {
        return;
    }
    const key = musicNote + octave;
    playKey(key, isDown);
}

export function playKey(key, isDown) {
    const keyDOM = allDOMKeys[key];
    if (isDown) {
        keyDOM.classList.add("active");



    } else {
        keyDOM.classList.remove("active");
    }
}




