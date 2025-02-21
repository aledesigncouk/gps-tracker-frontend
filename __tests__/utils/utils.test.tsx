import {
  formatDate,
  setRangeByYear,
  validateTrackData,
} from "@/utils/utils";
import { Track } from "@/interfaces/interfaces";

describe("formatDate", () => {
  it("should return a valid date string in the format YYYY-MM-DD", () => {
    const date = new Date("2022-01-01T00:00:00.000Z");

    const result = formatDate(date);
    expect(result).toBe("2022-01-01");
  });
});

describe("setRangeByYear", () => {
  it("should return a valid date range object with start and end dates", () => {
    const result = setRangeByYear('2022');

    expect(result.startDate).toBe('2022-01-01');
    expect(result.endDate).toBe('2022-12-31');
  });
});

describe("validateTrackData", () => {
  it("should return true for a valid track data", () => {
    const track = {
      type: "Feature",
      properties: {
        year: 2022
      },
      geometry: {
        coordinates: [
          [
            52.6609183,
            -2.4820783
          ],
          [
            52.6609183,
            -2.4820783
          ],
        ],
        type: "LineString"
      }
    };
    const result = validateTrackData(track as Track);
    expect(result).toBeTruthy();
  });

  it("should return false for an invalid track data", () => {
    const track = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };
    const result = validateTrackData(track as Track);
    expect(result).toBeFalsy();
  });
});