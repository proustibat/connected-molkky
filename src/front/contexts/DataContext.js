import React, { useContext } from 'react';

export const DataContext = React.createContext([]);
export const useDataContext = () => useContext(DataContext);
export const DataContextProvider = DataContext.Provider;
export const DataContextConsumer = DataContext.Consumer;

export default DataContext;
