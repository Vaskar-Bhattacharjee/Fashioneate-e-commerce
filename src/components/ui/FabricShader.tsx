"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Plane, Texture } from "ogl";

interface FabricShaderProps {
  src?: string;
  className?: string;
}

const vertexShader = `
  attribute vec3 position;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D uTexture;

  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;

  uniform float uTime;

  varying vec2 vUv;


  // =====================================================
  // BACKGROUND SIZE: COVER
  // =====================================================

  vec2 coverUV(
    vec2 uv,
    vec2 screen,
    vec2 image
  ) {

    float screenRatio =
      screen.x / screen.y;

    float imageRatio =
      image.x / image.y;

    vec2 result = uv;

    if (screenRatio > imageRatio) {

      float scale =
        imageRatio / screenRatio;

      result.y =
        (uv.y - 0.5) * scale + 0.5;

    } else {

      float scale =
        screenRatio / imageRatio;

      result.x =
        (uv.x - 0.5) * scale + 0.5;
    }

    return result;
  }


  void main() {

    // ===================================================
    // ORIGINAL IMAGE POSITION
    // ===================================================

    vec2 uv = coverUV(
      vUv,
      uResolution,
      uImageResolution
    );


    // ===================================================
    // CURSOR SPACE
    // ===================================================

    vec2 aspect =
      vec2(
        uResolution.x / uResolution.y,
        1.0
      );

    vec2 mouseDelta =
      (vUv - uMouse) * aspect;

    float distanceFromMouse =
      length(mouseDelta);


    // ===================================================
    // DISTORTION CIRCLE SIZE
    //
    // Increase this number for a larger area.
    // ===================================================

    float radius = 1.1;

    float influence =
      1.0 -
      smoothstep(
        0.0,
        radius,
        distanceFromMouse
      );


    // ===================================================
    // LARGE SLOW FABRIC WAVE
    // ===================================================

    float wave =
      sin(
        distanceFromMouse * 8.0
        - uTime * 0.75
      );


    float secondaryWave =
      sin(
        distanceFromMouse * 5.0
        - uTime * 0.42
      );


    float combinedWave =
      wave * 0.65 +
      secondaryWave * 0.35;


    // ===================================================
    // SOFT CENTER
    // ===================================================

    float center =
      smoothstep(
        0.0,
        0.025,
        distanceFromMouse
      );

    combinedWave *= center;


    // ===================================================
    // DIRECTION FROM CURSOR
    // ===================================================

    vec2 direction =
      normalize(
        mouseDelta +
        vec2(0.00001)
      );


    // ===================================================
    // MAIN FABRIC DISTORTION
    // ===================================================

    float distortion =
      combinedWave *
      influence *
      0.012;


    uv +=
      direction *
      distortion;


    // ===================================================
    // SECONDARY CLOTH MOVEMENT
    // ===================================================

    vec2 perpendicular =
      vec2(
        -direction.y,
        direction.x
      );


    float clothWave =
      sin(
        distanceFromMouse * 12.0
        - uTime * 0.32
      );


    uv +=
      perpendicular *
      clothWave *
      influence *
      0.0025;


    // ===================================================
    // SAMPLE FABRIC
    // ===================================================

    vec4 color =
      texture2D(
        uTexture,
        uv
      );


    // ===================================================
    // SUBTLE LIGHT RESPONSE
    // ===================================================

    float light =
      exp(
        -distanceFromMouse * 8.0
      );

    color.rgb +=
      light *
      0.012;


    // ===================================================
    // OUTPUT
    // ===================================================

    gl_FragColor =
      vec4(
        color.rgb,
        1.0
      );
  }
`;


