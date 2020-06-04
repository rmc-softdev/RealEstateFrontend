import { createContext } from "react";

export const MapContext = createContext({
  locations: [],
  getLocations: () => {},
});
