window.addEventListener('load', start);

var inputs = null
var div = null;
var rgb = [0,0,0];

function start(){

    div = document.querySelector('div#quadr');

    var red = document.querySelector('input#range-input0');
    var green = document.querySelector('input#range-input1');
    var blue = document.querySelector('input#range-input2');

    red.value = 0;
    green.value = 0;
    blue.value = 0;

    inputs = document.querySelectorAll('input.text-input');
    inputs = Array.from(inputs);
    
    red.addEventListener('change', changeRed);
    green.addEventListener('change', changeGreen);
    blue.addEventListener('change', changeBlue);
}

function changeRed(event){
    rgb[0] = event.target.value;
    rgb[0] = Math.round(rgb[0]*255/100);
    inputs[0].value = rgb[0];
    div.style['background-color'] = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
}

function changeGreen(event){
    rgb[1] = event.target.value;
    rgb[1] = Math.round(rgb[1]*255/100);
    inputs[1].value = rgb[1];
    div.style['background-color'] = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
}

function changeBlue(event){
    rgb[2] = event.target.value;
    rgb[2] = Math.round(rgb[2]*255/100);
    inputs[2].value = rgb[2];
    div.style['background-color'] = 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
}