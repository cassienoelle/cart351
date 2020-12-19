/*
  import { videoReady, poseNetRes, modelLoaded } from "../stores.js";
  import { smooth, getDistance } from "../helpers.js";
  import { posenetOptions } from "../config.js";
*/
  let net;
  posenet.load().then((e) => {
    net = e;
  });
  async function estimatePoseOnImage() {
    if ($videoReady) {

      if($videoReady.width!==$videoReady.videoWidth || $videoReady.height!==$videoReady.videoHeight){
        $videoReady.width = $videoReady.videoWidth
        $videoReady.height = $videoReady.videoHeight
      }

      const pose = await net.estimateMultiplePoses($videoReady, posenetOptions);
      if (pose.length > 0) {
        // if confidence score is above threshold
        if (pose[0].score > posenetOptions.minPoseConfidence) {
          // calculate armspan
          // getDistance() part of smoothing.js
          let armspan = getDistance(
            pose[0].keypoints[9].position,
            pose[0].keypoints[10].position
          );
          // smooth(pose, armspan)
          // part of smoothing.js
          let smoothPose = smooth(pose[0], armspan);
          poseNetRes.set(smoothPose.keypoints);
        } else {
          poseNetRes.set(null);
        }
      }
      if (!$modelLoaded) {
        modelLoaded.set(true);
      }
      requestAnimationFrame(estimatePoseOnImage);
    } else {
      poseNetRes.set(null);
    }
  }
  $: {
    if ($videoReady && net) {
      estimatePoseOnImage();
    }
  }
