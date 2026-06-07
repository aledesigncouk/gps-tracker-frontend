import { JSX, useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { Polyline } from "react-leaflet";
import { useFetchTrack } from "../../hooks/hooks";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";

const { MapContainer } = ReactLeaflet;
const red = { color: "red" };

type MapProps = {
  children: (React: typeof ReactLeaflet, L: typeof Leaflet) => JSX.Element;
  className?: string;
  width?: string;
  height?: string;
};

const Map: React.FC<MapProps> = ({
  children,
  className,
  width,
  height,
  ...rest
}) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  const { track } = useFetchTrack();

  console.log("Track data in Map component:", track);

  useEffect(() => {
    (async function init() {
      delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <>
      <MapContainer className={mapClassName} {...rest}>
        {children(ReactLeaflet, Leaflet)}

        {track && (
          <Polyline
            positions={track?.geometry?.coordinates}
            pathOptions={red}
          />
        )}
      </MapContainer>
    </>
  );
};

export default Map;
