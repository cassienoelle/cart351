window.addEventListener('DOMContentLoaded', (event) => startup());
// Legacy code: Used to learn the API

let DemoMediaStreamObject = function(){
    let width = 320;
    let height = 0; // This will be computed based on the input stream
    let streaming = false;  
    let video = null;
    let canvas = null;
    let photo = null;
    let startbutton = null;
}

// Called when document has finished loading to initialize MediaStream needed things
function startup() {
    let videoInputs = []; // JSON array of video inputs found in enum devices
    enumerateDevices(videoInputs);
    let width = 320;
    let height = 0; // This will be computed based on the input stream

    let video = document.getElementById('video');
    let streaming = false;  
    
    let canvas = document.getElementById('canvas');
    let photo = document.getElementById('photo');
    let startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    // Concept: Promises
    .then(function(stream) {
        video.srcObject = stream;
        console.log(video.srcObject);
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

    startbutton.addEventListener('click', function(ev){
       takepicture(width, height);
       ev.preventDefault();
    }, false);
    clearphoto();
}

function clearphoto() {
    let context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function takepicture(width, height) {
    let context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    } else {
        clearphoto();
    }
}

function enumerateDevices(videoInputs) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
      }
      
    // List cameras and microphones.
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
    devices.forEach(function(device) {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
        // Take the video inputs
        if(device.kind === "videoinput") {
            videoInputs.push(device.toJSON());
            console.log(videoInputs);
        }
    });
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });    
}

// Smile Detector: stretch goal game / interactive app
function smileDetector() {
    // Ask user to pose a neutral face expression
    // Ask user to pose a smile and not move anything else
    // Capture the region that moved/changed 
    // Compare with baseline neutral face expression
    // True if its significantly different
}