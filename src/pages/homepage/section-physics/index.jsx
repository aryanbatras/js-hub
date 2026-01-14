import "./index.sass";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useRef, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import jsLogo from "../../../assets/js.png"
import reactLogo from "../../../assets/texture/react.jpg"
import viteLogo from "../../../assets/texture/vite.jpg"
import nextLogo from "../../../assets/texture/next.jpg"
import reduxLogo from "../../../assets/texture/redux.jpg"
import tailwindLogo from "../../../assets/texture/tailwind.jpg"
import sassLogo from "../../../assets/texture/sass.jpg"
import typescriptLogo from "../../../assets/texture/typescript.jpg"
import astroLogo from "../../../assets/texture/astro.jpg"
import nestjsLogo from "../../../assets/texture/nestjs.jpg"
function PhysicsSection() {
  return (
    <div className="physics-container">
      <Canvas>
        <Physics>
          <Attractor />
          <PhysicsBox
            position={[0, null, 1]}
            rad={0.8}
            texture={reactLogo}
          />
          <PhysicsBox
            position={[1, null, -1]}
            rad={0.6}
            texture={viteLogo}
          />
          <PhysicsBox
            position={[-1, null, 0.5]}
            rad={0.8}
            texture={nextLogo}
          />
          <PhysicsBox
            position={[-1, null, 0]}
            rad={0.6}
            texture={reduxLogo}
          />
          <PhysicsBox
            position={[1, null, 0]}
            rad={0.7}
            texture={tailwindLogo}
          />
          <PhysicsBox
            position={[-2, 1,null]}
            rad={0.7}
            texture={sassLogo}
          />
          <PhysicsBox
            position={[2, null, null]}
            rad={0.7}
            texture={typescriptLogo}
          />
          <PhysicsBox
            position={[-2, null, -2]}
            rad={0.7}
            texture={astroLogo}
          />
          <PhysicsBox
            position={[2, null, -2]}
            rad={0.7}
            texture={nestjsLogo}
          />
        </Physics>
        <directionalLight intensity={5} position={[0, 0, 2]} color={"orange"} />
        <Light x={2} y={5} z={2} />
        <Light x={-4} y={-4} z={2} />
        <Light x={0} y={0} z={5} />
      </Canvas>
    </div>
  );
}
function Light({ x, y, z }) {
  return (
    <spotLight
      intensity={40}
      position={[x, y, z]}
      angle={0.39}
      color={"orange"}
      penumbra={0.5}
    />
  );
}
function PhysicsBox({ position, rad, texture }) {
  const rigidBody = useRef();
  const vec = useMemo(() => new Vector3(), []);
  const jsTexture = texture ? useTexture(texture) : null;
  useFrame((state) => {
    if (!rigidBody.current) return;
    const time = state.clock.getElapsedTime();
    const radius = rad;
    const targetX =
      position[0] !== null ? position[0] : Math.sin(time) * radius;
    const targetY =
      position[1] !== null ? position[1] : Math.cos(time) * radius;
    const targetZ =
      position[2] !== null ? position[2] : Math.sin(time) * radius;
    const currentPos = rigidBody.current.translation();
    vec.set(
      targetX - currentPos.x,
      targetY - currentPos.y,
      targetZ - currentPos.z,
    );
    vec.multiplyScalar(0.05);
    rigidBody.current.applyImpulse(vec, true);
  });
  return (
    <RigidBody
      type="dynamic"
      position={position}
      ref={rigidBody}
      mass={0.25}
      restitution={0.5}
      friction={0.1}
      linearDamping={1}
      angularDamping={1.5}
    >
      <mesh>
        <boxGeometry args={[rad, rad, rad]} />
        <meshStandardMaterial
          color="yellow"
          map={jsTexture ? jsTexture : undefined}
        />
        <CuboidCollider args={[rad / 2, rad / 2, rad / 2]} />
      </mesh>
    </RigidBody>
  );
}
function Attractor() {
  const attractorRef = useRef();
  const vec = useMemo(() => new Vector3(), []);
  useFrame((state, delta) => {
    if (!attractorRef.current) return;
    delta = Math.min(0.1, delta);
    attractorRef.current.applyImpulse(
      vec.copy(attractorRef.current.translation()).negate().multiplyScalar(4),
    );
  });
  const jsTexture = useTexture(jsLogo);
  return (
    <RigidBody
      type="dynamic"
      position={[5, 5, 5]}
      ref={attractorRef}
      mass={2.5}
      restitution={0.5}
      linearDamping={0.1}
      angularDamping={0.2}
      friction={0.2}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} map={jsTexture} />
        <CuboidCollider args={[1, 1, 1]} />
      </mesh>
    </RigidBody>
  );
}
export default PhysicsSection;
