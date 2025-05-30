import { Marker, Popup, useMap } from "react-leaflet";
import type { IDevice } from "../types/device";
import { getIcon } from "../utils/getIcon";
import type { LeafletEvent } from "leaflet";
import { useState } from "react";

interface Props {
    device: IDevice;
    offset?: number;
    draggable?: boolean;
    isChild?: boolean;
} 

const DeviceMarker = ({ device, offset = 0, draggable = false, isChild }: Props) => {
    const map = useMap();

    //функция для ключа
    const getStorageKey = (id: string) => `device-position-${id}`;

    const stored = localStorage.getItem(getStorageKey(device.id));
    const initialPosition: [number, number] = stored
        ? JSON.parse(stored)
        : [device.lat + offset, device.lon + offset];

    const [position, setPosition] = useState<[number, number]>(initialPosition);

    const handleDoubleClick = () => {
      map.setView(position, 17);
    };
  
    const handleDragEnd = (e: LeafletEvent) => {
        const { lat, lng } = e.target.getLatLng();
        setPosition([lat, lng]);

        localStorage.setItem(
            getStorageKey(device.id),
            JSON.stringify([lat, lng])
          );
    
        console.log(`Новая позиция для ${device.name}:`, lat, lng);
    };
  
    return (
      <Marker
        position={position}
        icon={getIcon(device.model, isChild)}
        draggable={draggable}
        eventHandlers={{
          dblclick: handleDoubleClick,
          dragend: handleDragEnd,
        }}
      >
        <Popup>
          <strong>{device.name}</strong><br />
          Модель: {device.model}<br />
          Статус: {device.status}<br />
          🌍 Позиция:<br />
          {position[0].toFixed(5)}, {position[1].toFixed(5)}
        </Popup>
      </Marker>
    );
  };

export default DeviceMarker;
