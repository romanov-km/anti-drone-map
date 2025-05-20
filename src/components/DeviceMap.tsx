import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import devices from '../data/devices.json';
import type { IDevice } from "../types/device";
import DeviceMarker from "./DeviceMarker";

const center: LatLngExpression = [55.75515, 37.61779]; // Москва

const DeviceMap = () => {
    return (
        <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {(devices as IDevice[]).map((device) => (
                <DeviceMarker
                    key={device.id}
                    device={device}
                    draggable={device.model === "special"}
                />
            ))}

            {/* Рисуем дочерние устройства */}
            {(devices as IDevice[]).flatMap((device) =>
                device.children?.map((child, index) => (
                    <DeviceMarker key={child.id} device={child} offset={0.0003 * (index + 1)} isChild={true} />
                )) ?? []
            )}
            {devices.flatMap((device) =>
                device.children?.map((child, index) => {
                    const offset = 0.0003 * (index + 1);
                    const parentPos: [number, number] = [device.lat, device.lon];
                    const childPos: [number, number] = [child.lat + offset, child.lon + offset];

                    return (
                        <Polyline
                            key={`line-${device.id}-${child.id}`}
                            positions={[parentPos, childPos]}
                            pathOptions={{
                                color: "red",
                                weight: 2,
                                dashArray: "4",
                            }}
                        />
                    );
                }) ?? []
            )}
            <Marker position={center}>
                <Popup>Музей</Popup>
            </Marker>
        </MapContainer>
    );
};

export default DeviceMap;