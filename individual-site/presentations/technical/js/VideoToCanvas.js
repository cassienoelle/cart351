let VideoToCanvas = function() {

    return {
        // init
        //
        // Initiates the video + canvas drawing process
        init: function(drawType, videoElement, canvasElement, constraints) {
            this.drawType = drawType;
            this.videoElement = videoElement;
            this.canvasElement = canvasElement;
            this.constraints = constraints;
        },

        // linkToVideo
        // arg: drawType : the draw effect we want to call for each frame
        // Continous link between the video element and the canvas
        linkToVideo: function() {
            if (this.videoElement.paused || this.videoElement.ended) {
                return; // Don't link if video is paused or ended
            }

            // Draw the requested image otherwise
            this.drawType();
            let self = this;
            // Redraw the next frame
            setTimeout(function() {
                self.linkToVideo();
            }, 0);
        },

        // drawRegularImage
        //
        // Shows how to draw image on canvas from video element source
        drawRegularImage: function() {
            // To draw an image from a video el source, we need the image source, the x-axis
            // coordinate at which to place the top-left corner of the source image in the destination canvas
            // idem for y-axis coordinate.

            // First get the drawing context from canvas (See CanvasRenderingContext2D)
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            // Draw an image using the context and the video element as source
            ctx.drawImage(images, 0, 0, width, height);

            // Get a new frame using getImageData (see docs)
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            // Note that we could allow a custom region to be extracted using mouse events instead, or allow to draw a shape
            let frame = ctx.getImageData(0, 0, 4 * width, 4 * height); // We are extracting the full width and height of the context in this case

            // The frame contains ImageData, which has properties we can manipulate
            // frame.data is ImageData.data: a Uint8ClampedArray one dimensional array containing
            // data in the RGBA order, with integer values between [0, 255].
            // So if we have a 300 x 300 frame, and if we have 4 values per pixel (for each rgba channel)
            // we have 4 x 300 x 300 pixels in total (frame.data.length) = 360 000 values stored
            // Dividing by 4 means taking just the pixels' worth
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over four values (rgbaChannels.length)
                // An alternative to i+=rgbaChannels is to multiply i * 4 for each array rgbaChannel access
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Do whatever you want with the rgba values here
                // Change pixels with frame.data[i + x] = changedValue;
            }
            // Apply
            ctx.putImageData(frame, 0, 0);
        },

        // drawGrayscale()
        //
        // Make black and white
        drawGrayscale: function() {
            // First get the drawing context from canvas (See CanvasRenderingContext2D)
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            // Draw an image using the context and the video element as source
            ctx.drawImage(images, 0, 0, width, height);
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            let frame = ctx.getImageData(0, 0, 4 * width, 4 * height);
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Luminance formula to calculate grayscale (red x 0.3 + green x 0.59 + blue x 0.11)
                let grayscale = r * 0.3 + g * 0.59 + b * 0.11;

                // Change pixels
                // The alpha channel does not need to be changed;
                frame.data[i + 0] = grayscale; // r
                frame.data[i + 1] = grayscale; // g
                frame.data[i + 2] = grayscale; // b
                frame.data[i + 3] = a; // a
            }
            // Apply
            ctx.putImageData(frame, 0, 0);
        },

        // drawInverted()
        //
        // Invert color values
        drawInverted: function() {
            // First get the drawing context from canvas (See CanvasRenderingContext2D)
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            // Draw an image using the context and the video element as source
            ctx.drawImage(images, 0, 0, width, height);
            // Flip canvas upside down

            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            let frame = ctx.getImageData(0, 0, 4 * width, 4 * height);
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Invert values
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;

                // Change pixels
                frame.data[i + 0] = r;
                frame.data[i + 1] = g;
                frame.data[i + 2] = b;
                frame.data[i + 3] = a;
            }
            // Apply
            ctx.putImageData(frame, 0, 0);
        },

        // drawPatternedColors()
        //
        // Make patterned colors using modulo (%)
        drawPatternedColors: function () {
          // First get the drawing context from canvas (See CanvasRenderingContext2D)
          const ctx = this.canvasElement.getContext('2d');
          const images = this.videoElement;
          const width = this.constraints.width;
          const height = this.constraints.height;
          // Draw an image using the context and the video element as source
          ctx.drawImage(images, 0, 0, width, height);
          // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
          let frame = ctx.getImageData(0, 0, 4*width, 4*height);
          ctx.clearRect(0, 0, width, height);
          ctx.rect(0, 0, width, height);
          const rgbaChannels = 4;
          const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
          for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
              let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
              let g = frame.data[i + 1]; // green
              let b = frame.data[i + 2]; // blue
              let a = frame.data[i + 3]; // alpha

              // Horizontal coloured stripes
              // Divide pixels into thirds horizontally
              if (i < framePixelsLength/3) {
                r += 50; // First third is red
              }
              else if (i >= framePixelsLength/3 && i < (framePixelsLength/3)*2) {
                g += 50; // Second third is green
              }
              else if (i >= (framePixelsLength/3)*2) {
                b += 50; // Final third is blue
              }

              // Create vertical stripe effect using modulus and alpha channel adjustments
              if (i % 75 === 0) {
                a = 100;
              }

              frame.data[i + 0] = r;
              frame.data[i + 1] = g;
              frame.data[i + 2] = b;
              frame.data[i + 3] = a;
          }
          // Apply
          ctx.putImageData(frame, 0, 0);
        },

        // Make a green screen effect on click event
        drawGreenScreenEffect: function(event) {
            // First get the drawing context from canvas (See CanvasRenderingContext2D)
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            // Draw an image using the context and the video element as source
            ctx.drawImage(images, 0, 0, width, height);
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            let frame = ctx.getImageData(0, 0, 4 * width, 4 * height);
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300

            // Target colour for chromakey
            // Default is Chroma Key Green
            // Color picker:
            // Get the pixel at the current mouse position if interactive is true
            let radius = 4 * 4;
            colorPickSample(this.canvasElement, radius);    

            // For more functionality, write code to dynamically set the target with colour picker/mouse event on the canvas
            // Tutorial that could help with this: https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
            let rect = this.canvasElement.getBoundingClientRect();
            let currentMousePosX = Math.round(event.clientX - rect.left);
            let currentMousePosY = Math.round(event.clientY - rect.top);
            let pixelData = ctx.getImageData(currentMousePosX, currentMousePosY, 1, 1).data;
            let target = {
                r: 0,
                g: 177,
                b: 64
            };
            target.r = pixelData[0];
            target.g = pixelData[1];
            target.b = pixelData[2];

            // How sensitive is the chroma key effect (acceptable overall difference between current and target rgb values)
            let tolerance = 45;

            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Calculate difference between current rgb values and target rgb values
                // If difference is within tolerance, make pixel transparent
                if (Math.abs(r - target.r) + Math.abs(g - target.g) + Math.abs(b - target.b) <= tolerance) {
                    frame.data[i + 3] = 0;
                }
            }
            // Apply
            ctx.putImageData(frame, 0, 0);
        },

        // Noise example
        drawNoise: function() {
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            ctx.drawImage(images, 0, 0, width, height);
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            let frame = ctx.getImageData(0, 0, 4 * width, 4 * width); // We are extracting the full width and height of the context in this case
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over four values (rgbaChannels.length)
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Add a random integer to each rgba value to create the noise effect
                let x = Math.random() * 255;
                frame.data[i + 0] = r + x;
                frame.data[i + 1] = g + x;
                frame.data[i + 2] = b + x;
                frame.data[i + 3] = a + x;
            }
            // Apply
            ctx.putImageData(frame, 0, 0);
        },

        // Interactive video drawing
        drawAtMousePosition: function(event) {
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            ctx.drawImage(images, 0, 0, width, height);
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            let frame = ctx.getImageData(0, 0, 4 * width, 4 * width); // We are extracting the full width and height of the context in this case
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            // Note the exact value of the current pixel is given by:
            // let currentMousePixel = currentMousePosX * currentMousePosY; // Can use to do stuff
            // Apply
            ctx.putImageData(frame, 0, 0);
            // Color picker
            let radius = 4 * 4;
            colorPickSample(this.canvasElement, radius);
        }

    }
}

