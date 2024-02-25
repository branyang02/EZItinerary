import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}

const ArcsGlobe: React.FC = () => {
  const [arcsData, setArcsData] = useState<ArcData[]>([]);

  useEffect(() => {
    const generateArcsData = () => {
      const N = 20;
      const newArcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [
          ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
          ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
        ],
      }));
      setArcsData(newArcsData);
    };

    generateArcsData();
  }, []);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      arcsData={arcsData}
      arcColor={"color"}
      arcDashLength={() => Math.random()}
      arcDashGap={() => Math.random()}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
      backgroundColor="#0A1128"
    />
  );
};

export default ArcsGlobe;
