"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Plane, Texture } from "ogl";

const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;

  uniform float uTime;
  uniform vec2 uMouse;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 pos = vec3(position, 0.0);

    // Very subtle physical movement
    float wave =
      sin(position.x * 3.0 + uTime * 0.35) *
      cos(position.y * 2.5 + uTime * 0.25);

    pos.z += wave * 0.015;

    // Slight cursor-driven movement
    float mouseInfluence =
      1.0 - smoothstep(
        0.0,
        1.2,
        distance(position, uMouse)
      );

    pos.z += mouseInfluence * 0.025;

    gl_Position = vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uTime;

  varying vec2 vUv;

  void main() {

    vec2 uv = vUv;

    // --------------------------------
    // Cursor position in UV space
    // --------------------------------

    vec2 mouse = uMouse;

    float distanceFromMouse =
      distance(uv, mouse);

    // --------------------------------
    // Soft fabric displacement
    // --------------------------------

    float influence =
      1.0 -
      smoothstep(
        0.0,
        0.45,
        distanceFromMouse
      );

    vec2 direction =
      normalize(uv - mouse + 0.0001);

    // Slow organic movement
    float wave =
      sin(
        distanceFromMouse * 18.0 -
        uTime * 1.2
      );

    float displacement =
      influence *
      wave *
      0.012;

    uv += direction * displacement;

    // --------------------------------
    // Very subtle cursor parallax
    // --------------------------------

    uv.x += (mouse.x - 0.5) * 0.008;
    uv.y += (mouse.y - 0.5) * 0.008;

    // --------------------------------
    // Texture
    // --------------------------------

    vec4 textureColor =
      texture2D(uTexture, uv);

    // --------------------------------
    // Soft light following cursor
    // --------------------------------

    float light =
      1.0 -
      smoothstep(
        0.0,
        0.65,
        distanceFromMouse
      );

    textureColor.rgb +=
      light * 0.025;

    // Keep everything monochrome
    float luminance =
      dot(
        textureColor.rgb,
        vec3(0.299, 0.587, 0.114)
      );

    textureColor.rgb =
      mix(
        textureColor.rgb,
        vec3(luminance),
        0.25
      );

    gl_FragColor =
      vec4(textureColor.rgb, 1.0);
  }
`;

export default function FabricShader() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const mouseRef =
    useRef({ x: 0.5, y: 0.5 });

  const targetMouseRef =
    useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container =
      containerRef.current;

    const renderer = new Renderer({
      alpha: false,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    container.appendChild(gl.canvas);

    const texture = new Texture(gl, {
      generateMipmaps: true,
    });

    const image = new Image();

    image.src = "/background.png";

    image.onload = () => {
      texture.image = image;
    };

    const geometry = new Plane(gl, {
      width: 2,
      height: 2,
      widthSegments: 32,
      heightSegments: 32,
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,

      uniforms: {
        uTexture: {
          value: texture,
        },

        uMouse: {
          value: [0.5, 0.5],
        },

        uResolution: {
          value: [
            container.clientWidth,
            container.clientHeight,
          ],
        },

        uTime: {
          value: 0,
        },
      },
    });

    const mesh =
      new Mesh(gl, {
        geometry,
        program,
      });

    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      renderer.setSize(
        width,
        height
      );

      program.uniforms.uResolution.value =
        [width, height];
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        container.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      targetMouseRef.current.x = x;

      targetMouseRef.current.y = 1 - y;
    };

    const handleMouseLeave = () => {
      targetMouseRef.current.x = 0.5;
      targetMouseRef.current.y = 0.5;
    };

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    container.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    let animationFrame = 0;

    const animate = (time: number) => {
      animationFrame =
        requestAnimationFrame(animate);

      const mouse =
        mouseRef.current;

      const target =
        targetMouseRef.current;

      // Smooth cursor interpolation
      mouse.x +=
        (target.x - mouse.x) *
        0.055;

      mouse.y +=
        (target.y - mouse.y) *
        0.055;

      program.uniforms.uMouse.value =
        [mouse.x, mouse.y];

      program.uniforms.uTime.value =
        time * 0.001;

      renderer.render({
        scene: mesh,
      });
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      container.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      gl.getExtension(
        "WEBGL_lose_context"
      )?.loseContext();

      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(
          gl.canvas
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
    />
  );
}