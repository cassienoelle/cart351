import { useWebsocket } from "../utils/use-websocket";
import { createPosePointsStore } from "../utils/create-pose-points-store";
import { createPosesRenderer } from "../utils/create-poses-renderer";

const POSE_SCORE_FILTER = 0.1;
const PART_SCORE_FILTER = 0.05;

const posePointsStore = createPosePointsStore({
  maxPoses: 5,
  poseScoreFilter: POSE_SCORE_FILTER,
  partScoreFilter: PART_SCORE_FILTER,
});
const posesRenderer = createPosesRenderer({
  store: posePointsStore,
});

export function useWebsocketPose({ url }) {
  useWebsocket({
    url: `ws://${url}`,
    onOpen: () => {
      console.log("Websocket open");
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);

      const { poses } = data;
      posePointsStore.updatePoses(poses);
      posesRenderer.render();
    },
    onClose: () => {
      console.log("Websocket close");
    },
  });
}
