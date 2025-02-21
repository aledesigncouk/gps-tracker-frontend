import React from "react";
import Map from "@components/Map";
import Topbar from "@components/Topbar";
import { Container } from "react-bootstrap";

const DEFAULT_CENTER = [52.6680064, -2.490368];

function Home() {
  
  return (
    <Container fluid className="bg-primary text-white" data-testid='main'>
      <Topbar />
      <Map
        width={"800"}
        height={"400"}
        center={DEFAULT_CENTER}
        zoom={5}
      >
        {({ TileLayer }) => (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        )}
      </Map>
    </Container>
  );
}

export default Home;