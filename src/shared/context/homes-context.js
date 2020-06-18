import { createContext } from "react";

export const HomesContext = createContext({
  homes: [],
  setHomes: () => {},
  filteredHomes: [],
  setFilteredHomes: () => {},
});
