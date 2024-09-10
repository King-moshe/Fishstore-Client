import React, { createContext, useContext, useState } from 'react'
const StateContext = createContext();
export const Context = ({children}) => {
    const [countCart, setCountCart] = useState(0);


  return (
    <StateContext.Provider 
    value={{countCart, setCountCart}}
    >
        {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext);