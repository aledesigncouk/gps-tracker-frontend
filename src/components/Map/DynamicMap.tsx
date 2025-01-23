import { useEffect, useState } from "react";
import { useStore } from "@store/ContextStore";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { Polyline } from "react-leaflet";
import { getTrackByRange, formatDate, setRangeByYear } from "src/utils";

import "leaflet/dist/leaflet.css";
import styles from "@styles/Map.module.scss";

const { MapContainer } = ReactLeaflet;

const red = { color: "red" };

type MapProps = {
  children: (React: typeof ReactLeaflet, L: typeof Leaflet) => JSX.Element;
  className?: string;
  width?: string;
  height?: string;
};

type Track = {
  geometry: {
    coordinates: [number, number][];
  };
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

  const [track, setTrack] = useState<Track | null>(null);
  const { startDate, endDate, selectedYear } = useStore();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (startDate && endDate) {
  //       const start = formatDate(startDate);
  //       const end = formatDate(endDate);
  //       const result = await getTrackByRange(startDate, endDate);
  //       setTrack(result);
  //     }
  //   };

  //   fetchData();
  // }, [startDate, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear) {
        const { startDate: start, endDate: end } = setRangeByYear(selectedYear);
        const result = await getTrackByRange(start, end);
        setTrack(result);
      }
    };
    fetchData();
  }, [selectedYear]);

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
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}

      {track && (
        <Polyline positions={track?.geometry?.coordinates} pathOptions={red} />
      )}
    </MapContainer>
  );
};

export default Map;
