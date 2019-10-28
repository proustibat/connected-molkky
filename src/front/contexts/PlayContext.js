import React from 'react';

export const PlayContext = React.createContext({});
export const usePlayContext = () => React.useContext(PlayContext);
export const PlayContextProvider = PlayContext.Provider;
export const PlayContextConsumer = PlayContext.Consumer;

export default PlayContext;
