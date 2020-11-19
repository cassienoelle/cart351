"use strict";

$(document).ready( function() {

  Tone.start(); // Init audio context
  let sampler = new Tone.Sampler({
    urls: {
    "C4": "C4.mp3",
    // "B4": "B4.mp3",
    // "G4": "G4.mp3",
  },
  release: 1,
  baseUrl: "samples/marimba/",
  }).toDestination();

  let playDiv = $('#trigger');

  playDiv.click(function() {
    sampler.triggerAttackRelease(["D5", "F4", "A3"], 4);
  });

});
