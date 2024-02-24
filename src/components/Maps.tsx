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

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DEFAULT_ZOOM = 7;

export const GoogleMaps = ({
  locations,
  className,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      // Initialize the map only once
      const initMap = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        gestureHandling: "greedy",
      });
      setMap(initMap);
    }
  }, [ref]);

  useEffect(() => {
    if (map && locations.length > 0) {
      // Remove previous markers
      // Ideally, keep track of markers to remove them before adding new ones

      // Add new markers
      const markers = addSingleMarkers({ locations, map });

      // If there's only one location, pan to it
      if (locations.length === 1) {
        map.panTo(locations[0]);
      } else {
        // Fit map to bounds if multiple locations
        const bounds = new google.maps.LatLngBounds();
        locations.forEach((location) => bounds.extend(location));
        map.fitBounds(bounds);
      }

      // Cleanup function to remove markers when component unmounts or locations change
      return () => markers.forEach((marker) => marker.setMap(null));
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

interface Coordinates {
  lat: number;
  lng: number;
}
interface MapComponentProps {
  locations: Coordinates[];
}
export const MapComponent = ({ locations }: MapComponentProps) => (
  <GoogleMapsWrapper>
    <GoogleMaps locations={locations} />
  </GoogleMapsWrapper>
);
