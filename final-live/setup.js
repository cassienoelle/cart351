"use strict";


//methods.
//Most browsers will not play any audio until a user clicks something (like a play button).
//Invoke this method on a click or keypress event handler to start the audio context.
//Tone.start generates a promise to start the audio context
document.querySelector("button").addEventListener("click", async () => {
	await Tone.start();
	console.log("context started");
});
