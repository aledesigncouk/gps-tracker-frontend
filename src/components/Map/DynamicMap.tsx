import { JSX, useEffect, useState } from "react";
import { useStore } from "@store/ContextStore";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { Polyline } from "react-leaflet";
import { useFetchTrack } from "@components/Map/hooks";

import "leaflet/dist/leaflet.css";
import styles from "@styles/components/Map.module.scss";
import Modal from "@components/Modal";

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

  const { startDate, endDate, selectedYear, controlSwitch, runFetchData, setRunFetchData } = useStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { track, error }= useFetchTrack(
    controlSwitch,
    startDate,
    endDate,
    selectedYear,
    runFetchData,
    setRunFetchData
  
  );

  // map
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
      {error && <Modal
        title="Error"
        content="Unable to fetch valid track data. Please try again."
        isOpen={isModalOpen}
        setModal={setIsModalOpen}
      />}
    </>
  );
};

export default Map;
