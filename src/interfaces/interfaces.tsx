export type Coordinate = [number, number];

export interface Geometry {
  type: "LineString";
  coordinates: Coordinate[];
}

export interface Properties {
  year: number;
}

export interface Track {
  type: "Feature";
  properties: Properties;
  geometry: Geometry;
}