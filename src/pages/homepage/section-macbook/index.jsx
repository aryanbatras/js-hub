import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./index.sass";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import Homepage from "../index";
import React from "react";
import { TextureLoader } from "three";

function SectionMacBook({ insideMac = false }) {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const screenFlipRef = useRef(null);
  const screenRef = useRef(null);
  const keyboardRef = useRef(null);
  const screenFrameRef = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (modelRef.current && ready) {
        gsap.registerPlugin(ScrollTrigger);
        const t = gsap.timeline({
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top top",
            end: "bottom center",
            // markers: true,
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          },
        });
        // scene 1
        t.to(screenFlipRef.current.rotation, {
          x: Math.PI / 15,
          duration: 2,
          ease: "none",
        });
        t.to(
          modelRef.current.scale,
          {
            x: 0.92,
            y: 0.92,
            z: 0.92,
            duration: 2,
          },
          "-=2",
        );
        // scene 2
        t.to(modelRef.current.position, {
          z: -8,
          y: -2,
          duration: 2,
        });
        t.to(
          modelRef.current.rotation,
          {
            z: 0.1,
            duration: 2,
          },
          "-=2",
        );
        // scene 3
        t.to(screenRef.current.scale, {
          y: 1.5,
          x: 1.5,
          z: 1.5,
          duration: 2,
        });
        t.to(
          screenRef.current.position,
          {
            y: 10,
            z: -2.0,
            x: 0.25,
            duration: 2,
          },
          "-=2",
        );
        t.to(
          screenRef.current.rotation,
          {
            y: -0.1,
            x: -0.2,
            duration: 2,
          },
          "-=2",
        );
        t.to(screenFrameRef.current.scale, {
          y: 3,
          z: 3,
          x: 3,
          duration: 2,
        });
        t.to(screenFrameRef.current.rotation, {
          y: -0.1,
          x: -0.2,
          duration: 2,
        }, "-=2");
      }
      console.log(screenFrameRef.current);
    }, 100);
  }, [ready]);
  return (
    <div
      ref={canvasRef}
      className={`canvas-macbook__container ${insideMac ? "canvas-macbook__container-insideMac" : ""}`}
    >
      <Canvas color="white">
        <ambientLight intensity={50} />
        <directionalLight position={[10, 10, 5]} intensity={50} />
        <MacModel
          setReady={setReady}
          modelRef={modelRef}
          screenFlipRef={screenFlipRef}
          screenRef={screenRef}
          keyboardRef={keyboardRef}
          screenFrameRef={screenFrameRef}
        />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
function MacModel({
  setReady,
  modelRef,
  screenFlipRef,
  screenRef,
  keyboardRef,
  screenFrameRef,
}) {
  // const result = useGLTF("/mac-draco.glb");
  // console.log(result);
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  useEffect(() => {
    // if (nodes) {
    //   const screenFlip = nodes["screenflip"];
    //   const keyboard = nodes["keyboard"];
    //   const touchbar = nodes["Cube002_1"];
    //   const screen = nodes["Cube008_2"];
    //   if (screen) {
    //     screenRef.current = screen;
    //   };
    //   if (screenFlip) {
    //     screenFlip.rotation.x = Math.PI / 2;
    //     screenFlipRef.current = screenFlip;
    //   }
    //   if (keyboard) {
    //     keyboardRef.current = keyboard;
    //   }
    //   if (touchbar) {
    //     touchbarRef.current = touchbar;
    //   }
    // }
    setReady(true);
  }, [nodes]);
  // const MemoizedHtmlContent = React.memo(<Homepage insideMac={true} />);
  const MemoizedHomepage = React.memo(Homepage);
  const MemoizedHtmlContent = React.memo(() => (
    <div
      className="canvas__mac-content"
      // onPointerDown={(e) => e.stopPropagation()}
    >
      <MemoizedHomepage insideMac={true} />
    </div>
  ));
  // ));
  // const jsTexture = useTexture("/mac-screen-back.png");
  return (
    <group ref={modelRef} dispose={null}>
      <group name="Scene" position={[0, 0, -12]}>
        <group
          ref={screenFlipRef}
          name="screenflip"
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "screenflip" }}
        >
          <group
            name="screen"
            position={[0, 2.96, -0.13]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "screen" }}
          >
            <mesh
              name="Cube008"
              castShadow
              receiveShadow
              geometry={nodes.Cube008.geometry}
              material={materials.aluminium}
            />
            <mesh
              name="Cube008_1"
              ref={screenFrameRef}
              castShadow
              receiveShadow
              geometry={nodes.Cube008_1.geometry}
              material={materials["matte.001"]}
            />
            <mesh
              name="Cube008_2"
              ref={screenRef}
              geometry={nodes.Cube008_2.geometry}
              // material={materials['screen.001']}
            >
              {/* <meshStandardMaterial /> */}
              <meshStandardMaterial />
              <Html
                className="canvas__mac-content-container"
                rotation-x={-Math.PI / 2}
                position={[0, 0.05, -0.09]}
                transform
                // occlude
              >
                {/* <div className="canvas__mac-content" onPointerDown={(e) => e.stopPropagation()}>
                <Homepage insideMac={true}/>
              </div> */}
                {/* <div
                  className="canvas__mac-content"
                  // onPointerDown={(e) => e.stopPropagation()}
                > */}
                <MemoizedHtmlContent />
                {/* </div> */}
              </Html>
            </mesh>
          </group>
        </group>
        <mesh
          name="keyboard"
          castShadow
          receiveShadow
          geometry={nodes.keyboard.geometry}
          material={materials.keys}
          position={[1.79, 0.1, 3.45]}
          userData={{ name: "keyboard" }}
        />
        <group
          name="base"
          position={[0, -0.025, 3.39]}
          userData={{ name: "base" }}
        >
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials.aluminium}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.trackpad}
          />
        </group>
        <mesh
          name="touchbar"
          castShadow
          receiveShadow
          geometry={nodes.touchbar.geometry}
          material={materials.touchbar}
          position={[0, -0.03, 1.2]}
          userData={{ name: "touchbar" }}
        />
      </group>
    </group>
  );
}
export default SectionMacBook;
