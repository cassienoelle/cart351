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

            context.fillStyle = "rgb(255,0,0)";
            context.fillRect(100,100,50,50);

            // Loop through poses detected
            for (let i = 0; i < poses.length; i++)  {
              // Select wrist keypoints, pass position to variables
              let leftWrist = poses[i].pose.keypoints[9];
              //let rightWrist = poses[i].pose.keypoints[10].position;
              if (leftWrist.score > 0.2) {
                context.fillStyle = "rgb(0,0,255)";
                context.fillRect(leftWrist.position.x,leftWrist.position.y,25,25);
              }
            }
        }

    }
}
