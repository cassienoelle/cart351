// Maximum valid movement distance (smaller = more agressive smoothing)
const maxDistance = poseConfig.smoothing.maxJumpRatio * armspan;

  let poseConfig = {
    smoothing: {
      jumpDetection: false, // did pose jump an unrealistic amount from previous position
      smoothing: 0.67, // part of calculation to move keypoint position back towards prev position
      maxJumpRatio: 0.3, // max difference before unrealistic jump is detected
      jumpResetTime: 1000, //
      // speedSmoothing: 0.8,
    },
  };

  // smooth(pose, armspan)
  //
  //
  function smooth(pose, armspan) {
    if (poseConfig.smoothing.jumpDetection) pose = unjump(pose, armspan);
    if (!smoothPrevPose) {
      smoothPrevPose = pose;
      return pose;
    }

    const keypoints = getKeypoints(pose);
    const prevKeypoints = getKeypoints(smoothPrevPose);
    const smoothKeypoints = keypoints;

    Object.keys(keypoints).forEach((part) => {
      const prevPos = prevKeypoints[part].position;
      const smoothPos = smoothKeypoints[part].position;
      const pos = keypoints[part].position;

      smoothPos.x = (prevPos.x - pos.x) * smoothing + pos.x; // previous position - current position * 0.67 + current position
      smoothPos.y = (prevPos.y - pos.y) * smoothing + pos.y;
    });

    const smoothPose = getPoseFromKeypoints(smoothKeypoints);
    smoothPose.score = pose.score;
    smoothPrevPose = smoothPose;
    return smoothPose;
  } // smooth



  // unjump (pose, armspan)
  //
  //
  function unjump(pose, armspan) {
    if (!jumpPrevPose) {
      jumpPrevPose = pose;
      return pose;
    }

    // Maximum valid movement distance (smaller = more agressive smoothing)
    const maxDistance = poseConfig.smoothing.maxJumpRatio * armspan;
    const smoothedKeypoints = [];

    // Go over each keypoint, see if it's moved an unrealistic amount in one frame,
    // and if so revert to previous position
    pose.keypoints.forEach((keypoint) => {
      const prevKeypoint = getKeypoint(jumpPrevPose, keypoint.part);
      const distance = getDistance(keypoint.position, prevKeypoint.position);

      if (distance > maxDistance) {
        smoothedKeypoints.push(prevKeypoint);
      } else {
        smoothedKeypoints.push(keypoint);
      }
    });

    const originalPose = Object.assign({}, pose);
    pose.keypoints = smoothedKeypoints;

    // Reset any parts that have been stuck
    jumpReset.forEach((part) => {
      const prevKeypoint = getKeypoint(jumpPrevPose, part);
      pose.keypoints.forEach((keypoint) => {
        if (keypoint.part === part) {
          keypoint.position.x = getKeypoint(originalPose, part).position.x;
          keypoint.position.y = getKeypoint(originalPose, part).position.y;
        }
      });
      jumpReset.splice(jumpReset.indexOf(part), 1);
    });

    jumpPrevPose = pose;
    return pose;
  } // unjump
