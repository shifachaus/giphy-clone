import { createContext } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  return <GifContext.Provider value={"l"}>{children}</GifContext.Provider>;
};

export default GifProvider;
