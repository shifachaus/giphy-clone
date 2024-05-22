import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <GifContext.Provider value={{ gf, gifs, filter, favorites }}>
      {children}
    </GifContext.Provider>
  );
};

export const useGifSState = () => {
  return useContext(GifContext);
};

export default GifProvider;
