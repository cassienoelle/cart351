/*global paper:true */
import { isEmptyObject } from "./object-utils";
const { Point, Path, PointText } = paper;

const COLORS = [
  "#f6511d", // red orange
  "#ffb400", // honey yellow
  "#00a6ed", // carolina blue
  "#7fb800", // apple green
  "#0d2c54", // prussian blue
];

export function createPosesRenderer({ store }) {
  const posesCache = Array.from(Array(store.maxPoses), () => {
    return {};
  });

  const addNewPosePartToCache = ({ pose, part, color, poseIndex }) => {
    const {
      position: { x, y },
    } = pose[part];
    const center = new Point(x, y);
    const circle = new Path.Circle({
      center,
      radius: 2,
      fillColor: color,
    });
    const text = new PointText({
      point: new Point(x + 3, y - 3),
      content: part,
      fillColor: color,
      fontSize: 10,
    });
    posesCache[poseIndex][part] = {
      circle,
      text,
    };
  };

  const updatePoseAtIndex = ({ pose, index }) => {
    const color = COLORS[index % COLORS.length];

    const poseParts = Object.keys(pose);
    if (isEmptyObject(posesCache[index])) {
      // Add parts that are in pose
      poseParts.forEach((part) => {
        addNewPosePartToCache({ part, pose, color, poseIndex: index });
      });
    } else {
      const poseCache = posesCache[index];
      // Delete parts that aren't in pose
      const poseCacheParts = Object.keys(poseCache);
      poseCacheParts.forEach((part) => {
        if (!poseParts.includes(part)) {
          deletePoseAtIndexPart({ index, part });
        }
      });

      // Update parts in pose
      poseParts.forEach((part) => {
        const {
          position: { x, y },
        } = pose[part];

        // Existing pose part cache item
        if (poseCache[part]) {
          const { circle, text } = poseCache[part];
          circle.position = new Point(x, y);

          text.set({
            point: new Point(x + 3, y - 3),
          });
        } else {
          addNewPosePartToCache({ part, pose, color, poseIndex: index });
        }
      });
    }
  };

  const deletePoseAtIndexPart = ({ index, part }) => {
    if (isEmptyObject(posesCache[index])) {
      return;
    }

    const { circle, text } = posesCache[index][part];
    circle.remove();
    text.remove();

    delete posesCache[index][part];
  };

  const deletePoseAtIndex = (index) => {
    if (isEmptyObject(posesCache[index])) {
      return;
    }

    Object.values(posesCache).forEach(({ circle, text }) => {
      circle.remove();
      text.remove();
    });
    posesCache[index] = {};
  };

  return {
    render() {
      posesCache.forEach((pose, index) => {
        if (store.existsAtIndex(index)) {
          updatePoseAtIndex({ pose: store.getAtIndex(index), index });
        } else {
          deletePoseAtIndex(index);
        }
      });
    },
  };
}
