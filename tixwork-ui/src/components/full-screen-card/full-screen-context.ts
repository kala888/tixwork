import React from 'react';

type FullScreenContextType = {
  readonly enterFullscreen: () => void;
  readonly exitFullscreen: () => void;
  readonly toggleFullscreen: () => void;
  readonly isFullscreen: boolean;
};
export const FullScreenContext: React.Context<FullScreenContextType> = React.createContext({} as FullScreenContextType);
