import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import circularImage from "../assets/images/me.png";

const CentralHologram = ({ scale = 1, radius = 5 }) => {
  const texture = useTexture(circularImage);

  return (
    <group scale={[scale, scale, scale]}>
      <mesh>
        <circleGeometry args={[radius, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default CentralHologram;