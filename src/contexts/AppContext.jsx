import React, { createContext, useState } from "react";


export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const modeStyle = {
    day: {
      backgroundColor: "white",
      color: "black",
    },
    night: {
      backgroundColor: "black",
      color: "white",
    },
  };

  const [mode, setMode] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [statusGame, setStatusGame] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        modeStyle: modeStyle[mode ? "day" : "night"],
        showDialog,
        setShowDialog,
        statusGame,
        setStatusGame,
        isPlaying,
        setIsPlaying
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