// rgbToHex
// arg: pixelData array
// Utility to convert rgb to hex from context.getImageData.data
function rgbToHex(pixelData) {
    let r = pixelData[0];
    let g = pixelData[1];
    let b = pixelData[2];
    if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
    }
    return ((r << 16) | (g << 8) | b).toString(16);
}

function colorPickSample(canvasElement, radius) {
  // Get bounding values for left and top to know where the canvasElement is positioned
  let rect = canvasElement.getBoundingClientRect();
  let ctx = canvasElement.getContext('2d');
  // Get current mouse position by subtracting the left and top of this canvasElement from the current viewport location of the mouse
  let currentMousePosX = Math.round(event.clientX - rect.left);
  let currentMousePosY = Math.round(event.clientY - rect.top);
  // Write cue text
  ctx.font = "30px Arial";
  let textLength = 100;
  ctx.fillText("Color Pick This", currentMousePosX - textLength, currentMousePosY - (textLength / 2));
  // Get the pixel at the current mouse position
  let pixelData = ctx.getImageData(currentMousePosX, currentMousePosY, 1, 1).data;
  colorPickerHelper();
  function colorPickerHelper() {
    // Color picker
    // Convert the pixel to a hexadecimal value by
    let hex = "#" + rgbToHex(pixelData);
    ctx.beginPath();
    ctx.arc(currentMousePosX, currentMousePosY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = hex;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
  }
}
