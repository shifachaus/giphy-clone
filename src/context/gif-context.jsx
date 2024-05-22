import { createContext, useContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavorites(favorites);
  }, []);

  const addToFavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((itemId) => itemId !== id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      // If the item is not in favorites, add it
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        filter,
        favorites,
        setGifs,
        setFilter,
        addToFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const useGifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
