import React, { useState } from "react";
import Map from "@components/Map";
import Topbar from "@components/Topbar";

import styles from "@styles/Home.module.scss";
import { useStore } from "@store/ContextStore";

const DEFAULT_CENTER = [52.6680064, -2.490368];

export default function Home() {
  
  return (
    <main className={styles.home}>
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
    </main>
  );
}
