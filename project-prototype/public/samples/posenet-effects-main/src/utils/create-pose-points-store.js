import { isEmptyObject } from "./object-utils";

export function createPosePointsStore({
  maxPoses = 5,
  poseScoreFilter = 0,
  partScoreFilter = 0,
}) {
  const store = Array.from(Array(maxPoses), () => {
    return {};
  });

  const deletePoseAtIndex = (index) => {
    store[index] = {};
  };

  const updatePose = ({ pose, index }) => {
    store[index] = {};

    pose.keypoints.forEach(({ position, score, part }) => {
      if (score > partScoreFilter) {
        store[index][part] = { position, score };
      }
    });
  };

  return {
    maxPoses,
    getAtIndex(index) {
      return store[index];
    },
    existsAtIndex(index) {
      return !isEmptyObject(store[index]);
    },
    updatePoses(poses) {
      const filteredPoses = poses.filter(
        ({ score }) => score > poseScoreFilter
      );
      filteredPoses.forEach((_, index) => {
        const pose = poses[index];
        if (pose) {
          updatePose({ pose, index });
        } else {
          deletePoseAtIndex(index);
        }
      });
    },
  };
}
