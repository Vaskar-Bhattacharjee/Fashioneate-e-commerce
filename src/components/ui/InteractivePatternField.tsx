"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Distance from mouse
    float distanceToMouse = distance(uv, uMouse);

    // Local mouse influence
    float mouseInfluence =
      exp(-distanceToMouse * 8.0);

    // Main ripple
    float ripple =
      sin(distanceToMouse * 35.0 - uTime * 3.0)
      * mouseInfluence
      * 0.12;

    // Subtle continuous movement
    float ambient =
      sin(uv.x * 8.0 + uTime * 0.25) *
      cos(uv.y * 6.0 + uTime * 0.2) *
      0.008;

    pos.z += ripple + ambient;

    // Slight perspective-like bending
    float edgeDistance =
      distance(uv, vec2(0.5));

    pos.z -= edgeDistance * edgeDistance * 0.08;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 uMouse;

  varying vec2 vUv;

  float gridLine(vec2 uv, float size) {
    vec2 grid = abs(fract(uv / size - 0.5) - 0.5);

    float line =
      min(grid.x, grid.y);

    return 1.0 -
      smoothstep(0.0, 0.025, line);
  }

  void main() {

    // Fine grid
    float grid =
      gridLine(vUv * 32.0, 1.0);

    // Larger secondary grid
    float majorGrid =
      gridLine(vUv * 8.0, 1.0);

    // Cursor glow
    float mouseDistance =
      distance(vUv, uMouse);

    float glow =
      exp(-mouseDistance * 10.0);

    // Make grid stronger around cursor
    float intensity =
      grid * (0.16 + glow * 0.45);

    intensity +=
      majorGrid * 0.035;

    // Fade toward edges
    float edgeFade =
      smoothstep(
        0.0,
        0.18,
        vUv.x
      ) *
      smoothstep(
        0.0,
        0.18,
        1.0 - vUv.x
      ) *
      smoothstep(
        0.0,
        0.18,
        vUv.y
      ) *
      smoothstep(
        0.0,
        0.18,
        1.0 - vUv.y
      );

    intensity *= edgeFade;

    vec3 color =
      vec3(0.12, 0.12, 0.12);

    gl_FragColor =
      vec4(color, intensity);
  }
`;

function GridPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const mouse = useRef(
    new THREE.Vector2(0.5, 0.5)
  );

  const targetMouse = useRef(
    new THREE.Vector2(0.5, 0.5)
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    targetMouse.current.x =
      state.pointer.x * 0.5 + 0.5;

    targetMouse.current.y =
      state.pointer.y * 0.5 + 0.5;

    mouse.current.lerp(
      targetMouse.current,
      0.06
    );

    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime;

    materialRef.current.uniforms.uMouse.value =
      mouse.current;
  });

  return (
    <mesh
      rotation={[-0.35, 0, 0]}
      position={[0, -0.15, -0.5]}
      scale={[1.35, 1.15, 1]}
    >
      <planeGeometry
        args={[8, 6, 180, 180]}
      />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: {
            value: 0,
          },
          uMouse: {
            value: new THREE.Vector2(
              0.5,
              0.5
            ),
          },
        }}
      />
    </mesh>
  );
}

export const InteractiveGrid = () => {
  return (
    <div
      className="
        absolute
        inset-0
        z-0
        pointer-events-none
      "
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <GridPlane />
      </Canvas>

      {/* Soft fade over the WebGL edges */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_25%,rgba(255,255,255,0.7)_100%)]
        "
      />
    </div>
  );
};