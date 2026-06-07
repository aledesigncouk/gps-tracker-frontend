/* ENUMS ===================================================================== */
export enum ControlSwitchEnum {
  RANGE = "range",
  YEAR = "year",
}

/* TYEPS ==================================================================== */
export type Coordinate = [number, number];

/* INTERFACES =============================================================== */
export interface Geometry {
  type: "LineString";
  coordinates: Coordinate[];
}

export interface Properties {
  year?: number | string;
}

export interface Track {
  type: "Feature";
  properties: Properties;
  geometry: Geometry;
}