export default function FabricShader({
  src = "/background.png",
  className = "",
}: FabricShaderProps) {

  const containerRef =
    useRef<HTMLDivElement>(null);


  useEffect(() => {

    const container =
      containerRef.current;

    if (!container) {
      return;
    }


    // ===================================================
    // RENDERER
    // ===================================================

    const renderer =
      new Renderer({
        alpha: false,
        antialias: true,
        dpr: Math.min(
          window.devicePixelRatio,
          2
        ),
      });


    const gl =
      renderer.gl;


    gl.canvas.style.width =
      "100%";

    gl.canvas.style.height =
      "100%";

    gl.canvas.style.display =
      "block";


    container.appendChild(
      gl.canvas
    );


    // ===================================================
    // TEXTURE
    // ===================================================

    const texture =
      new Texture(gl);


    const image =
      new Image();

    image.src =
      src;


    image.onload =
      () => {

        texture.image =
          image;

        program.uniforms
          .uImageResolution
          .value = [
            image.naturalWidth,
            image.naturalHeight,
          ];
      };


    image.onerror =
      () => {

        console.error(
          `[FabricShader] Failed to load image: ${src}`
        );

      };


    // ===================================================
    // PLANE
    // ===================================================

    const geometry =
      new Plane(gl, {
        width: 2,
        height: 2,
      });


    // ===================================================
    // PROGRAM
    // ===================================================

    const program =
      new Program(gl, {

        vertex:
          vertexShader,

        fragment:
          fragmentShader,

        uniforms: {

          uTexture: {
            value:
              texture,
          },

          uMouse: {
            value: [
              -10,
              -10,
            ],
          },

          uResolution: {
            value: [
              1,
              1,
            ],
          },

          uImageResolution: {
            value: [
              1,
              1,
            ],
          },

          uTime: {
            value: 0,
          },

        },
      });


    // ===================================================
    // MESH
    // ===================================================

    const mesh =
      new Mesh(gl, {
        geometry,
        program,
      });


    // ===================================================
    // MOUSE TRACKING
    //
    // Window tracking means the text/overlay doesn't
    // interfere with the cursor interaction.
    // ===================================================

    let mouseX =
      -10;

    let mouseY =
      -10;

    let mouseActive =
      false;


    const updateMouse =
      (event: MouseEvent) => {

        const rect =
          container.getBoundingClientRect();


        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;


        if (!inside) {

          mouseActive =
            false;

          return;
        }


        mouseActive =
          true;


        mouseX =
          (event.clientX -
            rect.left) /
          rect.width;


        mouseY =
          1 -
          (
            (event.clientY -
              rect.top) /
            rect.height
          );

      };


    window.addEventListener(
      "mousemove",
      updateMouse,
      {
        passive: true,
      }
    );


    // ===================================================
    // RESIZE
    // ===================================================

    const resize =
      () => {

        const width =
          container.clientWidth;

        const height =
          container.clientHeight;


        if (
          width === 0 ||
          height === 0
        ) {
          return;
        }


        renderer.setSize(
          width,
          height
        );


        program.uniforms
          .uResolution
          .value = [
            width,
            height,
          ];

      };


    resize();


    const resizeObserver =
      new ResizeObserver(
        resize
      );


    resizeObserver.observe(
      container
    );


    // ===================================================
    // ANIMATION LOOP
    // ===================================================

    let animationFrame =
      0;


    const render =
      (time: number) => {

        animationFrame =
          requestAnimationFrame(
            render
          );


        if (mouseActive) {

          program.uniforms
            .uMouse
            .value = [
              mouseX,
              mouseY,
            ];

        } else {

          program.uniforms
            .uMouse
            .value = [
              -10,
              -10,
            ];

        }


        program.uniforms
          .uTime
          .value =
          time * 0.001;


        renderer.render({
          scene:
            mesh,
        });

      };


    animationFrame =
      requestAnimationFrame(
        render
      );


    // ===================================================
    // CLEANUP
    // ===================================================

    return () => {

      cancelAnimationFrame(
        animationFrame
      );


      window.removeEventListener(
        "mousemove",
        updateMouse
      );


      resizeObserver.disconnect();


      if (
        gl.canvas.parentNode ===
        container
      ) {

        container.removeChild(
          gl.canvas
        );

      }


      gl.getExtension(
        "WEBGL_lose_context"
      )?.loseContext();

    };

  }, [src]);


  return (
    <div
      ref={containerRef}
      className={`
        absolute
        inset-0
        pointer-events-none
        ${className}
      `}
      aria-hidden="true"
    />
  );
}