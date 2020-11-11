"use strict";

let canvasWidth = 700;
let canvasHeight = 500;
let app = new PIXI.Application({width: canvasWidth, height: canvasHeight});

$( document ).ready(function() {
    document.body.appendChild(app.view);
    app.renderer.resize(canvasWidth, canvasHeight);
});
