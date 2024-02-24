import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}

const ArcsGlobe: React.FC = () => {
  const [arcsData, setArcsData] = useState<ArcData[]>([]);
  const globeEl = useRef();

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

    // Clouds Setup
    const CLOUDS_IMG_URL = "//unpkg.com/three-globe/example/img/clouds.png"; // Clouds texture URL
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      if (globeEl.current) {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(
            globeEl.current.getGlobeRadius() * (1 + CLOUDS_ALT),
            75,
            75
          ),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        );
        globeEl.current.scene().add(clouds);

        (function rotateClouds() {
          clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
          requestAnimationFrame(rotateClouds);
        })();
      }
    });
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      arcsData={arcsData}
      arcColor={"color"}
      arcDashLength={() => Math.random()}
      arcDashGap={() => Math.random()}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
      backgroundColor="#9EB7E5"
      // Setting up auto-rotate and speed
      onGlobeReady={() => {
        if (globeEl.current) {
          globeEl.current.controls().autoRotate = true;
          globeEl.current.controls().autoRotateSpeed = 0.35;
        }
      }}
    />
  );
};

export default ArcsGlobe;
