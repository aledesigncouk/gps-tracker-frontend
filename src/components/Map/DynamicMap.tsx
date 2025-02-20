import { JSX, useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { Polyline } from "react-leaflet";
import { useFetchTrack } from "@hooks/hooks";

import "leaflet/dist/leaflet.css";
import styles from "@styles/components/Map.module.scss";
import { Track } from "@/interfaces/interfaces";

const { MapContainer } = ReactLeaflet;
const red = { color: "red" };

type MapProps = {
  children: (React: typeof ReactLeaflet, L: typeof Leaflet) => JSX.Element;
  className?: string;
  width?: string;
  height?: string;
  track: Track;
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

  const { track, error } = useFetchTrack();

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
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
