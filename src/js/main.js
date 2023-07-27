import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'

let cursor = document.getElementById("cursor");

let splitstr
let strtest = "DIRECTOR"
let MFspan = [];
let p = document.getElementById("p")

let x = window.innerWidth / 2;
let y = window.innerHeight / 8;
let mousex;
let mousey;



const wInput = document.getElementById("weightRange");
const slantInput = document.getElementById("slantRange");
const textD = document.getElementById("textD")
const textF = document.getElementById("textF")
const textM = document.getElementById("textM")

let time = 0

function init() {

    splitstr = strtest.split('');
    p.innerHTML = '';
    MFspan = []
    for (let i = 0; i < splitstr.length; i++) {
        let ic = document.createElement("span");
        ic.innerHTML = splitstr[i];
        MFspan.push(ic)
        p.append(MFspan[i]);
    }
    console.log(p)
    console.log(splitstr)
}

init()

const tick = () => {

    time += 0.005;

    x = mousex;
    y = mousey;

    logo();

    window.requestAnimationFrame(tick)

}
tick()

function logo() {
    let weightInput = 11 - wInput.value

    // let weightLabel = document.getElementById("weightLabel");
    // let weightThumb = document.querySelector("#weightRange::-webkit-slider-thumb");
    // const weightThumbRect = weightThumb.getBoundingClientRect();
    // const slantThumbRect = slantThumb.getBoundingClientRect();

    // let slantLabel = document.getElementById("slantLabel");
    // let slantThumb = document.querySelector("#slantRange::-webkit-slider-thumb");
    // slantLabel.style.left = `${slantThumb.style.left}`;


    for (let i = 0; i <
        p.childNodes.length; i++) {

        let posx = getOffset(p.childNodes[i]).left;
        let posy = getOffset(p.childNodes[i]).top;

        let xdist = posx - x;
        let ydist = y - posy;

        let testleft = xdist / 160 * 45 * ydist / 160;
        let testw = (
            1 - Math.abs(xdist / window.innerWidth) * weightInput + 1 - Math.abs(ydist / window.innerHeight) * weightInput
        ) * 900;
        testw = clamp(testw, 100, 900);

        let testslant = testleft * slantInput.value;

        p
            .childNodes[i]
            .style
            .fontVariationSettings = `'wght' ${testw}, 'slnt' ${testslant}`;

    }

}

document.addEventListener('mousemove', (e) => {
    mousex = e.clientX;
    mousey = e.clientY;
});

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
}

function clamp(val, min, max) {
    return val > max ?
        max :
        val < min ?
        min :
        val;
}

textD.addEventListener('click', function() {
    strtest = "DIRECTOR"
    init()
});

textF.addEventListener('click', function() {
    strtest = "FILM PRODUCTION"
    init()
});

textM.addEventListener('click', function() {
    strtest = "MAGNETIC FIELD"
    init()
});

let slantb = document.getElementById("slantLabelb")
let svalue = 45
    // slantb.style.fontVariationSettings = `'slnt' ${svalue}`;
slantb.style.setProperty("--slant", 45);