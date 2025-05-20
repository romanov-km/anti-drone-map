import L from "leaflet";
import basicIcon from "../assets/icons/basic.png";
import advancedIcon from "../assets/icons/advanced.png";
import specialIcon from "../assets/icons/special.png";

export const getIcon = (
  model: "basic" | "advanced" | "special",
  isChild = false
) => {
  const iconMap = {
    basic: basicIcon,
    advanced: advancedIcon,
    special: specialIcon,
  };

  const size: [number, number] = isChild ? [20, 20] : [30, 30];
  const anchor: [number, number] = isChild ? [10, 13] : [10, 20];
  const popupAnchor: [number, number] = isChild ? [0, -20] : [6, -25];

  return L.icon({
    iconUrl: iconMap[model],
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: popupAnchor,
  });
};
