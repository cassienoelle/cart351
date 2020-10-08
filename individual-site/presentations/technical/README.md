# Demo Design Document

    The demo API presentation focuses on showing well-documented, small examples
    for the Media Streams API. Examples should be ideally modular and easily integrable into a flexible variety of projects.

    The first version shows Media Streams + Canvas API interactions.

## Presentation Slides

    In development.

## Build Status

    CORE:

    Get Tutorials:

    Basic Get Audio - Done - Passing
    Basic Get Audio Capture - Passing
    Basic Get Video - Done - Passing
    Basic Get Picture - Done - Passing
    Basic Get Video Capture - Done - Passing
    Basic Get Canvas Video Capture - Done - Passing

    Set Tutorials:
    Basic Use Get Video Capture to Change Canvas Elements - Done - Passing
    Basic Use Get Audio Capture to create Patterns in Color or Animation - Not started
    Manipulation in Canvas (Filtering) - Done - Passing
    Dynamic Manipulation in Canvas (user mouse events) - Not started
    ~~ WebRTC connectivity with one's canvas to remote peer canvas (collab art?)- Not started\~~

    Constraints Configuration Tutorial:
    Basic Constraints - Not Started

    STRETCH GOALS:

    Interactive Canvas Example Tutorial:
    Basic Game - Not Started
    Basic Experience - Not Started

## Change Log History

v0.1 - Demo tutorial media capture picture\
v0.2 - Current version. Design and Structuring, v1 scope (Media Streams + Canvas API)\
v0.3 - Added MediaStreams for audio, structured base demo page html\
v0.3b - Added audio record playback
v0.4 - Added Get Video and record
v0.5 - Added Screen Noise pixel manipulation example
v0.6 - Added Grayscale, Inverted, Green Screen examples
v0.7 - Added styles
v0.8 - Added Patterns example

## Stretch

Game/Main Interactive Application Example

Scenes:
    Start Game
    End

Logic:
    User interaction: MediaStream capture\n
    User data:

## Versions

    V1: Working set of modular examples to go with canvas element. Basic
    pixel manipulation.

    V2: Show main digital art usages of MediaStreams: More in-depth canvas manipulation or ~~WebRTC connectivity.~~ WebGL? Motion Capture?

    V3: Stretch game/main interactive application.

## Objects & Methods of Interest (Not all from same API)

    MediaStreams API:

    Navigator.MediaDevices.getUserMedia();
    MediaStream.getVideoTrack/getAudioTrack

    Canvas Streams API:

    stream.requestFrame();
    HtmlCanvasElement
    WebRTC
    MediaSource.addSourceBuffer()

    Canvas Manipulation Related:
    drawImage() : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    getImageData() : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
    putImageData() : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
    ImageData : https://developer.mozilla.org/en-US/docs/Web/API/ImageData
    ImageData.data: https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data

    Three.js 3D example:
    https://threejs.org/examples/?q=webcam#webgl_materials_video_webcam

## References

    Media Streams API:
        https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API\
    Media Streams Recording API:
        https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
    Canvas API:
        https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API\
    WebRTC:
        https://webrtc.github.io/samples/
    Canvas Manipulation:
        http://html5doctor.com/video-canvas-magic/
        https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
        https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
        https://www.htmlgoodies.com/html5/javascript/display-images-in-black-and-white-using-the-html5-canvas.html
        https://hmp.is.it/creating-chroma-key-effect-html5-canvas/
        https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript

## Timeline

    Week 1: Everything

## UML

Upcoming.
