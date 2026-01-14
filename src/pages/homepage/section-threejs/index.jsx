import { FaArrowRight } from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { BackSide } from "three";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.sass";
function SectionThreeJs({ insideMac = false }) {
  const canvasRef = useRef(),
    boxRef = useRef(),
    textRef = useRef(),
    buttonRef = useRef(),
    dragRef = useRef();
  const [rotation, setRotation] = useState({ x: 0.005, y: 0.005, z: 0.005 });
  const [drag, setDrag] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready && boxRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      const t = gsap.timeline({
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top top",
          end: "bottom top",
          // markers: true,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
        },
      });
      t.from(dragRef.current, {
        opacity: 0,
        duration: 1,
      })
        .to(boxRef.current.scale, {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          duration: 2,
          ease: "none",
        })
        .to(
          boxRef.current.position,
          {
            y: 1.5,
            duration: 2,
            // ease: "power1.in",
          },
          "-=2",
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            scale: 2.5,
            y: 200,
            duration: 1,
            // ease: "power2.inOut",
          },
          "-=1",
        )
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            scale: 2.5,
            y: -50,
          },
          {
            opacity: 1,
            scale: 1.5,
            y: -150,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
        );
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [ready]);
  return (
    <div
      className={`canvas__container ${insideMac ? "canvas__container--insideMac" : ""}`}
      ref={canvasRef}
    >
      <Canvas
        onMouseDown={() => setDrag(true)}
        onMouseUp={() => setDrag(false)}
        onMouseMove={(e) =>
          drag &&
          setRotation({
            x: rotation.x + e.movementY * 0.0035,
            y: rotation.y + e.movementX * 0.0035,
            z: rotation.z,
          })
        }
      >
        <MeshBox
          boxRef={boxRef}
          rotation={rotation}
          drag={drag}
          setReady={setReady}
        />
        <MeshSphere />
        <Light x={2} y={5} z={2} />
        <Light x={-4} y={-4} z={2} />
        <Light x={0} y={0} z={5} />
        <PointLight x={-1} y={2} z={-1} />
        <PointLight x={1} y={0.5} z={1} />
      </Canvas>
      {insideMac === false && (
        <>
          <div ref={textRef} className="canvas__text">
            Practice <span>JavaScript</span> <br />
            directly in your browser
          </div>
          <button ref={buttonRef} className="canvas__button">
            <span>Start Learning</span> <FaArrowRight />
          </button>
          <div ref={dragRef} className="canvas__drag-indicator">
            <span>Drag me</span>
            <img src="./down-arrow.png" alt="down-arrow" />
          </div>
        </>
      )}
    </div>
  );
}
function MeshBox({ rotation, drag, boxRef, setReady }) {
  const speed = 0.005;
  const jsTexture = useTexture("/js.png");
  useFrame(() => {
    if (boxRef.current && drag === false) {
      boxRef.current.rotation.x += speed;
      boxRef.current.rotation.y += speed;
      boxRef.current.rotation.z += speed;
    }
  });
  useEffect(() => {
    if (boxRef.current) {
      setReady(true);
    }
  }, [setReady]);
  return (
    <mesh
      ref={boxRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerEnter={() => (document.body.style.cursor = "pointer")}
      onPointerLeave={() => (document.body.style.cursor = "auto")}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" map={jsTexture} />
    </mesh>
  );
}
function MeshSphere() {
  return (
    <mesh position={[0, 1.6, 1.5]}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial
        color={"orange"}
        side={BackSide}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}
function Light({ x, y, z }) {
  return (
    <spotLight
      intensity={80}
      position={[x, y, z]}
      angle={0.39}
      color={"orange"}
      penumbra={0.1}
    />
  );
}
function PointLight({ x, y, z }) {
  return <pointLight intensity={40} position={[x, y, z]} color={"orange"} />;
}
export default SectionThreeJs;
