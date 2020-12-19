import { useState, useEffect } from "react";

import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

async function estimatePoseOnImage(imageElement) {
  const net = await posenet.load();

  const pose = await net.estimateSinglePose(imageElement, {
    flipHorizontal: false,
  });
  return pose;
}

export function usePosenet({ imageRef }) {
  const [pose, setPose] = useState();

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }
    estimatePoseOnImage(imageRef.current).then((estPose) => {
      setPose(estPose);
    });
  }, [imageRef, setPose]);

  return {
    pose,
  };
}
