window.addEventListener('DOMContentLoaded', (event) => startup());

let startup = function() {
    let audioOnlyMediaStream = AudioOnlyMediaStream();
    audioOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently
    let videoOnlyMediaStream = VideoOnlyMediaStream();
    videoOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently

    // Simple canvas-video pixel manipulation example
    // Get the video element, link it to the canvas and then alter the pixels in it
    let videoElement = document.getElementById("videoTutorial");
    let canvasElements = document.getElementsByClassName("canvas");
    let constraints = {
        width: 300,
        height: 300
    };
    // Add an event listener on video play to establish a link between video element and canvas elements
    videoElement.addEventListener('play', function() {

        // This is a list of all methods in VideoToCanvas class that create effects by changing pixels inside canvas using imageData
        let videoToCanvas = new VideoToCanvas();
        let videoEffects = [
            videoToCanvas.drawRegularImage,
            videoToCanvas.drawGrayscale,
            videoToCanvas.drawInverted,
            videoToCanvas.drawPatternedColors,
            videoToCanvas.drawNoise
        ];

        for (let i = 0; i < canvasElements.length; i++) {
            // New object for each canvas element
            videoToCanvas = new VideoToCanvas();
            // Draw and link new video instance to each canvas element
            // Iterate through the list of possible effects in the first arg. until there is an example of each effect displayed
            videoToCanvas.init(videoEffects[i], videoElement, canvasElements[i], constraints);
            videoToCanvas.linkToVideo();
        }

        // Subtract effect
        let subtractVideoToCanvas = new VideoToCanvas();
        let subtractCanvas = document.getElementById("subtractCanvas");
        subtractVideoToCanvas.init(videoToCanvas.drawRegularImage, videoElement, subtractCanvas, constraints);
        subtractCanvas.addEventListener('click', function(event) {
            subtractVideoToCanvas.drawGreenScreenEffect(event);
        });

        // Otherwise refresh that canvas anyways
        subtractCanvas.addEventListener('mousemove', function(event) {
            subtractVideoToCanvas.drawAtMousePosition(event);
        });

        let greenScreenVideoToCanvas = new VideoToCanvas();
        let greenScreenCanvas = document.getElementById("greenScreenCanvas");
        greenScreenVideoToCanvas.init(greenScreenCanvas.drawRegularImage, videoElement, greenScreenCanvas, constraints);
        greenScreenCanvas.addEventListener('mousemove', function(event) {        
            greenScreenVideoToCanvas.drawGreenScreenEffect(event);
        });

    });
}
