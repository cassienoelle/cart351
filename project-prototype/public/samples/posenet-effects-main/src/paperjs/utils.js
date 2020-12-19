import { useState, useEffect } from "react";
import { PaperScope, Size } from "paper";

export function usePaperScope({ canvasRef, width, height, settings }) {
  const [scope, setScope] = useState();

  useEffect(() => {
    if (scope) {
      return;
    }
    if (!canvasRef.current) {
      return;
    }
    const paperScope = new PaperScope();
    paperScope.setup(canvasRef.current);

    if (settings) {
      for (let key of Object.keys(settings)) {
        paperScope.settings[key] = settings[key];
      }
    }

    if (width && height) {
      paperScope.view.viewSize = new Size(width, height);
    }

    setScope(paperScope);
  }, [canvasRef, height, scope, settings, width]);

  return {
    scope,
  };
}
