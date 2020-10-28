let VideoToCanvas = function() {

    return {
        // init
        //
        // Initiates the video + canvas drawing process
        init: function(video, canvas) {
            this.video = video;
            this.canvas = canvas;
            this.constraints = {
                  width: 640,
                  height: 480
              };
        },

        // linkToVideo
        //
        // Continous link between the video element and the canvas
        linkToVideo: function() {
            // Draw the requested image otherwise
            this.draw();
            let self = this;
            // Redraw the next frame
            setTimeout(function() {
                self.linkToVideo();
            }, 0);
        },

        // drawRegularImage
        //
        // Shows how to draw image on canvas from video element source
        draw: function() {
            // To draw an image from a video el source, we need the image source, the x-axis
            // coordinate at which to place the top-left corner of the source image in the destination canvas
            // idem for y-axis coordinate.
            console.log("drawing");
            // First get the drawing context from canvas (See CanvasRenderingContext2D)
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            const context = this.canvas.getContext('2d');
            const images = this.video;
            const width = this.constraints.width;
            const height = this.constraints.height;
            // Draw an image using the context and the video element as source
            context.drawImage(images, 0, 0, width, height);

            context.fillStyle = "rgba(255,0,0,255)";
            context.fillRect(this.canvas.width/2,this.canvas.height/2,50,50);
            context.clearRect(this.canvas.width/2,this.canvas.height/2,50,50);
        }

    }
}
