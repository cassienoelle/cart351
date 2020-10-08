// class to mainly demo how to get user video
let VideoOnlyMediaStream = function() {
    this.localMediaStream = null;  // The stream data we want to get from the user
    this.video = document.getElementById("videoTutorial"); // Get the video element to use
    this.constraints = { video: {
        width: { min: 300, ideal: 300 },
        height: { min: 300, ideal: 300 },
        aspectRatio: { ideal: 1.7777777778 } // 16.9
    }}; // Constraints for the video
    this.recordedChunks = []; // Video frame recorded chunks

    // Get the local media stream from getUserMedia.
    let getLocalMediaStream = function() {
        // First check if navigator has mediaDevices
        if(navigator.mediaDevices) {
           // The stream's kind: it's a property for the kind of media. The resulting stream is required (through constraints) to have its the corresponding kind of track if set to true, otherwise -> error.
           // Note that the recording object, Media Recorder is only created inside the promise. Everything is handled in there due to async nature of net.
            navigator.mediaDevices.getUserMedia(constraints) // audio is set to true so we need a microphone track.
                .then(function(stream) {
                    // The video element is just to show what's being recorded, we don't actually need it to record
                    this.video.srcObject = stream;
                    this.video.play();
                    // Capture the stream using the canvas
                    this.localMediaStream = stream;
                    // Get the video track from the local media stream we filled in. Note this is an array
                    let videoTrack = this.localMediaStream.getVideoTracks();
                    if (videoTrack.length > 0) {
                        // We could play the video if necessary but we just want the local stream data
                        // Record stuff using the Media Recorder API and object
                        let videoStartbutton = document.getElementById("videoStartButton");
                        let videoStopButton = document.getElementById("videoStopButton");
                        this.recordedChunks = [];
                        // Options are the video format and codec
                        let options = { mimeType: "video/webm; codecs=vp9" };
                        let mediaRecorder = new MediaRecorder(this.localMediaStream, options);
                        mediaRecorder.ondataavailable = handleDataAvailable;

                        // Record on click
                        videoStartbutton.addEventListener('click', function(ev){
                            // record - Using MediaStreams Recording API
                            mediaRecorder.start();
                            console.log(mediaRecorder.state);
                            videoStartButton.style.background = "red";
                            videoStartButton.style.color = "white";
                            // Later this record can be stored, sent into a JSON and manipulated in a game or used as a config for canvas elements' behaviours, or through other libraries
                            ev.preventDefault();
                        }, false);

                        // Stop button
                        videoStopButton.addEventListener('click', function(ev){
                            // Stop recording
                            mediaRecorder.stop();
                            videoStartButton.style.background = "";
                            videoStartButton.style.color = "";
                        });

                        // When we stop recording, create a file
                        mediaRecorder.onstop = function(e) {
                            // Can do other things like save to JSON
                        }

                        // Handle video chunks -- if there are, prompt download for latest chunk available
                        function handleDataAvailable(event) {
                            if(event.data.size > 0) {
                                console.log("handling video data available");
                                recordedChunks.push(event.data);
                                download();
                            }
                        }

                        // Prompt dl
                        function download() {
                            console.log("downloadin");
                            let blob = new Blob(recordedChunks, {
                                type: "video/webm"
                            });
                            let url = URL.createObjectURL(blob);
                            let a = document.createElement("a");
                            document.getElementById("camera").appendChild(a);
                            a.style = "display: none";
                            a.href = url;
                            a.download = "test.webm";
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }

                        return this.localMediaStream;
                    }
                });
        }
    }
    return {
        getLocalMediaStream: getLocalMediaStream
    }
}
