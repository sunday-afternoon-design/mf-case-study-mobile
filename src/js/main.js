import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'



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
    console.log(splitstr)
}

init()

const tick = () => {

    time += 0.005;

    // x = mousex;
    // y = mousey;

    logo();

    window.requestAnimationFrame(tick)

}
tick()



function logo() {
    let weightInput = 11 - wInput.value




    for (let i = 0; i <
        p.childNodes.length; i++) {

        let posx = getOffset(p.childNodes[i]).left;
        let posy = getOffset(p.childNodes[i]).top;

        let xdist = posx - x;
        let ydist = y - posy;

        let testleft = xdist / 40 * 45 * ydist / 40;
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
    textM.classList.remove('mybuttonwhite');
    textD.classList.remove('mybuttonblack');
    textM.classList.add('mybuttonblack');
    textD.classList.add('mybuttonwhite')
});

textM.addEventListener('click', function() {
    strtest = "MAGNETIC FIELD"
    init()
    textD.classList.remove('mybuttonwhite');
    textM.classList.remove('mybuttonblack');
    textD.classList.add('mybuttonblack');
    textM.classList.add('mybuttonwhite')
});


let isRandomClicked = false;

const random = document.getElementById("random");
random.addEventListener("click", function() {
    isRandomClicked = true;
    wInput.value = Math.random() * (8 - 3) + 3;
    slantInput.value = Math.random() * (0.15 - 0.01) + 0.01;
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight/2;
});

document.addEventListener('click', function(e) {
    if (!isRandomClicked) {
        x = e.clientX;
        y = e.clientY;
    }
    isRandomClicked = false;
});


document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, { passive: false });