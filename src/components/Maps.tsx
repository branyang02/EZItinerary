import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

// eslint-disable-next-line react-refresh/only-export-components
export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) =>
  locations.map(
    (position) =>
      new google.maps.Marker({
        position,
        map,
      })
  );

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

const DEFAULT_ZOOM = 7;

export const GoogleMaps = ({
  locations,
  cityCoordinates,
  className,
}: {
  locations?: ReadonlyArray<google.maps.LatLngLiteral> | null | undefined;
  cityCoordinates?: google.maps.LatLngLiteral | null | undefined;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (ref.current && !map) {
      const initMap = new window.google.maps.Map(ref.current, {
        center: cityCoordinates,
        zoom: DEFAULT_ZOOM,
        gestureHandling: "greedy",
      });
      setMap(initMap);
    }
  }, [ref, cityCoordinates]);

  useEffect(() => {
    if (map && locations) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));

      // Create new markers and add them to the map
      const newMarkers = locations.map((location) => {
        return new google.maps.Marker({
          position: location,
          map,
        });
      });

      // Update the global marker state with the new markers
      setMarkers(newMarkers);

      // If there's only one location, pan to it
      if (locations.length === 1) {
        map.panTo(locations[0]);
      } else if (locations.length > 1) {
        // Fit map to bounds if multiple locations
        const bounds = new google.maps.LatLngBounds();
        locations.forEach((location) => bounds.extend(location));
        map.fitBounds(bounds);
      }
    }
  }, [locations, map]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

interface MapComponentProps {
  locations: google.maps.LatLngLiteral[] | null;
  cityCoordinates: google.maps.LatLngLiteral | null;
}
export const MapComponent = ({
  locations,
  cityCoordinates,
}: MapComponentProps) => (
  <GoogleMapsWrapper>
    <GoogleMaps locations={locations} cityCoordinates={cityCoordinates} />
  </GoogleMapsWrapper>
);
