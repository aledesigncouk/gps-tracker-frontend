import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import Map from "@components/Map/DynamicMap";
import { useFetchTrack } from "@hooks/hooks";
import { Track } from "@/interfaces/interfaces";

jest.mock("@hooks/hooks", () => ({
    useFetchTrack: jest.fn(),
}));

jest.mock("react-leaflet", () => ({
    MapContainer: jest.fn(({ children }) =>
        <div data-testid="map-container">
            {children}
        </div>),

    Polyline: jest.fn(({ positions }) =>
        <div data-testid="polyline">
            {JSON.stringify(positions)}
        </div>),
}));

describe("DynamicMap component", () => {
    it("render the data and match the snapshot", async () => {
        const track: Track = {
            type: "Feature",
            properties: {
                year: 2022,
            },
            geometry: {
                type: "LineString",
                coordinates: [
                    [52.6609183, -2.4820783],
                    [52.6609183, -2.4820783],
                    [52.6610983, -2.4823683],
                    [52.6612783, -2.4826583],
                    [52.6614583, -2.4829483],
                    [52.6616383, -2.4832383],
                ],
            },
        };
        useFetchTrack.mockReturnValue({ track, error: null });

        const { asFragment, getByTestId } = render(
            <Map
                track={track}
                children={() => (
                    <div data-testid="mock-children">Mocked Children</div>
                )}
            />
        );

        await waitFor(() =>
            expect(getByTestId("map-container")).toBeInTheDocument()
        );

        await waitFor(() =>
            expect(getByTestId("polyline").textContent).toContain(
                JSON.stringify(track.geometry.coordinates)
            )
        );

        expect(asFragment()).toMatchSnapshot()
    });

    it("displays a modal if the track has no coordinates", async () => {
        const track: Track = {
            type: "Feature",
            properties: {
                year: 2022,
            },
            geometry: {
                type: "LineString",
                coordinates: [],
            },
        };

        useFetchTrack.mockReturnValue({ track, error: null });

        const { getByText } = render(
            <Map
                track={track}
                children={() => (
                    <div data-testid="mock-children">Mocked Children</div>
                )}
            />
        );

        await waitFor(() =>
            expect(getByText("Warning")).toBeInTheDocument()
        );
        expect(
            getByText("No coordinates found for this track. Please change the date range.")
        ).toBeInTheDocument();

        expect(getByText("Close")).toBeInTheDocument();
    });

});
