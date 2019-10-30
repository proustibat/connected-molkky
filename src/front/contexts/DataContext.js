import React from 'react';

export const DataContext = React.createContext({
  positionData: [],
});
export const useDataContext = () => React.useContext(DataContext);
export const DataContextProvider = DataContext.Provider;
export const DataContextConsumer = DataContext.Consumer;

export default DataContext;
