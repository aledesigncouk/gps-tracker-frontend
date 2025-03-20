import { JSX, useEffect, useState } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { Polyline } from "react-leaflet";
import { useFetchTrack } from "@hooks/hooks";

import "leaflet/dist/leaflet.css";
import styles from "@styles/components/Map.module.scss";
import { Track } from "@/interfaces/interfaces";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
  const [modalShow, setModalShow] = useState(false);

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

  useEffect(() => {
    if (track?.geometry.coordinates.length === 0) {
      setModalShow(true);
    }
  }, [track]);

  return (
    <>
      <MapContainer className={mapClassName} {...rest}>
        {children(ReactLeaflet, Leaflet)}

        {track?.geometry.coordinates.length > 0 &&
          <Polyline
            positions={track?.geometry?.coordinates}
            pathOptions={red}
          />}
      </MapContainer>

      {track?.geometry.coordinates.length === 0 &&
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          backdrop="static"
          centered
          style={{ zIndex: 2000 }}
          restoreFocus={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            No coordinates found for this track. Please change the date range.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setModalShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>}
    </>
  );
};

export default Map;
