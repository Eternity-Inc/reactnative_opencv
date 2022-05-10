import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [globalUserData, setUserData] = useState({
    user_data: null
  });

  const [globalNavigation, setNavigation] = useState({
    navigation: null
  });
// this Context ikuti array Provider, kalau use context ikuti array Tanpa set
  return (
    <GlobalContext.Provider value={[globalUserData, setUserData, globalNavigation, setNavigation]}>
      {children}
    </GlobalContext.Provider>
  );
};
